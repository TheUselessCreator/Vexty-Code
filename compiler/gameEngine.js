const fs = require('fs');
const EventEmitter = require('events');

// Custom Error Class for detailed error reporting
class CustomError extends Error {
    constructor(type, message, token, codeSnippet, position) {
        super(message);
        this.name = this.constructor.name;
        this.type = type;
        this.token = token;
        this.codeSnippet = codeSnippet;
        this.position = position;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }

    getErrorDetails() {
        return `
Error Type: ${this.type}
Message: ${this.message}
Token: ${JSON.stringify(this.token)}
Position: Line ${this.position.line}, Column ${this.position.column}
Code Snippet: ${this.codeSnippet}
Timestamp: ${this.timestamp}
Stack Trace: ${this.stack}
`;
    }
}

// Function to log errors to a file
function logErrorToFile(error) {
    const logData = error.getErrorDetails();
    fs.appendFileSync('error.log', logData + '\n', 'utf8');
}

// Function to throw a detailed error
function throwError(type, message, token, code, position = { line: 0, column: 0 }) {
    const codeSnippet = code.split('\n')[position.line] || '';
    const error = new CustomError(type, message, token, codeSnippet, position);
    logErrorToFile(error);
    throw error;
}

// Game Engine Components
class GameEngine extends EventEmitter {
    constructor() {
        super();
        this.modules = {};
        this.isRunning = false;
        this.loopInterval = null;
        this.deltaTime = 0;
        this.lastFrameTime = 0;
        this.fps = 60;
        this.performanceMetrics = {
            frames: 0,
            startTime: Date.now(),
            elapsedTime: 0,
        };
        this.assets = {}; // Dynamic asset storage
    }

    async initialize() {
        try {
            await Promise.all([
                this.loadModule('renderer'),
                this.loadModule('physics'),
                this.loadModule('audio'),
                this.loadModule('networking'),
                this.loadModule('input')
            ]);
            this.isRunning = true;
            this.emit('initialized', this);
            console.log('Game engine initialized successfully.');
        } catch (error) {
            throwError('InitializationError', 'Failed to initialize the game engine', null, '', { line: 0, column: 0 });
        }
    }

    async loadModule(moduleName) {
        console.log(`Loading ${moduleName} module...`);
        return new Promise((resolve) => {
            setTimeout(() => {
                this.modules[moduleName] = {}; // Placeholder for module
                console.log(`${moduleName} module loaded.`);
                resolve();
            }, 1000);
        });
    }

    run() {
        if (!this.isRunning) {
            throw new Error('Engine is not initialized. Please initialize the engine first.');
        }
        console.log('Starting game loop...');
        this.loopInterval = setInterval(this.gameLoop.bind(this), 1000 / this.fps);
        this.emit('run', this);
    }

    gameLoop() {
        const currentTime = Date.now();
        this.deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;

        for (const moduleName in this.modules) {
            if (this.modules[moduleName].update) {
                this.modules[moduleName].update(this.deltaTime);
            }
        }

        this.render();
        this.performanceMetrics.frames++;
        this.performanceMetrics.elapsedTime = (Date.now() - this.performanceMetrics.startTime) / 1000;
        if (this.performanceMetrics.elapsedTime >= 1) {
            console.log(`FPS: ${this.performanceMetrics.frames}`);
            this.performanceMetrics.frames = 0;
            this.performanceMetrics.startTime = Date.now();
        }
    }

    render() {
        console.log('Rendering frame...');
        // Rendering logic here
    }

    stop() {
        clearInterval(this.loopInterval);
        this.isRunning = false;
        console.log('Game loop stopped.');
    }

    async unloadModule(moduleName) {
        console.log(`Unloading ${moduleName} module...`);
        delete this.modules[moduleName];
        console.log(`${moduleName} module unloaded.`);
    }

    handleError(error) {
        console.error('An error occurred:', error);
    }

    addAsset(assetName, assetData) {
        this.assets[assetName] = assetData;
        console.log(`Asset ${assetName} added.`);
    }

    loadAssets(assets) {
        console.log('Loading user-defined assets...');
        assets.forEach(asset => {
            if (!this.assets[asset]) {
                console.warn(`Asset ${asset} not found. Please add it before loading.`);
            } else {
                console.log(`Loading asset: ${asset}`);
                // Simulate asset loading
            }
        });
        console.log('User-defined assets loaded successfully.');
    }

    saveGameState(state) {
        fs.writeFileSync('savegame.json', JSON.stringify(state), 'utf8');
        console.log('Game state saved.');
    }

    loadGameState() {
        if (fs.existsSync('savegame.json')) {
            const state = JSON.parse(fs.readFileSync('savegame.json', 'utf8'));
            console.log('Game state loaded:', state);
            return state;
        }
        console.log('No saved game state found.');
        return null;
    }

    onUserInput(input) {
        console.log(`User input received: ${input}`);
        // Handle user input logic here
    }
}

// Example Usage
(async () => {
    const engine = new GameEngine();
    engine.on('initialized', () => {
        engine.run();
    });

    engine.on('run', () => {
        console.log('Game is running...');
    });

    try {
        await engine.initialize();
        // User can add assets dynamically
        engine.addAsset('player', { type: 'image', src: 'player.png' });
        engine.addAsset('enemy', { type: 'image', src: 'enemy.png' });
        engine.addAsset('background', { type: 'image', src: 'background.jpg' });

        // Now load assets based on user-defined additions
        engine.loadAssets(['player', 'enemy', 'background']);
        engine.saveGameState({ level: 1, score: 100 });
        engine.loadGameState();
        engine.onUserInput('move forward');
    } catch (error) {
        engine.handleError(error);
    }

    // Simulate stopping the engine after some time
    setTimeout(() => {
        engine.stop();
    }, 10000);
})();

module.exports = { throwError, GameEngine };
