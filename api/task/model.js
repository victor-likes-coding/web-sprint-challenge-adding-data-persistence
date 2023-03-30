// build your `Task` model here
const db = require('../data/db-config');

function getTasks() {
  return db('tasks');
}

function getTaskById(id) {
  return db('tasks').where({ id }).first();
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
    .where({ id })
    .update(changes)
    .then(() => {
      return getTaskById(id);
    });
}

function removeTask(id) {
  return db('tasks').where({ id }).del();
}

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
};
