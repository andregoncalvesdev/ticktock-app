import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import styles from './TaskListItem.module.css';
import io from '../utils/socket.io';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      playButtonState: 'paused',
      playButtonStyles: {
        left: styles.paused_left,
        right: styles.paused_right,
        triangle_1: styles.paused_triangle_1,
        triangle_2: styles.paused_triangle_2
      }
    };

    this.handlePlayButton = this.handlePlayButton.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {
    const socket = io.connect('http://localhost:3000');

    const email = this.props.login.email;
    const password = this.props.login.password;
    const task_id = this.props.task.id;

    const fetchData = {email, password, task_id};

    socket.emit('start-timer', fetchData);

    socket.on('start-timer-response', (response, component = this) => {
      const responseObj = JSON.parse(response);

      if (responseObj.errors.length) {
        alert('Dados de login inválidos');
        return false;
      }

      return true;
    });
  }

  handlePlayButton() {
    const hasStarted = this.startTimer();

    if (hasStarted == false) {
      return;
    }

    if (this.state.playButtonState === 'paused') {
      this.setState(
        {
          playButtonState: 'playing',
          playButtonStyles: {
            left: styles.left,
            right: styles.right,
            triangle_1: styles.triangle_1,
            triangle_2: styles.triangle_2
          }
        }
      );
    } else {
      this.setState(
        {
          playButtonState: 'paused',
          playButtonStyles: {
            left: styles.paused_left,
            right: styles.paused_right,
            triangle_1: styles.paused_triangle_1,
            triangle_2: styles.paused_triangle_2
          }
        }
      );
    }
  };

  render() {
    return (
      <li
        key={ this.state.task.id }>
        <div className={ styles.toggle_task }>
         <a className={ styles.play_button } onClick={ this.handlePlayButton }>
          <div className={ this.state.playButtonStyles.left }></div>
          <div className={ this.state.playButtonStyles.right }></div>
          <div className={ this.state.playButtonStyles.triangle_1 }></div>
          <div className={ this.state.playButtonStyles.triangle_2 }></div>
         </a>
        </div>
        <div className={ styles.task_info }>
          <h4 className={ styles.task_name }>{ this.state.task.task_name }</h4>
          <p className={ styles.project_name }>{ this.state.task.project_name }</p>
          <p className={ styles.customer_name }>{ this.state.task.customer_name }</p>
        </div>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login[0]
  };
}

export default connect(mapStateToProps)(TaskListItem);
