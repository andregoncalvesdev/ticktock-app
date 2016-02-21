import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import styles from './TaskListItem.module.css';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      playButtonState: 'paused',
      playButtonStyles: {
        left: styles.left,
        right: styles.right,
        triangle_1: styles.triangle_1,
        triangle_2: styles.triangle_2
      }
    };

    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  handlePlayButton() {
    if (this.state.playButtonState === 'paused'){
      this.setState(
        {
          playButtonState: 'playing',
          playButtonStyles: {
            left: styles.paused_left,
            right: styles.paused_right,
            triangle_1: styles.paused_triangle_1,
            triangle_2: styles.paused_triangle_2
          }
        }
      );
    } else {
      this.setState(
        {
          playButtonState: 'paused',
          playButtonStyles: {
            left: styles.left,
            right: styles.right,
            triangle_1: styles.triangle_1,
            triangle_2: styles.triangle_2
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
