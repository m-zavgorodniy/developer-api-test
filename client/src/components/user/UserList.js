import React, { Component } from 'react';
import UserAction from './UserAction';
import User from './User';
import config from 'config';
import './UserList.css';

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      status: 'fetch', // fetch|ready|error
      mode: '', // edit|delete
      userSelected: null
    }
  }

  componentDidMount() {
    this._fetchUsers();
  }

  render() {
    return (
      <section className="UserList">
        <h1 className="UserList__title">Users API Test</h1>
        <UserAction
          onSuccess={this._fetchUsers.bind(this)}
          mode={this.state.mode}
          user={this.state.userSelected}
          onCancel={() => this._switchToDefault()}
          debug={this.props.debug}/>
        <UserListGrid
          users={this.state.users}
          status={this.state.status}
          onSelectForEdit={(user) => this._switchToEdit(user)}
          onSelectForDelete={(user) => this._switchToDelete(user)}/>
      </section>
    )
  }

  _fetchUsers() {
    const URL = `${config.API_HOST_URL}/api/users`;
    fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((res) => {

      this.props.debug({req: {method: 'GET', url: URL}, res: res, secondary: true});

      this.setState({
        users: res.data,
        status: 'ready',
        mode: '',
        userSelected: []
      });
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        status: 'error'
      });
    }); 
  }

  _switchToDefault() {
    this.setState({
      mode: '',
      userSelected: null
    });
  }

  _switchToEdit(user) {
    console.log('Editing ', user);
    this.setState({
      mode: 'edit',
      userSelected: user
    });
  }

  _switchToDelete(user) {
    console.log('About to delete ', user);
    this.userSelected = user;
    this.setState({
      mode: 'delete',
      userSelected: user
    });
  }
}

class UserListGrid extends Component {
  render() {

    // check the status
    // if not ready, make the user aware - that's it

    const status = this.props.status;
    if ("ready" !== status) {
      return (
        <div className="UserList__message">
          { "fetch" === status ? "Loading..." : "Something went wrong..." }
        </div>
      )
    }

    // the data is ready - proceed with the list

    const userCount = this.props.users.length;
    return (
      <div>
        <h2 className="UserList__title">Users {userCount ? `(${userCount})` : ''}</h2>
        <ul>
        { userCount ? 
            this.props.users.map((user) => {
              return (
                <User
                  key={user.id}
                  user={user}
                  onSelectForEdit={() => this.props.onSelectForEdit(user)}
                  onSelectForDelete={() => this.props.onSelectForDelete(user)}
                  onCancel={() => this.props.onCancel()}/>
                )
            }) :
            <li className="UserList__empty">No users in the database</li>
        }
        </ul>
      </div>
    )
  }
}

export default UserList;
