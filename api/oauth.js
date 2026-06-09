// Démarrage de l'authentification GitHub pour le CMS (Sveltia/Decap).
// Redirige l'utilisateur vers GitHub pour autoriser l'accès au dépôt.
// Nécessite les variables d'env OAUTH_GITHUB_CLIENT_ID / _SECRET (voir DEPLOIEMENT.md).
export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    res.statusCode = 500;
    res.end('OAUTH_GITHUB_CLIENT_ID manquant (variables d’environnement Vercel).');
    return;
  }
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${proto}://${req.headers.host}/api/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    allow_signup: 'false',
  });
  res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params.toString()}` });
  res.end();
}
