import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import styles from './TaskListItem.module.css';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      button: 'paused'
    };

    this.handleToggleTask = this.handleToggleTask.bind(this);
  }

  handleToggleTask() {
    if (this.state.button === 'paused'){
      this.setState({button: ''});
    } else {
      this.setState({button: 'paused'});
    }
  };

  render() {
    return (
      <li
        key={ this.state.task.id }>
        <div className={ styles.toggle_task }>
         <a className={ styles.play_button + ' ' + this.state.button } onClick={ this.handleToggleTask }>
          <div className={ styles.left }></div>
          <div className={ styles.right }></div>
          <div className={ styles.triangle_1 }></div>
          <div className={ styles.triangle_2 }></div>
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
