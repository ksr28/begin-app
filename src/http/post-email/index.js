let arc = require('@architect/functions')
let auth = require('@architect/shared/auth')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function email(req) {

    let status = null
    const msg = {
        to: process.env.SENDGRID_USER,
        from: process.env.SENDGRID_USER,
        subject: 'Range Quest Task Toggle | ' + req.headers.user.login + ' | Key: ' + req.body.key,
        text: 'https://github.com/' + req.headers.user.login + ' | Username : ' + req.headers.user.name,
        html: 'https://github.com/' + req.headers.user.login + ' | Username : ' + req.headers.user.name
    }
    sgMail
        .send(msg)
        .then(() => {
            status = 'success'
        })
        .catch((error) => {
            status = error
            console.error(error)
        })

    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': process.env.FRONTEND_ROOT },
        json: status
    }

}

exports.handler = arc.http.async(auth, email)