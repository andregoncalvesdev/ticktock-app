import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import Textfield from 'material-ui/lib/textfield';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {
        logoURL: '../images/mrticktock-logo.png',
        submitButton: {
          background: '#003366',
          label: '#fff',
          fullWidth: true
        }
      }
    };
  }

  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.form_container }>
          <img className={ styles.logo} src={this.state.styles.logoURL}></img><br />
          <div className={ styles.field_group }>
            <Textfield label="Default" /><br />
            <Textfield label="Default" /><br />
          </div>
          <RaisedButton
            label="log in"
            className={ styles.submit_button }
            backgroundColor= { this.state.styles.submitButton.background }
            labelColor= { this.state.styles.submitButton.label }
            fullWidth= { this.state.styles.submitButton.fullWidth }
          />
        </div>
      </div>
    );
  }
}
