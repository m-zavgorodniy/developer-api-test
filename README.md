## API Developer Test
by Maxim Zavgorodniy

The API implements basic CRUD model:
- *POST: /api/users* - Create user
- *GET: /api/users* - Get list of users
- *GET: /api/users/:id* - Get user by user id
- *PUT: /api/users/:id* - Update user
- *DELETE: /api/users/:id* - Delete user

The format of the JSON follows [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml)

The API provides the following error satus codes, accordingly to [RFC 7231](https://tools.ietf.org/html/rfc7231#section-6):
- 400 Bad request - the client provided maleformed parameters
- 404 Not found - the client requests an operation on record that does not exist or has been deleted

The API is being served from [heroku][(https://developer-api-test.herokuapp.com/api/users)

To consume the API please use [Custom interface](https://developer-api-client.herokuapp.com/) (implemented with React).
The requests from the client and responds from the API responds can be watched on the right hand side panel of the interface.

The client is also available for review in the 'client' directory.

