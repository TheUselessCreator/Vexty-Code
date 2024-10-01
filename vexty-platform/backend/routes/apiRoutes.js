const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const fileController = require('../controllers/fileController');

// Project routes
router.post('/projects/create', projectController.createProject);
router.get('/projects', projectController.listProjects);
router.delete('/projects/delete', projectController.deleteProject);

// File routes
router.post('/files/create', fileController.createFile);
router.get('/projects/:projectName/files', fileController.listFiles);
router.delete('/files/delete', fileController.deleteFile);
router.post('/files/rename', fileController.renameFile);

// Endpoint to run Vexy code
router.post('/run', (req, res) => {
    const { projectName, fileName } = req.body;
    const filePath = path.join(__dirname, '../projects', projectName, fileName);

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

module.exports = router;
