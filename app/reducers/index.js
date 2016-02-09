import { combineReducers } from 'redux';
import TasksReducer from './reducer_tasks';

const rootReducer = combineReducers({
  tasks: TasksReducer
});

export default rootReducer;
