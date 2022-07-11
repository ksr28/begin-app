let arc = require('@architect/functions')
let github = require('./github')

async function login(req) {
  if (req.query.code) {
    let account = await github(req)
    return {
      statusCode: 302,
      session: { account },
      location: '/'
    }
  }
  else {
    return {
      statusCode: 302,
      location: '/?authorized=false'
    }
  }
}

exports.handler = arc.http.async(login)
