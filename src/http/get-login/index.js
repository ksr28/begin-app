let arc = require('@architect/functions')
let github = require('./github')
let root = process.env.FRONTEND_ROOT

async function login(req) {
  if (req.query.code) {
    let account = await github(req)
    return {
      statusCode: 200,
      session: { account },
      headers: { 'Access-Control-Allow-Origin': root, 'Access-Control-Expose-Headers': 'x-auth-token', 'x-auth-token': account.jwt_token },
    }
  }
  else {
    return {
      statusCode: 302,
      location: root + '/?authorized=false'
    }
  }
}

exports.handler = arc.http.async(login)
