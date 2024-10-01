import React, { useState } from 'react';
import Console from './components/Console';
import Editor from './components/Editor';
import FileTree from './components/FileTree';
import ProjectManager from './components/ProjectManager';
import './App.css';

const App = () => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [files, setFiles] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([]);

    const handleRunCommand = (command) => {
        // Execute the command and update console output
        console.log('Running command:', command);
        const output = `Executed: ${command}`;
        setConsoleOutput((prevOutput) => [...prevOutput, output]);
        
        // Here you can add logic to handle specific commands
        // For example, to create a file, delete a file, etc.
    };

    const handleCreateProject = (name) => {
        const newProject = { name };
        setProjects((prevProjects) => [...prevProjects, newProject]);
        setCurrentProject(newProject);
        setFiles([]); // Reset files for the new project
        setEditorContent('');
    };

    const handleDeleteProject = (name) => {
        const updatedProjects = projects.filter((project) => project.name !== name);
        setProjects(updatedProjects);
        
        // If the current project is deleted, reset the current project
        if (currentProject && currentProject.name === name) {
            setCurrentProject(null);
            setFiles([]);
            setEditorContent('');
        }
    };

    const handleSelectFile = (file) => {
        // Load file content into editor (mock loading here)
        const fileContent = `Content of ${file.name}`; // Replace with actual file loading logic
        setEditorContent(fileContent);
    };

    const handleCreateFile = () => {
        const fileName = prompt('Enter file name:');
        if (fileName) {
            const newFile = { name: fileName };
            setFiles((prevFiles) => [...prevFiles, newFile]);
        }
    };

    const handleDeleteFile = (fileName) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
        if (editorContent.includes(fileName)) {
            setEditorContent(''); // Clear editor if the current file is deleted
        }
    };

    return (
        <div className="app">
            <h1>Vexy IDE</h1>
            <ProjectManager
                projects={projects}
                onCreateProject={handleCreateProject}
                onDeleteProject={handleDeleteProject}
            />
            {currentProject && (
                <>
                    <FileTree
                        files={files}
                        onSelectFile={handleSelectFile}
                        onCreateFile={handleCreateFile}
                        onDeleteFile={handleDeleteFile}
                    />
                    <Editor content={editorContent} onChange={(e) => setEditorContent(e.target.value)} />
                </>
            )}
            <Console onRunCommand={handleRunCommand} />
            <div className="console-output">
                <h2>Console Output</h2>
                <pre>{consoleOutput.join('\n')}</pre>
            </div>
        </div>
    );
};

export default App;
