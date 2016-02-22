export const ASSIGN_TASKS = 'ASSIGN_TASKS';
export const STORE_LOGIN = 'STORE_LOGIN';

export function assignTasks(tasks) {
  return {
    type: ASSIGN_TASKS,
    payload: tasks
  };
}

export function storeLogin(login) {
  return {
    type: STORE_LOGIN,
    payload: login
  };
}
