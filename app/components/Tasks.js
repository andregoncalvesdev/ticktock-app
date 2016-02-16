import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import styles from './Tasks.module.css';

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderList() {
   return this.props.tasks.map((task) => {
     return (
       <li
         key={ task.id }>
         { task.task_name }
       </li>
     );
   });
 }

  render() {
    return (
      <ul className="">
        { this.renderList() }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    tasks: state.tasks[0]
  };
}

export default connect(mapStateToProps)(Tasks);
