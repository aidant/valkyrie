export default {
  token: process.env.token,
  clientId: process.env.clientId,
  apiURL: process.env.apiURL,
  webhookToken: process.env.webhookToken,
  webhookClientId: process.env.webhookClientId,
  invite: `https://discordapp.com/oauth2/authorize?permissions=67161153&scope=bot&client_id=${process.env.clientId}`
};
