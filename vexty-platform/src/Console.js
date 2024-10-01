import React, { useState } from 'react';

const Console = ({ onRunCommand }) => {
    const [command, setCommand] = useState('');

    const handleInputChange = (e) => {
        setCommand(e.target.value);
    };

    const handleRunCommand = () => {
        onRunCommand(command);
        setCommand('');
    };

    return (
        <div className="console">
            <h2>Console</h2>
            <div id="output"></div>
            <input
                type="text"
                value={command}
                onChange={handleInputChange}
                placeholder="Enter command here..."
            />
            <button onClick={handleRunCommand}>Run</button>
        </div>
    );
};

export default Console;
