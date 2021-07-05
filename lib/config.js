
const fse = require('fs-extra')

const path = require('path')

const jsonConfig = {
  "name": 'yj',
  "mirror": "https://zpfz.vercel.app/download/files/frontend/tpl/js-plugin-cli/"
}

const configPath = path.resolve(__dirname, "../config.json")

async function defConfig() {
  try {
    await fse.outputJson(configPath, jsonConfig);
    console.log('finished template')
  } catch (e) {
    console.error(e);
    process.exit()
  }
}

module.exports = defConfig
