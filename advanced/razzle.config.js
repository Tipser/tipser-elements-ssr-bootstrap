'use strict';

module.exports = {
    modify(config, {target, dev}, webpack) {
        const appConfig = config; // stay immutable here

        appConfig.resolve.symlinks = false;
        appConfig.devtool = 'inline-source-map';
        if (target === 'node') {
            // Naive way to find the index of this plugin. There is problably a better way
            const index = config.plugins.length - 3;
            const startServerPlugin = config.plugins[index];
            startServerPlugin.options.nodeArgs = [
                '--preserve-symlinks', // This is key to fix the module resolution
                ...startServerPlugin.options.nodeArgs,
            ];
        }
        return {...appConfig};
    },
};
