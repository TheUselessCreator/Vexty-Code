import React from 'react';

const FileTree = ({ files, onSelectFile, onCreateFile, onDeleteFile }) => {
    return (
        <div className="file-tree">
            <h2>File Tree</h2>
            <button onClick={onCreateFile}>Create File</button>
            <ul>
                {files.map((file) => (
                    <li key={file.name} onClick={() => onSelectFile(file)}>
                        {file.name}
                        <button onClick={() => onDeleteFile(file.name)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileTree;
