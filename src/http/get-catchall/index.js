let arc = require('@architect/functions')

function not_found(req) {
    return {
        statusCode: 404,
        headers: { 'Access-Control-Allow-Origin': process.env.FRONTEND_ROOT },
        json: {
            error: 'not_authorized',
            message: '404 not found',
            href
        }
    }
}

exports.handler = arc.http(not_found)