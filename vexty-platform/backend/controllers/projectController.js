const fs = require('fs');
const path = require('path');

const MAX_PROJECTS = 10;

// Create project directory if it doesn't exist
function createProjectDir(projectName) {
    const projectPath = path.join(__dirname, '../projects', projectName);
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath, { recursive: true });
    }
}

// Create a new project
exports.createProject = (req, res) => {
    const { projectName } = req.body;

    // Limit the number of projects
    const projects = fs.readdirSync(path.join(__dirname, '../projects'));
    if (projects.length >= MAX_PROJECTS) {
        return res.status(400).json({ message: 'Project limit reached. Delete a project to create a new one.' });
    }

    createProjectDir(projectName);
    res.status(201).json({ message: 'Project created successfully.' });
};

// List all projects
exports.listProjects = (req, res) => {
    const projectsDir = path.join(__dirname, '../projects');
    const projects = fs.readdirSync(projectsDir).map(dir => ({ name: dir }));
    res.status(200).json(projects);
};

// Delete a project
exports.deleteProject = (req, res) => {
    const { projectName } = req.body;
    const projectPath = path.join(__dirname, '../projects', projectName);

    if (fs.existsSync(projectPath)) {
        fs.rmdirSync(projectPath, { recursive: true });
        res.status(200).json({ message: 'Project deleted successfully.' });
    } else {
        res.status(404).json({ message: 'Project not found.' });
    }
};
