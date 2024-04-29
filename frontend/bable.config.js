module.exports = {
    presets: [
      ['next/babel', { 'preset-react': { runtime: 'automatic' } }]
    ],
    plugins: [
      ['transform-jsx-namespace-to-react-component', { 'throwIfNamespace': false }]
    ]
  }