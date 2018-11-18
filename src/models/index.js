const modelsPath = require("path").join(__dirname)

const models = {}

require('fs').readdirSync(modelsPath).forEach(filename => {
  const modelFileName = filename.split('.')[0]
  if (modelFileName !== 'index') {
    const model = require(`./${modelFileName}`)
    models[model.modelName] = model
  }
})

module.exports = models
