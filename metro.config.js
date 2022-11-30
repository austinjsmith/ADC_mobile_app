// const { getDefaultConfig } = require('@expo/metro-config');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// module.exports = (async () => {
//     const {
//       resolver: { sourceExts, assetExts }
//     } = await getDefaultConfig(__dirname)
//     return {
//       plugins: [
//         new NodePolyfillPlugin()
//       ],
//       transformer: {
//         defaultConfig: async () => ({
//           transform: {
//             experimentalImportSupport: false,
//             inlineRequires: false
//           }
//         })
//       },
//       resolver: {
//         sourceExts: ['jsx', 'js', 'ts', 'tsx'],
//         assetExts: [...assetExts, 'fcscript',  'cjs']
//       },
      
//     }

//   })()
const {getDefaultConfig} = require('expo/metro-config');

module.exports = (async () => {
    const config = await getDefaultConfig(__dirname);

    const {transformer, resolver} = config;

    config.transformer = {
        ...transformer,
    };
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...resolver.sourceExts, 'svg'],
    };

    return config;
})();