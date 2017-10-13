## API Developer Test
by Maxim Zavgorodniy

The API implements basic CRUD model:
- *POST: /users* - Create user
- *GET: /users* - Get list of users
- *GET: /users/{userid}* - Get user by user id
- *PUT: /users/{userid}* - Update user
- *DELETE: /users/{userid}* - Delete user

The format of the JSON follows [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml)

The API provides the following error status codes, accordingly to [RFC 7231](https://tools.ietf.org/html/rfc7231#section-6):
- 400 Bad request - the client provided malformed parameters
- 404 Not found - the client requests an operation on record that does not exist or has been deleted

The API is being served from Heroku (https://developer-api-test.herokuapp.com/api/users)

### API Client

To consume the API please use [Custom interface](https://developer-api-client.herokuapp.com/) (implemented with React).
The requests from the client and responds from the API responds can be watched on the right hand side panel of the interface.

The client is also available for review in the [client](https://github.com/superpuper/developer-api-test/tree/master/client) directory of the repo.


