const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 1. REMOVE any line adding 'wasm' to sourceExts if it's still there

// 2. ADD 'wasm' to assetExts so Metro treats it as a binary asset file
config.resolver.assetExts.push('wasm');

module.exports = config;