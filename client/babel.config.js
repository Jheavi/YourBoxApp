module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-flow',
      'module:metro-react-native-babel-preset'
    ],
    plugins: ['@babel/plugin-syntax-flow']
  }
}
