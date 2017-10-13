const storage = require('../storage');

// create
exports.post = (req, callback) => {
  processBody(req, callback, true)
}

// update
exports.put = (req, callback) => {
  processBody(req, callback)
}

// read
exports.get = (req, callback) => {
  processParams(req, callback)
}

// delete
exports.delete = (req, callback) => {
  processParams(req, callback, true)
}


// now processing

const processBody = (req, callback, isNew = false) => {
  
  // validate the inputs

  req.check("forename", "Forename is empty").trim().notEmpty();
  req.check("surname", "Surname is empty").trim().notEmpty();
  req.check("email", "Email is empty").trim().notEmpty();
  req.check("email", "Enter a valid email address").trim().isEmail();

  if (!isNew) {
    req.check("id", "Id must be integer").matches(/^\d+$/);
  }

  let validationErrors = req.validationErrors();

  if (validationErrors) {

    callback({error: {errors: validationErrors, code: 400, message: 'Inputs checks failed'}});

  } else {

    // sanitize the inputs

    req.sanitize("forename").trim();
    req.sanitize("surname").trim();
    req.sanitize("email").trim();
    req.sanitize("email").normalizeEmail();

    if (!isNew) {
      req.sanitize("id").toInt();
    }

    let data = req.body;

    // empty id to be filled after the action is completed
    let user = {
      id: '',
      email: data.email,
      forename: data.forename,
      surname: data.surname,
    }

    if (isNew) {

      let newUser = user;

      // store UTC dates
      newUser.created = new Date().toISOString();

      // the storage returns the newly added user's id
      newUser.id = storage.add(newUser);

      console.log('User added:', newUser);
      callback({data: newUser});

    } else {

      let id = req.params.id;
      user.id = id;

      if (true === storage.update(id, user)) {

        console.log('User (ID=' + id + ') updated with: ' , user);
        callback({data: user});

      } else {

        // the storage returns false on wrong id - send 'not found'
        callback({error: {errors: [], code: 404, message: 'Not found'}});

      }

    }
  }
}

// get users

processParams = (req, callback, isDelete) => {

  if (req.params.id === undefined ) {

    // all users

    const users = storage.getAll();
    callback({data: users});

  } else {

    // one user

    req.check("id", "Id must be integer").matches(/^\d+$/);

    let validationErrors = req.validationErrors();

    if (validationErrors) {
      
      callback({error: {errors: validationErrors, code: 400, message: 'Wrong parameter value'}});

    } else {

      req.sanitize("id").toInt();

      const id = req.params.id;

      if (isDelete) {
        if (true === storage.delete(id)) {
          callback({data: {id: id}});
        } else {
          // the storage returns false on wrong id - send 'not found'
          callback({error: {errors: [], code: 404, message: 'Not found'}});
        }
      } else {
        const users = storage.get(id);
        if (false !== users) {
          callback({data: users});
        } else {
          // the storage returns false on wrong id - send 'not found'
          callback({error: {errors: [], code: 404, message: 'Not found'}});
        }
      }

    }
  }
}