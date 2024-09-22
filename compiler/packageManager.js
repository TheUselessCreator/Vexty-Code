const https = require('https');
const fs = require('fs');
const path = require('path');

// Function to install a package
function installPackage(packageName) {
    const url = `http://localhost:8080/packages/${packageName}.vxty`; // Use HTTP for local testing
    const filePath = `./packages/${packageName}.vxty`;

    // Check if the package is already installed
    if (fs.existsSync(filePath)) {
        console.log(`${packageName} is already installed.`);
        return;
    }

    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            console.log(`${packageName} installed successfully.`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading package: ${err.message}`);
    });
}

// Function to list all installed packages
function listInstalledPackages() {
    const packagesDir = './packages/';

    // Check if the packages directory exists
    if (!fs.existsSync(packagesDir)) {
        console.log('No packages installed.');
        return;
    }

    // Read the directory and list all the .vxty files
    fs.readdir(packagesDir, (err, files) => {
        if (err) {
            console.error(`Error reading packages directory: ${err.message}`);
            return;
        }

        const vxtyPackages = files.filter(file => path.extname(file) === '.vxty');
        
        if (vxtyPackages.length === 0) {
            console.log('No packages installed.');
        } else {
            console.log('Installed packages:');
            vxtyPackages.forEach(file => {
                console.log(`- ${path.basename(file, '.vxty')}`);
            });
        }
    });
}

// Command Handler to install or list packages
function handleCommand(command, packageName) {
    if (command === 'Vgetpackages') {
        listInstalledPackages();
    } else if (command === 'V install' && packageName) {
        installPackage(packageName);
    } else {
        console.log('Invalid command. Use "Vgetpackages" to list or "V install [packageName]" to install a package.');
    }
}

// Example usage (can be replaced with real input handling):
const inputCommand = process.argv[2]; // Example: 'V install'
const packageName = process.argv[3];  // Example: 'mypackage'

// Command handling
handleCommand(inputCommand, packageName);

module.exports = {
    installPackage,
    listInstalledPackages,
    handleCommand
};
