// POST /api/candidature — candidature avec CV.
// Envoie la candidature vers l'ATS Between (email d'intake) + copie interne.
import { parseForm, sendEmail, escapeHtml } from './_lib.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  try {
    const { fields, file, fileTooBig } = await parseForm(req);

    // Honeypot anti-spam : on simule un succès silencieux.
    if (fields._gotcha) return res.status(200).json({ ok: true });

    if (!fields.nom || !fields.email || !fields.telephone) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }
    if (fileTooBig) {
      return res.status(413).json({ error: 'Le CV dépasse 8 Mo.' });
    }

    const l = (k, v) => `<tr><td style="padding:4px 12px 4px 0;color:#6E665A">${k}</td><td style="padding:4px 0;color:#14323C"><strong>${escapeHtml(v || '—')}</strong></td></tr>`;
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px">
        <h2 style="color:#14323C;font-weight:300">Nouvelle candidature — Prestant</h2>
        <table style="border-collapse:collapse;font-size:14px">
          ${l('Poste visé', fields.poste || 'Candidature spontanée')}
          ${l('Nom', fields.nom)}
          ${l('Email', fields.email)}
          ${l('Téléphone', fields.telephone)}
          ${l('Secteur', fields.secteur)}
          ${l('Expérience', fields.experience)}
        </table>
        <p style="margin-top:16px;color:#14323C;font-size:14px;white-space:pre-wrap">${escapeHtml(fields.message || '')}</p>
        <p style="color:#6E665A;font-size:12px">${file ? 'CV joint : ' + escapeHtml(file.filename) : 'Aucun CV joint.'}</p>
      </div>`;

    await sendEmail({
      subject: `Candidature — ${fields.nom}${fields.poste ? ' (' + fields.poste + ')' : ''}`,
      html,
      replyTo: fields.email,
      attachment: file ? { filename: file.filename, content: file.content } : undefined,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('candidature error:', err.message);
    const status = err.code === 'CONFIG' ? 503 : 500;
    return res.status(status).json({ error: "Envoi impossible pour le moment." });
  }
}
