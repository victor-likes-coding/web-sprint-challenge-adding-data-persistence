// build your `Project` model here
const db = require('../../data/dbConfig');

function getProjects() {
  return db('projects');
}

function getProjectById(id) {
  return db('projects').where({ id }).first();
}

function addProject(project) {
  return db('projects')
    .insert(project)
    .then((ids) => {
      return getProjectById(ids[0]);
    });
}

function updateProject(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes)
    .then(() => {
      return getProjectById(id);
    });
}

function removeProject(id) {
  return db('projects').where({ id }).del();
}

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  removeProject,
};
