const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Configura as dimenções do navegador 
  viewportHeight: 880, 
  viewportWidth: 1280,
  // Indica o tipo de projeto
  e2e: {},
})
