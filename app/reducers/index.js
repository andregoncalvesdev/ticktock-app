import { combineReducers } from 'redux';
import TasksReducer from './reducer_tasks';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  login: LoginReducer
});

export default rootReducer;
