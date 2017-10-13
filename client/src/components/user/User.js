import React from 'react';
import './User.css';

const User = (props) => {
  const userName = `${props.user.forename} ${props.user.surname}`;
  // convert data from UTC
  const userCreated = new Date(props.user.created).toLocaleString();
  return (
    <li className="User">
      <div className="User__bar">
        <div>
          <div>{userName}</div>
          <div className="User__subtitle">{props.user.email}</div>
          <div className="User__subtitle">Created at {userCreated} (ID = {props.user.id})</div>
        </div>
        <div>
          <button
            className="button--blue"
            onClick={props.onSelectForEdit}>Edit</button>
          <button
            className="button--white"
            onClick={props.onSelectForDelete}>Delete</button>
        </div>
      </div>
      <div className="User__hr"/>
    </li>
  )
}

export default User;
