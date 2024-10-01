const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like HTML, CSS, JS)

// Project directory limit
const MAX_PROJECTS = 10;

// Create project directory if it doesn't exist
function createProjectDir(projectName) {
    const projectPath = path.join(__dirname, 'projects', projectName);
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath, { recursive: true });
    }
}

// Endpoint to create a new project
app.post('/api/projects/create', (req, res) => {
    const { projectName } = req.body;

    // Limit the number of projects
    const projects = fs.readdirSync(path.join(__dirname, 'projects'));
    if (projects.length >= MAX_PROJECTS) {
        return res.status(400).json({ message: 'Project limit reached. Delete a project to create a new one.' });
    }

    createProjectDir(projectName);
    res.status(201).json({ message: 'Project created successfully.' });
});

// Endpoint to list all projects
app.get('/api/projects', (req, res) => {
    const projectsDir = path.join(__dirname, 'projects');
    const projects = fs.readdirSync(projectsDir).map(dir => ({ name: dir }));
    res.status(200).json(projects);
});

// Endpoint to delete a project
app.delete('/api/projects/delete', (req, res) => {
    const { projectName } = req.body;
    const projectPath = path.join(__dirname, 'projects', projectName);

    if (fs.existsSync(projectPath)) {
        fs.rmdirSync(projectPath, { recursive: true });
        res.status(200).json({ message: 'Project deleted successfully.' });
    } else {
        res.status(404).json({ message: 'Project not found.' });
    }
});

// Endpoint to create a new file
app.post('/api/files/create', (req, res) => {
    const { projectName, fileName, fileContent } = req.body;
    const filePath = path.join(__dirname, 'projects', projectName, fileName);

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) return res.status(500).json({ message: 'Error creating file' });
        res.status(201).json({ message: 'File created successfully.' });
    });
});

// Endpoint to list files in a project
app.get('/api/projects/:projectName/files', (req, res) => {
    const { projectName } = req.params;
    const projectPath = path.join(__dirname, 'projects', projectName);

    if (!fs.existsSync(projectPath)) {
        return res.status(404).json({ message: 'Project not found.' });
    }

    const files = fs.readdirSync(projectPath).map(file => ({ name: file }));
    res.status(200).json(files);
});

// Endpoint to delete a file
app.delete('/api/files/delete', (req, res) => {
    const { projectName, fileName } = req.body;
    const filePath = path.join(__dirname, 'projects', projectName, fileName);

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) return res.status(500).json({ message: 'Error deleting file' });
            res.status(200).json({ message: 'File deleted successfully.' });
        });
    } else {
        res.status(404).json({ message: 'File not found.' });
    }
});

// Endpoint to rename a file
app.post('/api/files/rename', (req, res) => {
    const { projectName, oldFileName, newFileName } = req.body;
    const oldFilePath = path.join(__dirname, 'projects', projectName, oldFileName);
    const newFilePath = path.join(__dirname, 'projects', projectName, newFileName);

    if (fs.existsSync(oldFilePath)) {
        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) return res.status(500).json({ message: 'Error renaming file' });
            res.status(200).json({ message: 'File renamed successfully.' });
        });
    } else {
        res.status(404).json({ message: 'File not found.' });
    }
});

// Endpoint to run Vexy code
app.post('/api/run', (req, res) => {
    const { projectName, fileName } = req.body;
    const filePath = path.join(__dirname, 'projects', projectName, fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found.' });
    }

    // Assuming you have a Vexy interpreter command line tool
    exec(`vexy ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ message: 'Error running Vexy code', error: stderr });
        }
        res.status(200).json({ output: stdout });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
