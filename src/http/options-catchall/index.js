let arc = require('@architect/functions')
async function auth(req) {
    return {
        statusCode: 204,
        headers: {
            'Access-Control-Allow-Origin': process.env.FRONTEND_ROOT,
            'Access-Control-Allow-Headers': 'Content-Type,x-auth-token',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE'
        }
    }
}

exports.handler = arc.http.async(auth)