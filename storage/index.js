// mock storage

const storage = {

//  users: [{
//    id: seq,
//    email: string,
//    forename: string,
//    surname: string,
//    created: datetime
//    deleted: boolean
//  }, ...]

	users: [],

  getAll: () => storage.users.filter((item) => item.deleted !== true),
  get: (id) => storage.users.find((item) => item.id === id && item.deleted !== true) || false,
  add: (user) => {
    user.id = storage.users.length + 1;
    storage.users.push(user);
    return user.id; // returns the new user id
  },
  update: (id, user) => {
    let index = storage.users.findIndex((item) => item.id === id && item.deleted !== true);
    if (index === -1) {
      // not found
      return false; 
    }
    // keep 'created'
    storage.users[index].forename = user.forename;
    storage.users[index].surname = user.surname;
    storage.users[index].email = user.email;
    return true;
  },
  delete: (id) => {
    let index = storage.users.findIndex((item) => item.id === id && item.deleted !== true);
    if (index === -1) {
      // not found
      return false; 
    }
    storage.users[index].deleted = true;
    return true;
  }
}

module.exports = storage