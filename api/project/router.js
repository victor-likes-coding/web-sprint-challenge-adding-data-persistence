const express = require('express');
const { addProject, getProjectById, getProjects, removeProject, updateProject } = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await getProjects();
    const mapped = projects.map(({ project_completed, ...project }) => ({ ...project, project_completed: Boolean(project_completed) }));
    res.json(mapped);
  } catch (err) {
    next({ status: 500, message: 'Could not retrieve projects.' });
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await getProjectById(id);
    if (project) {
      res.json(project);
    } else {
      next({ status: 404, message: `Project with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not retrieve project with ID ${id}.` });
  }
});

router.post('/', async (req, res, next) => {
  const projectData = req.body;
  if (!projectData.project_name) {
    next({ status: 400, message: 'Project name is required.' });
  } else {
    try {
      const project = await addProject(projectData);
      res.status(201).json({ ...project, project_completed: Boolean(project.project_completed) });
    } catch (err) {
      console.log(err);
      next({ status: 500, message: 'Could not add project.' });
    }
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const project = await getProjectById(id);
    if (project) {
      if (!changes.name) {
        next({ status: 400, message: 'Project name is required.' });
      } else {
        const updatedProject = await updateProject(id, changes);
        res.json(updatedProject);
      }
    } else {
      next({ status: 404, message: `Project with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not update project with ID ${id}.` });
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await getProjectById(id);
    if (project) {
      await removeProject(id);
      res.json(project);
    } else {
      next({ status: 404, message: `Project with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not delete project with ID ${id}.` });
  }
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
