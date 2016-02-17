import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import styles from './Tasks.module.css';
import TaskListItem from './TaskListItem'

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: this.props.tasks
    };
  }

  renderList() {
   return this.state.tasks.map((task) => {
     return (<TaskListItem task={ task } />);
   });
 }

  render() {
    return (
      <section>
        <article>
          <ul className="tasks-list">
            { this.renderList() }
          </ul>
        </article>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks[0]
  };
}

export default connect(mapStateToProps)(Tasks);
