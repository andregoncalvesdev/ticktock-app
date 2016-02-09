export const ASSIGN_TASKS = 'ASSIGN_TASKS';

export function assignTasks(tasks) {
  return {
    type: ASSIGN_TASKS,
    payload: tasks
  };
}
