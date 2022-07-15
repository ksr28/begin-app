let arc = require('@architect/functions')

function not_found(req) {
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        json: {
            error: 'not_authorized',
            message: 'not_authorized',
        }
    }
}

exports.handler = arc.http(not_found)