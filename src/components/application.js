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

  // sortUsers(function) {
  //   const { users } = this.state;
  //   const results = users.sort(function).map((user, index) => (
  //     <div key={index} className="user-list-item row">
  //       <div className="user-list-field col-xs-4" >{user.username}</div>
  //       <div className="user-list-field col-xs-2" >{user.alltime}</div>
  //       <div className="user-list-field col-xs-2" >{user.recent}</div>
  //       <div className="user-list-field col-xs-4" >{user.lastUpdate.substring(0, 10)}</div>
  //     </div>
  //   ));
  // }

  render() {
    const { users } = this.state;
    if (!users) {
      return <div id="loading-container">Loading</div>;
    }

    const userList = users.map((user, index) => (
      <div key={index} className="user-list-item row">
        <div className="user-list-field col-xs-4" >{user.username}</div>
        <div className="user-list-field col-xs-2" >{user.alltime}</div>
        <div className="user-list-field col-xs-2" >{user.recent}</div>
        <div className="user-list-field col-xs-4" >{user.lastUpdate.substring(0, 10)}</div>
      </div>
    ));

    return (
      <div id="app-container container">
        <div id="user-list">
          <div id="header" className="row">
            <div className="user-list-header col-xs-4" >Username</div>
            <div className="user-list-header col-xs-2" >Alltime</div>
            <div className="user-list-header col-xs-2" >Recent</div>
            <div className="user-list-header col-xs-4" >Updated</div>
          </div>
          <div id="user-list-container" className="container" >
            {userList}
          </div>
        </div>
      </div>
    );
  }
}
