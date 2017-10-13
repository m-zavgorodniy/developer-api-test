import React, { Component } from 'react';
import config from 'config';
import './UserAction.css';

class UserAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '', // processing|success|error
      mode: '', // add|edit|delete
      user: {
        id: '',
        forename: '',
        surname: '',
        email: ''
      }
    };
    this.formInputs = {}; // refs
    this.formMessage = '';
  }

  componentWillReceiveProps(nextProps) {
    let mode = 'add';
    let user = {
      id: '',
      forename: '',
      surname: '',
      email: ''
    }
    if (nextProps.mode !== '') {
      mode = nextProps.mode;
      user = nextProps.user;
    }
    this.setState({ user, mode });
  }

  render() {
    let messageJSX = null;
    if (this.formMessage) {
      const messageClassName = `UserAction__message${this.state.status === 'error' ? ' UserAction__message--error' : ''}`
      messageJSX = <div className={messageClassName}>{this.formMessage}</div>
    }

    let isDelete = false;
    let buttonText = 'Add';
    let buttonClassName = 'button--blue';
    let headerText = 'Add user';
    let headerClassName = '';
    if (this.state.mode === 'edit') {
      headerText = `Edit user (ID=${this.state.user.id})`;
      buttonText = 'Update';
    } else if (this.state.mode === 'delete') {
      headerText = `Delete user (ID=${this.state.user.id})`;
      buttonText = 'Delete';
      headerClassName = 'UserList__subtitle--delete';
      buttonClassName = 'button--red';
      isDelete = true;
    }
    return (
      <section>
        <h2 className={headerClassName}>{headerText}</h2>

        {messageJSX}

        <form name="addUserForm" onSubmit={this._handleSubmit.bind(this)}>
          <div>
            <input type="hidden" value={this.state.user.id} ref={(input) => {this.formInputs.id = input; }}/>
            <input type="text" placeholder="Forename" value={this.state.user.forename} disabled={isDelete} onChange={this._handleChange.bind(this)} ref={(input) => {this.formInputs.forename = input; }}/>
            <input type="text" placeholder="Surname" value={this.state.user.surname} disabled={isDelete} onChange={this._handleChange.bind(this)} ref={(input) => {this.formInputs.surname = input; }}/>
          </div>
          <div>
            <input type="text" className="wide" placeholder="Email" value={this.state.user.email} disabled={isDelete} onChange={this._handleChange.bind(this)} ref={(input) => {this.formInputs.email = input; }}/>
            <button type="submit" className={buttonClassName} disabled={this.state.status==='processing'}>{buttonText}</button>
            { this.state.mode !== '' && this.state.mode !== 'add' ?
              <button type="button" className="button--white" onClick={() => this.props.onCancel()}>Cancel</button> : null }
          </div>
        </form>
      </section> 
    )
  }

  _handleChange(event) {
    // updates the form inputs via state
    let user = {};
    Object.keys(this.formInputs).forEach((key) => {
      user[key] = this.formInputs[key].value;
    });
    this.setState({ user });
  }

  _handleSubmit(event) {
    event.preventDefault();

    // disable the submit button
    this.setState({ 
      status: 'processing'
    });

    // get values from the form inputs 
    let formData = {}
    Object.keys(this.formInputs).forEach((key) => {
      formData[key] = this.formInputs[key].value;
    });

    // if update, add the id to the URL
    let URL = `${config.API_HOST_URL}/api/users`;
    if (this.state.mode !== 'add') {
      URL = `${URL}/${this.state.user.id}`;
    }

    // no body on delete
    let body;
    if (this.state.mode !== 'delete') {
      body = JSON.stringify(formData);
    }

    let requestMethod;
    if (this.state.mode === 'edit') {
      requestMethod = 'PUT';
    } else if (this.state.mode === 'delete') {
      requestMethod = 'DELETE';
    } else {
      requestMethod = 'POST'
    }

    fetch(URL, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
    .then((res) => {
      return res.json(); 
    })
    .then((res) => {

      this.props.debug({req: {method: requestMethod, url: URL, body: body}, res: res});

/*      // debug
      // this is not a React bit, just for a quick check
      document.getElementById('Debug__request').innerHTML = requestMethod + ': ' + URL + (body?'<br/>Body: ' + JSON.stringify(formData) : '');
      document.getElementById('Debug__responseJSON').innerHTML = '<code>' + JSON.stringify(res) + '</code>';
      // /debug*/

      if (res.data) {
        let actionText;
        if (this.state.mode === 'add') {
          actionText = 'added';
        } else if (this.state.mode === 'edit') {
          actionText = 'updated';
        } else if (this.state.mode === 'delete') {
          actionText = 'deleted';
        }
        this.formMessage = 'User ' + actionText;
        this.setState({ 
          status: 'success'
        });
        // callback to refresh the users list
        this.props.onSuccess();
      } else if (res.error) {
        this.formMessage = res.error.errors.map((error, index) => <div key={index}>{error.msg}</div>);
        this.setState({ 
          status: 'error'
        });
      }
    })
    .catch((error) => {
      this.formMessage = 'Something went wrong...';
      this.setState({ 
        status: 'error'
      });
    });
  }
}

export default UserAction;
