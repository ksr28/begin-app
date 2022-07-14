let arc = require('@architect/functions')
let auth = require('@architect/shared/auth')
let read = require('@architect/shared/read')
let data = require('@begin/data')

async function create(req) {
  let user = req.headers.user;
  await data.set({
    table: `todos-${user.id}`, 
    ...req.body
  })
}

exports.handler = arc.http.async(auth, create, read)
