const CLIENT_ID = '326776711119-8f7t8s12tvovim6d4mtlurghli6k6sde.apps.googleusercontent.com';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

function getPayload(id_token, callback, error) {
  async function verify() {
    let ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID
    });
    let  payload = ticket.getPayload();
    return payload;
  }
  verify()
    .catch(error)
    .then(callback);

}

exports.getPayload = getPayload;
