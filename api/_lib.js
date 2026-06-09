// Utilitaires partagés par les fonctions serverless Vercel.
// Parse le multipart/form-data (champs + fichier CV) et envoie l'email
// via l'API Resend vers l'adresse d'intake de l'ATS Between (+ copie interne).
import Busboy from 'busboy';

const MAX_FILE = 8 * 1024 * 1024; // 8 Mo

export function parseForm(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    let file = null;
    let fileTooBig = false;
    const bb = Busboy({ headers: req.headers, limits: { fileSize: MAX_FILE, files: 1 } });

    bb.on('field', (name, val) => { fields[name] = val; });
    bb.on('file', (_name, stream, info) => {
      const chunks = [];
      stream.on('data', (c) => chunks.push(c));
      stream.on('limit', () => { fileTooBig = true; stream.resume(); });
      stream.on('end', () => {
        if (!fileTooBig && chunks.length) {
          file = {
            filename: info.filename,
            contentType: info.mimeType,
            content: Buffer.concat(chunks).toString('base64'),
          };
        }
      });
    });
    bb.on('error', reject);
    bb.on('close', () => resolve({ fields, file, fileTooBig }));
    req.pipe(bb);
  });
}

export function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]),
  );
}

// Envoie via Resend. Destinataires : Between (intake) + email interne.
export async function sendEmail({ subject, html, replyTo, attachment }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM; // ex: "Recrutement Prestant <recrutement@prestant.com>"
  const to = [process.env.BETWEEN_INTAKE_EMAIL, process.env.CONTACT_EMAIL].filter(Boolean);

  if (!apiKey || !from || to.length === 0) {
    const missing = [
      !apiKey && 'RESEND_API_KEY',
      !from && 'RESEND_FROM',
      to.length === 0 && 'BETWEEN_INTAKE_EMAIL ou CONTACT_EMAIL',
    ].filter(Boolean);
    const err = new Error('Configuration email incomplète : ' + missing.join(', '));
    err.code = 'CONFIG';
    throw err;
  }

  const body = { from, to, subject, html };
  if (replyTo) body.reply_to = replyTo;
  if (attachment) body.attachments = [attachment];

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Resend error ' + res.status + ': ' + txt);
  }
  return res.json();
}

export const config = { api: { bodyParser: false } };
