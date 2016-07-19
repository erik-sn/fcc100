if (process.env.BROWSER) {
  require('../sass/style.scss');
}

import React, { Component } from 'react';
import axios from 'axios';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: undefined,
    };
  }

  componentWillMount() {
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then((response) => this.setState({ users: response.data }));
  }

  render() {
    const { users } = this.state;
    if (!users) {
      return <div id="loading-container">Loading</div>;
    }

    const userList = users.map((user, index) => (
      <div key={index} className="user-list-item row">
        <div className="user-list-field col-xs-2" >{user.username}</div>
        <div className="user-list-field col-xs-1" >{user.alltime}</div>
        <div className="user-list-field col-xs-1" >{user.recent}</div>
        <div className="user-list-field col-xs-2" >{user.lastUpdate.substring(0, 10)}</div>
      </div>
    ));

    return (
      <div id="app-container">
        
        <div id="header" className="row">
          <div className="user-list-header col-xs-2" >Username</div>
          <div className="user-list-header col-xs-1" >Alltime</div>
          <div className="user-list-header col-xs-1" >Recent</div>
          <div className="user-list-header col-xs-2" >Updated</div>
        </div>
        <div id="user-list">
          <div id="user-list-constainer" >
            {userList}
          </div>
        </div>
      </div>
    );
  }
}
