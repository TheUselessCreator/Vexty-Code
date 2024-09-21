// compiler/index.js

const fs = require('fs').promises; // Use promises for file operations
const lexer = require('./lexer');
const parser = require('./parser');
const interpreter = require('./interpreter');
const getSuggestions = require('./suggestions');
const { GameEngine, Scene, Entity } = require('./gameEngine');

// Compile the source code
async function compile(source) {
    try {
        const tokens = lexer.tokenize(source);
        const ast = parser.parse(tokens);
        const output = interpreter.interpret(ast);
        return output;
    } catch (error) {
        handleError(error);
    }
}

// Compile a file and return its output
async function compileFile(filePath) {
    try {
        const source = await fs.readFile(filePath, 'utf8');
        return await compile(source);
    } catch (error) {
        console.error('File Read Error:', error.message);
        throw error;
    }
}

// Install a package and compile its main file
async function installAndCompile(packageName) {
    const packageManager = require('./packageManager');
    
    try {
        await packageManager.installPackage(packageName);
        const packagePath = `./packages/${packageName}.vxty`;
        return await compileFile(packagePath);
    } catch (error) {
        console.error('Package Installation Error:', error.message);
        throw error;
    }
}

// Handle errors with suggestions
function handleError(error) {
    console.error('Compilation Error:', error.message);
    const { severity, messages, actions } = getSuggestions(error);
    console.log(`Severity: ${severity}`);
    
    console.log('Suggestions:');
    messages.forEach(message => console.log(`- ${message}`));
    
    if (actions.length > 0) {
        console.log('Recommended Actions:');
        actions.forEach(action => console.log(`- ${action}`));
    }
}

// Setup a simple game example
async function setupGameExample() {
    const engine = new GameEngine();
    const mainScene = new Scene('Main');

    // Create a player entity
    const player = new Entity(100, 100, 50, 50, 'blue');
    mainScene.addEntity(player);

    // Initialize the scene
    mainScene.init = () => {
        console.log('Main scene initialized');
    };

    // Update the scene
    mainScene.update = (deltaTime) => {
        // Handle player input
        if (keys['ArrowRight']) player.move(1);
        else if (keys['ArrowLeft']) player.move(-1);
        else player.move(0);
        
        if (keys['Space']) player.jump();
    };

    // Render the scene
    mainScene.render = (context) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = 'lightgreen';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        player.render(context);
    };

    // Input handling
    let keys = {};
    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);

    // Add the main scene and start the game
    engine.addScene(mainScene);
    engine.switchScene('Main');
    engine.init(); // Start the game loop
}

// Run the example if the script is executed directly
if (require.main === module) {
    setupGameExample().catch(error => console.error('Error in game setup:', error.message));
}

module.exports = {
    compile,
    compileFile,
    installAndCompile,
    setupGameExample,
    handleError
};
