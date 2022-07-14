let arc = require('@architect/functions')
let auth = require('@architect/shared/auth')
let read = require('@architect/shared/read')
let data = require('@begin/data')

async function write(req) {
  let user = req.headers.user;
  let table = `todos-${user.id}`
  let {key, complete} = req.body
  let copy = await data.get({table, key})
  copy.complete = complete
  await data.set(copy)
}

exports.handler = arc.http.async(auth, write, read)
