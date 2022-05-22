const plugins = {
  'postcss-import': {},
  'autoprefixer': {},
  'postcss-nested': {}
}

if (process.env.NODE_ENV === 'production') {
  plugins['tailwindcss'] = {}
}

module.exports = {
  plugins
}