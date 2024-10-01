import React from 'react';

const Editor = ({ content, onChange }) => {
    return (
        <div className="editor">
            <h2>Editor</h2>
            <textarea
                value={content}
                onChange={onChange}
                placeholder="Write your code here..."
            />
        </div>
    );
};

export default Editor;
