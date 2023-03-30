// build your `Task` model here
const db = require('../../data/dbConfig');

function getTasks() {
  return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
    .then((tasks) => {
      return tasks.map((task) => {
        return { ...task, task_completed: Boolean(task.task_completed) };
      });
    });
}

function getTaskById(id) {
  return db('tasks')
    .where({ task_id: id })
    .first()
    .then((task) => ({ ...task, task_completed: Boolean(task.task_completed) }));
}

function addTask(task) {
  return db('tasks')
    .insert(task)
    .then((ids) => {
      return getTaskById(ids[0]);
    });
}

function updateTask(id, changes) {
  return db('tasks')
    .where({ task_id: id })
    .update(changes)
    .then(() => {
      return getTaskById(id);
    });
}

function removeTask(id) {
  return db('tasks').where({ task_id: id }).del();
}

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
};
