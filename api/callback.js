// Callback OAuth GitHub pour le CMS : échange le "code" contre un token
// d'accès, puis le transmet à la fenêtre du CMS via postMessage.
export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  const url = new URL(req.url, `https://${req.headers.host}`);
  const code = url.searchParams.get('code');

  if (!clientId || !clientSecret) {
    res.statusCode = 500;
    res.end('Configuration OAuth GitHub incomplète (variables d’environnement).');
    return;
  }

  let message;
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await tokenRes.json();
    if (data.access_token) {
      message = 'authorization:github:success:' + JSON.stringify({ token: data.access_token, provider: 'github' });
    } else {
      message = 'authorization:github:error:' + JSON.stringify({ error: data.error || 'no_token' });
    }
  } catch (e) {
    message = 'authorization:github:error:' + JSON.stringify({ error: 'request_failed' });
  }

  // Handshake attendu par Sveltia/Decap CMS.
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
  (function () {
    var message = ${JSON.stringify(message)};
    function receive(e) {
      if (window.opener) window.opener.postMessage(message, e.origin);
      window.removeEventListener('message', receive, false);
      window.close();
    }
    window.addEventListener('message', receive, false);
    if (window.opener) window.opener.postMessage('authorizing:github', '*');
  })();
</script>
Connexion en cours…
</body></html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
}
