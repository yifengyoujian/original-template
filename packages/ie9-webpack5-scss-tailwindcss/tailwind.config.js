// 生成 '1px'到 'npx' 的函数
const transform = (length) => {
  const init = {}
  for (let i = 0; i <= length; i++) {
    init[i] = `${i}px`
  }
  return init
}

const public = transform(1280)
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.html',
  ],
  theme: {
    extend: {
      spacing: public,
      margin: public,
      width: public,
      height: public,
      lineHeight: public,
      fontSize: transform(32),
      borderRadius: transform(200),
    },
  },
  variants: {
    appearance: []
  },
  plugins: [],
  corePlugins: {
    container: false,
    preflight: false,
    animation: false,
  },
  preflight: false,
}
