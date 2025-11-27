// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configure resolver to handle Node.js polyfills for React Native
config.resolver = {
  ...config.resolver,
  // Prefer browser field over main (for packages like jose)
  resolverMainFields: ['browser', 'react-native', 'main'],
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    crypto: require.resolve('react-native-crypto'),
    stream: require.resolve('readable-stream'),
    buffer: require.resolve('buffer'),
    util: require.resolve('util'),
    zlib: path.resolve(__dirname, 'polyfills/zlib.js'),
    http: path.resolve(__dirname, 'polyfills/http.js'),
    https: path.resolve(__dirname, 'polyfills/https.js'),
    events: require.resolve('events'),
  },
  // Force jose to use browser build (works in React Native, no Node.js deps)
  resolveRequest: (context, moduleName, platform) => {
    // Handle jose package and all its subpaths
    if (moduleName === 'jose' || moduleName.startsWith('jose/')) {
      try {
        const josePackagePath = require.resolve('jose/package.json');
        const joseDir = path.dirname(josePackagePath);
        const fs = require('fs');
        
        // Use browser build (works in React Native, doesn't need Node.js modules)
        const browserPath = path.join(joseDir, 'dist', 'browser', 'index.js');
        if (fs.existsSync(browserPath)) {
          return {
            filePath: browserPath,
            type: 'sourceFile',
          };
        }
      } catch (e) {
        // Fallback to default
      }
    }
    
    // Default resolution
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;

