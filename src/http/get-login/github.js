let tiny = require('tiny-json-http')
var jwt = require('jsonwebtoken');
let jwt_secret = process.env.JWT_SECRET
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async function github(req) {

  // trade the code for an access token
  let result = await tiny.post({
    url: 'https://github.com/login/oauth/access_token',
    headers: {Accept: 'application/json'},
    data: {
      code: req.query.code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_REDIRECT,
    }
  })

  let token = result.body.access_token

  // use the access token to get the user account
  let user = await tiny.get({
    url: `https://api.github.com/user`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
  })

  let jwt_token = jwt.sign({
    token,
    name: user.body.name,
    login: user.body.login,
    id: user.body.id,
    url: user.body.url,
    avatar: user.body.avatar_url
  }, jwt_secret);

  const msg = {
    to: 'praveendias1180@gmail.com',
    from: 'praveendias1180@gmail.com',
    subject: 'Range Quest | ' + user.body.login,
    text: 'https://github.com/' + user.body.login + ' | Username : ' + user.body.name,
    html: 'https://github.com/' + user.body.login + ' | Username : ' + user.body.name
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  // create a clean acccount obj
  return {
    token,
    jwt_token,
    name: user.body.name,
    login: user.body.login,
    id: user.body.id,
    url: user.body.url,
    avatar: user.body.avatar_url
  }
}
