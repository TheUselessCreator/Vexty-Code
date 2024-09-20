// packageManager.js
const https = require('https');
const fs = require('fs');

function installPackage(packageName) {
    const url = `https://example.com/packages/${packageName}.vxty`;
    const file = fs.createWriteStream(`./packages/${packageName}.vxty`);

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            console.log(`${packageName} installed successfully`);
        });
    });
}

module.exports = installPackage;
