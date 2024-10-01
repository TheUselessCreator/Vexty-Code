const fs = require('fs');
const path = require('path');

// Create a new file
exports.createFile = (req, res) => {
    const { projectName, fileName, fileContent } = req.body;
    const filePath = path.join(__dirname, '../projects', projectName, fileName);

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) return res.status(500).json({ message: 'Error creating file' });
        res.status(201).json({ message: 'File created successfully.' });
    });
};

// List files in a project
exports.listFiles = (req, res) => {
    const { projectName } = req.params;
    const projectPath = path.join(__dirname, '../projects', projectName);

    if (!fs.existsSync(projectPath)) {
        return res.status(404).json({ message: 'Project not found.' });
    }

    const files = fs.readdirSync(projectPath).map(file => ({ name: file }));
    res.status(200).json(files);
};

// Delete a file
exports.deleteFile = (req, res) => {
    const { projectName, fileName } = req.body;
    const filePath = path.join(__dirname, '../projects', projectName, fileName);

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) return res.status(500).json({ message: 'Error deleting file' });
            res.status(200).json({ message: 'File deleted successfully.' });
        });
    } else {
        res.status(404).json({ message: 'File not found.' });
    }
};

// Rename a file
exports.renameFile = (req, res) => {
    const { projectName, oldFileName, newFileName } = req.body;
    const oldFilePath = path.join(__dirname, '../projects', projectName, oldFileName);
    const newFilePath = path.join(__dirname, '../projects', projectName, newFileName);

    if (fs.existsSync(oldFilePath)) {
        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) return res.status(500).json({ message: 'Error renaming file' });
            res.status(200).json({ message: 'File renamed successfully.' });
        });
    } else {
        res.status(404).json({ message: 'File not found.' });
    }
};

