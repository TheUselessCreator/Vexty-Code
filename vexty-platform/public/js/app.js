document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('input');
    const createProjectBtn = document.getElementById('createProject');
    const listProjectsBtn = document.getElementById('listProjects');
    const deleteProjectBtn = document.getElementById('deleteProject');
    const createFileBtn = document.getElementById('createFile');
    const deleteFileBtn = document.getElementById('deleteFile');
    const renameFileBtn = document.getElementById('renameFile');
    const listFilesBtn = document.getElementById('listFiles');
    const projectNameInput = document.getElementById('projectName');
    const fileNameInput = document.getElementById('fileName');

    // Utility function to display messages in the console
    function displayMessage(message) {
        outputDiv.innerHTML += `<p>${message}</p>`;
    }

    // Function to create a project
    createProjectBtn.addEventListener('click', async () => {
        const projectName = projectNameInput.value;
        if (!projectName) {
            return displayMessage('Please enter a project name.');
        }

        try {
            const response = await fetch('/api/projects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: projectName }),
            });

            const data = await response.json();
            displayMessage(data.message);
        } catch (error) {
            displayMessage('Error creating project: ' + error.message);
        }
    });

    // Function to list all projects
    listProjectsBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            outputDiv.innerHTML = '<h3>Projects:</h3>';
            data.projects.forEach(project => {
                outputDiv.innerHTML += `<p>${project.name}</p>`;
            });
        } catch (error) {
            displayMessage('Error listing projects: ' + error.message);
        }
    });

    // Function to delete a project
    deleteProjectBtn.addEventListener('click', async () => {
        const projectName = projectNameInput.value;
        if (!projectName) {
            return displayMessage('Please enter a project name to delete.');
        }

        try {
            const response = await fetch('/api/projects/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: projectName }),
            });

            const data = await response.json();
            displayMessage(data.message);
        } catch (error) {
            displayMessage('Error deleting project: ' + error.message);
        }
    });

    // Function to create a file
    createFileBtn.addEventListener('click', async () => {
        const fileName = fileNameInput.value;
        const projectName = projectNameInput.value;
        if (!fileName || !projectName) {
            return displayMessage('Please enter both project name and file name.');
        }

        try {
            const response = await fetch('/api/files/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: fileName, project: projectName }),
            });

            const data = await response.json();
            displayMessage(data.message);
        } catch (error) {
            displayMessage('Error creating file: ' + error.message);
        }
    });

    // Function to delete a file
    deleteFileBtn.addEventListener('click', async () => {
        const fileName = fileNameInput.value;
        const projectName = projectNameInput.value;
        if (!fileName || !projectName) {
            return displayMessage('Please enter both project name and file name to delete.');
        }

        try {
            const response = await fetch('/api/files/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: fileName, project: projectName }),
            });

            const data = await response.json();
            displayMessage(data.message);
        } catch (error) {
            displayMessage('Error deleting file: ' + error.message);
        }
    });

    // Function to rename a file
    renameFileBtn.addEventListener('click', async () => {
        const fileName = fileNameInput.value;
        const projectName = projectNameInput.value;
        const newFileName = prompt('Enter new file name:');
        if (!fileName || !projectName || !newFileName) {
            return displayMessage('Please enter the project name, old file name, and new file name.');
        }

        try {
            const response = await fetch('/api/files/rename', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldName: fileName, newName: newFileName, project: projectName }),
            });

            const data = await response.json();
            displayMessage(data.message);
        } catch (error) {
            displayMessage('Error renaming file: ' + error.message);
        }
    });

    // Function to list all files in a project
    listFilesBtn.addEventListener('click', async () => {
        const projectName = projectNameInput.value;
        if (!projectName) {
            return displayMessage('Please enter a project name.');
        }

        try {
            const response = await fetch(`/api/projects/${projectName}/files`);
            const data = await response.json();
            outputDiv.innerHTML = '<h3>Files:</h3>';
            data.files.forEach(file => {
                outputDiv.innerHTML += `<p>${file.name}</p>`;
            });
        } catch (error) {
            displayMessage('Error listing files: ' + error.message);
        }
    });
});
