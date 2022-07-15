@app
learn-rest

@static
folder public

@http
get /login  # create github oauth session
get /logout # clear session

# json api
get /*
get /todos
post /todos
options /*
put /todos/:key
delete /todos/:key
post /email

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
