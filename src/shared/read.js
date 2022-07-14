let data = require('@begin/data')

module.exports = async function read(req) {
  let user = req.headers.user;
  let table = `todos-${user.id}`
  let todos = await data.get({table})
  let account = user
  return {
    headers: { 'Access-Control-Allow-Origin': process.env.FRONTEND_ROOT},
    json: {
      account,
      todos
    }
  }
}
