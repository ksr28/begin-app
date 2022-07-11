let arc = require('@architect/functions')

async function logout() {
  return {
    statusCode: 302,
    session: {},
    location: '/'
  }
}

exports.handler = arc.http.async(logout)
