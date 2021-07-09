
const download = require('download-git-repo');

const ora = require('ora')

const chalk = require('chalk')

const fse = require('fs-extra')

const path = require('path')

const defConfig = require('./config')

// const cfgPath = path.resolve(__dirname, '../config.json')

const inquirer = require('inquirer');

// async function dlTemplate () {
//   // const exists = await fse.pathExists(cfgPath);
//   if (exists) {
//     await dlAction()
//   } else {
//     await defConfig()
//     await dlAction()
//   }
// }

async function dlTemplate () {
  const dir = path.resolve(process.cwd(), './package.json')
  async function exist () {
    const hasexist = await fse.pathExists(dir);
    if (hasexist) {
      console.log('当前项目存在')
      process.exit()
      // return inquirer.prompt([
      //   {
      //     name: 'name',
      //     type: 'list',
      //     message: '当前文件夹已存在，是否覆盖',
      //     choices: ['是', '否']
      //   }
      // ])
    } else {
      // return {}
    }
  }

  await exist()
  // if (name === '否') {
  //   return;
  // } else {
  //   try {
  //     await fse.remove(dir)
  //   } catch (e) {
  //     console.error(e)
  //     process.exit()
  //   }
  // }
  const dlSpinner = ora(chalk.cyan('downloading template'))
  dlSpinner.start()
  await download('blucel/lerna', process.cwd(), function (err) {
    if (err) {
      dlSpinner.text = chalk.red(`Download template failed. ${err}`)
      dlSpinner.fail()
      process.exit()
    }
    dlSpinner.text = 'Download template successful.'
    dlSpinner.succeed()
  })
}

module.exports = dlTemplate
