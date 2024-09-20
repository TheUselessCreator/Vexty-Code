// packageManager.js
const https = require('https');
const fs = require('fs');

function installPackage(packageName) {
    const url = `http://localhost:8080/packages/${packageName}.vxty`; // Use HTTP for local testing
    const file = fs.createWriteStream(`./packages/${packageName}.vxty`);

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            console.log(`${packageName} installed successfully`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading package: ${err.message}`);
    });
}

module.exports = installPackage;
