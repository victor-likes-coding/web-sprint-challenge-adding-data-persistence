// build your `Resource` model here
const db = require('../data/db-config');

function getResources() {
  return db('resources');
}

function getResourceById(id) {
  return db('resources').where({ id }).first();
}

function addResource(resource) {
  return db('resources')
    .insert(resource)
    .then((ids) => {
      return getResourceById(ids[0]);
    });
}

function updateResource(id, changes) {
  return db('resources')
    .where({ id })
    .update(changes)
    .then(() => {
      return getResourceById(id);
    });
}

function removeResource(id) {
  return db('resources').where({ id }).del();
}

module.exports = {
  getResources,
  getResourceById,
  addResource,
  updateResource,
  removeResource,
};
