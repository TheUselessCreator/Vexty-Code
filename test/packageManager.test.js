const packageManager = require('../compiler/packageManager');

describe('Package Manager Tests', () => {
    test('Install a package', () => {
        const result = packageManager.install('mathUtils');
        expect(result).toEqual('mathUtils package installed successfully.');
    });

    test('Import a package', () => {
        packageManager.install('mathUtils');
        const mathUtils = packageManager.import('mathUtils');
        expect(mathUtils).toHaveProperty('sqrt');
        expect(mathUtils).toHaveProperty('square');
    });

    test('Uninstall a package', () => {
        packageManager.install('mathUtils');
        const result = packageManager.uninstall('mathUtils');
        expect(result).toEqual('mathUtils package uninstalled successfully.');
    });
});
