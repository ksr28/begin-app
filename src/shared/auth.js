var jwt = require('jsonwebtoken');
let jwt_secret = process.env.JWT_SECRET

module.exports = async function auth(req) {
  let x_auth_token = req.headers['x-auth-token'];
  try{
    let verified_user = jwt.verify(x_auth_token, jwt_secret);
    req.headers['user'] = verified_user;

  } catch (e){
    let client_id = process.env.GITHUB_CLIENT_ID
    let redirect_uri = process.env.GITHUB_REDIRECT
    let base = `https://github.com/login/oauth/authorize`
    let href = `${base}?client_id=${client_id}&redirect_uri=${redirect_uri}`
    return {
      statusCode: 403,
      headers: { 'Access-Control-Allow-Origin': process.env.FRONTEND_ROOT},
      json: {
        error: 'not_authorized',
        message: e.message,
        href
      }
    }
  }
}
