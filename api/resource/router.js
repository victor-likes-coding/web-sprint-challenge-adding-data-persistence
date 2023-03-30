// build your `/api/resources` router here
const express = require('express');
const { getResources, getResourceById, addResource, updateResource, removeResource } = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const resources = await getResources();
    res.json(resources);
  } catch (err) {
    next({ status: 500, message: 'Could not retrieve resources.' });
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const resource = await getResourceById(id);
    if (resource) {
      res.json(resource);
    } else {
      next({ status: 404, message: `Resource with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not retrieve resource with ID ${id}.` });
  }
});

router.post('/', async (req, res, next) => {
  const resourceData = req.body;
  if (!resourceData.name) {
    next({ status: 400, message: 'Resource name is required.' });
  } else {
    try {
      const newResource = await addResource(resourceData);
      res.status(201).json(newResource);
    } catch (err) {
      next({ status: 500, message: 'Could not add resource.' });
    }
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const resource = await getResourceById(id);
    if (resource) {
      if (!changes.name) {
        next({ status: 400, message: 'Resource name is required.' });
      } else {
        const updatedResource = await updateResource(id, changes);
        res.json(updatedResource);
      }
    } else {
      next({ status: 404, message: `Resource with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not update resource with ID ${id}.` });
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const resource = await getResourceById(id);
    if (resource) {
      await removeResource(id);
      res.json(resource);
    } else {
      next({ status: 404, message: `Resource with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not delete resource with ID ${id}.` });
  }
});

module.exports = router;
