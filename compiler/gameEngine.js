// compiler/gameEngine.js

class GameEngine {
    constructor() {
        this.scenes = [];
        this.currentScene = null;
        this.deltaTime = 0;
        this.lastTime = 0;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.loop();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addScene(scene) {
        this.scenes.push(scene);
    }

    switchScene(sceneName) {
        const scene = this.scenes.find(s => s.name === sceneName);
        if (scene) {
            this.currentScene = scene;
            this.currentScene.init(this.context);
        }
    }

    loop() {
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    update(timestamp) {
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        if (this.currentScene) {
            this.currentScene.update(this.deltaTime);
            this.currentScene.render(this.context);
        }

        this.loop();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(event) {
        if (this.currentScene && this.currentScene.handleInput) {
            this.currentScene.handleInput(event, true);
        }
    }

    handleKeyUp(event) {
        if (this.currentScene && this.currentScene.handleInput) {
            this.currentScene.handleInput(event, false);
        }
    }
}

class Scene {
    constructor(name) {
        this.name = name;
        this.entities = [];
    }

    init(context) {
        // Initialize the scene
    }

    update(deltaTime) {
        this.entities.forEach(entity => entity.update(deltaTime));
    }

    render(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        this.entities.forEach(entity => entity.render(context));
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    handleInput(event, isKeyDown) {
        // Handle user input for the scene
    }
}

class Entity {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.isGrounded = false;
    }

    update(deltaTime) {
        this.y += this.velocityY;
        this.x += this.velocityX;
        
        // Apply gravity
        if (!this.isGrounded) {
            this.velocityY += this.gravity;
        }

        // Simple ground collision
        if (this.y + this.height > window.innerHeight) {
            this.y = window.innerHeight - this.height;
            this.isGrounded = true;
            this.velocityY = 0;
        } else {
            this.isGrounded = false;
        }
    }

    render(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    jump() {
        if (this.isGrounded) {
            this.velocityY = -10; // Jump height
            this.isGrounded = false;
        }
    }

    move(direction) {
        this.velocityX = direction * 5; // Movement speed
    }
}

// Export the GameEngine and Scene classes
module.exports = { GameEngine, Scene, Entity };
