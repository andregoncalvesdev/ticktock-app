import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import styles from './Home.module.css';
import Textfield from 'material-ui/lib/textfield';
import RaisedButton from 'material-ui/lib/raised-button';
import io from '../utils/socket.io';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      styles: {
        logoURL: '../images/mrticktock-logo.png',
        submitButton: {
          background: '#003366',
          label: '#fff',
          fullWidth: true
        }
      }
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.login = this.login.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  redirectTo(path) {
    this.transitionTo('/tasks')
  }

  login() {
    const socket = io.connect('http://localhost:3000');

    const email = this.state.email;
    const password = this.state.password;

    const loginData = {email, password};

    socket.emit('login', loginData);

    socket.on('logged', (tasks, component = this) => {
      console.log(tasks);

      debugger
    });
  }

  onInputChange(e) {
    switch (e.target.attributes.id.value) {
      case "email":
        this.setState({email: e.target.value})
        break;
      case "password":
        this.setState({password: e.target.value})
        break;
    }
  }

  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.form_container }>
          <img className={ styles.logo} src={this.state.styles.logoURL}></img><br />
          <div className={ styles.field_group }>
            <Textfield id="email" label="email" onChange={ this.onInputChange }/><br />
            <Textfield id="password" label="password" onChange={ this.onInputChange }/><br />
          </div>
          <RaisedButton
            label="log in"
            className={ styles.submit_button }
            backgroundColor= { this.state.styles.submitButton.background }
            labelColor= { this.state.styles.submitButton.label }
            fullWidth= { this.state.styles.submitButton.fullWidth }
            onClick={ this.login }
          />
        </div>
      </div>
    );
  }
}
