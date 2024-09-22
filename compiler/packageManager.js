const https = require('https');
const fs = require('fs').promises; // Use promises for better async handling
const path = require('path');

// Function to install a package
async function installPackage(packageName) {
    const url = `http://localhost:8080/packages/${packageName}.vxty`; // Use HTTP for local testing
    const filePath = `./packages/${packageName}.vxty`;

    // Check if the package is already installed
    try {
        await fs.access(filePath);
        console.log(`${packageName} is already installed.`);
        return;
    } catch (err) {
        // Package not found, proceed with installation
    }

    const file = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download package: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`${packageName} installed successfully.`);
                resolve();
            });
        }).on('error', (err) => {
            reject(new Error(`Error downloading package: ${err.message}`));
        });
    });
}

// Function to list all installed packages
async function listInstalledPackages() {
    const packagesDir = './packages/';

    // Check if the packages directory exists
    try {
        await fs.access(packagesDir);
    } catch {
        console.log('No packages installed.');
        return;
    }

    // Read the directory and list all the .vxty files
    try {
        const files = await fs.readdir(packagesDir);
        const vxtyPackages = files.filter(file => path.extname(file) === '.vxty');

        if (vxtyPackages.length === 0) {
            console.log('No packages installed.');
        } else {
            console.log('Installed packages:');
            vxtyPackages.forEach(file => {
                console.log(`- ${path.basename(file, '.vxty')}`);
            });
        }
    } catch (err) {
        console.error(`Error reading packages directory: ${err.message}`);
    }
}

// Command Handler to install or list packages
async function handleCommand(command, packageName) {
    if (command === 'Vgetpackages') {
        await listInstalledPackages();
    } else if (command === 'V install' && packageName) {
        await installPackage(packageName);
    } else {
        console.log('Invalid command. Use "Vgetpackages" to list or "V install [packageName]" to install a package.');
    }
}

// Example usage (can be replaced with real input handling):
const inputCommand = process.argv[2]; // Example: 'V install'
const packageName = process.argv[3];  // Example: 'mypackage'

// Command handling
handleCommand(inputCommand, packageName).catch(err => {
    console.error('Command handling error:', err.message);
});

module.exports = {
    installPackage,
    listInstalledPackages,
    handleCommand
};
