import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assignTasks } from '../actions/index';
import { Router, Route, Link, browserHistory } from 'react-router';
import styles from './Home.module.css';
import Textfield from 'material-ui/lib/textfield';
import RaisedButton from 'material-ui/lib/raised-button';
import io from '../utils/socket.io';

export default class Home extends Component {
  constructor(props, context) {
    super(props);
    context.router;

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
    let route = `${path}`;

    this.context.router.push(`/${route}`);
  }

  login() {
    const socket = io.connect('http://localhost:3000');

    const email = this.state.email;
    const password = this.state.password;

    const loginData = {email, password};

    socket.emit('login', loginData);

    socket.on('login-response', (response, component = this) => {
      const responseObj = JSON.parse(response);

      if (responseObj.errors.length) {
        alert('Dados de login inválidos');
        return;
      }

      component.props.assignTasks(responseObj.content);
      component.redirectTo('tasks');
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

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ assignTasks }, dispatch);
}

export default connect(null, mapDispatchToProps)(Home);
