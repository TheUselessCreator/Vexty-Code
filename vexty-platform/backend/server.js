const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

const projectsDir = path.join(__dirname, 'projects');

// Ensure the projects directory exists
fs.mkdir(projectsDir, { recursive: true });

// Create a new project
app.post('/api/projects', async (req, res) => {
    const { name } = req.body;
    const projectPath = path.join(projectsDir, name);

    try {
        await fs.mkdir(projectPath, { recursive: true });
        res.status(201).json({ message: 'Project created successfully', name });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
});

// Delete a project
app.delete('/api/projects/:name', async (req, res) => {
    const { name } = req.params;
    const projectPath = path.join(projectsDir, name);

    try {
        await fs.rmdir(projectPath, { recursive: true });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
});

// List all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await fs.readdir(projectsDir);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error listing projects:', error);
        res.status(500).json({ message: 'Error listing projects', error: error.message });
    }
});

// Create a new file
app.post('/api/projects/:projectName/files', async (req, res) => {
    const { projectName } = req.params;
    const { fileName } = req.body;
    const filePath = path.join(projectsDir, projectName, fileName);

    try {
        await fs.writeFile(filePath, ''); // Create an empty file
        res.status(201).json({ message: 'File created successfully', fileName });
    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).json({ message: 'Error creating file', error: error.message });
    }
});

// Delete a file
app.delete('/api/projects/:projectName/files/:fileName', async (req, res) => {
    const { projectName, fileName } = req.params;
    const filePath = path.join(projectsDir, projectName, fileName);

    try {
        await fs.unlink(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Error deleting file', error: error.message });
    }
});

// List files in a project
app.get('/api/projects/:projectName/files', async (req, res) => {
    const { projectName } = req.params;
    const projectPath = path.join(projectsDir, projectName);

    try {
        const files = await fs.readdir(projectPath);
        res.status(200).json(files);
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({ message: 'Error listing files', error: error.message });
    }
});

// Get the content of a file
app.get('/api/projects/:projectName/files/:fileName', async (req, res) => {
    const { projectName, fileName } = req.params;
    const filePath = path.join(projectsDir, projectName, fileName);

    try {
        const content = await fs.readFile(filePath, 'utf8');
        res.status(200).json({ content });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Error reading file', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
