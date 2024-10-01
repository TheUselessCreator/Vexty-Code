import React, { useState } from 'react';

const ProjectManager = ({ projects, onCreateProject, onDeleteProject }) => {
    const [projectName, setProjectName] = useState('');

    return (
        <div className="project-manager">
            <h2>Project Manager</h2>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
            />
            <button onClick={() => { onCreateProject(projectName); setProjectName(''); }}>
                Create Project
            </button>
            <ul>
                {projects.map((project) => (
                    <li key={project.name}>
                        {project.name}
                        <button onClick={() => onDeleteProject(project.name)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectManager;
