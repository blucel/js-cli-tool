
const fse = require('fs-extra')

const ora = require('ora')

const chalk = require('chalk')

const inquirer = require('inquirer')

const handlebars = require('handlebars')

const symbols = require('log-symbols')

const path = require('path')

const dlTemplate = require('./download.js')

async function initProject(projectName) {
  try {
    const exists = await fse.pathExists(projectName)
    if (exists) {
      console.log(symbols.error, chalk.red('the project already exist'))
    } else {
      inquirer.prompt([
        {
          name: 'name',
          type: 'input',
          message: 'set global name for plugin',
          default: 'demo'
        }
      ]).then(async res => {
        const spinner = ora(chalk.cyan('Initializing project...'))
        spinner.start()
        const templatPath = path.resolve(__dirname, '../template/')
        const processPath = process.cwd()
        const lcProjectName = projectName.toLowerCase()
        const targetPath = `${processPath}/${lcProjectName}`
        const exists = await fse.pathExists(templatPath)
        if (!exists) {
          await dlTemplate();
        }

        try{
          await fse.copy(templatPath, targetPath)
        } catch(e) {
          console.log(symbols.error, chalk.red(`project copy fail:${e}`))
          process.exit()
        }
        // 把要替换的模板字符准备好
        const multiMeta = {
          project_name: lcProjectName,
          global_name: res.name
        }
        // 把要替换的文件准备好
        const multiFiles = [
          `${targetPath}/package.json`,
          `${targetPath}/gulpfile.js`,
          `${targetPath}/test/index.html`,
          `${targetPath}/src/index.js`
        ]

        multiFiles.forEach(async (item) => {
          try {
            const multiFilesContent = await fse.readFile(item, 'utf-8')
            const multiFilesResult = handlebars.compile(multiFilesContent)(multiMeta)
            await fse.outputFile(item, multiFilesResult)
          } catch(e) {
            spinner.text = chalk.red(`Initialize project failed. ${err}`)
            spinner.fail()
            process.exit()
          }
        })
        // 如果成功，Spinner 就改变文字信息
        spinner.text = 'Initialize project successful.'
        // 终止等待动画并显示 ✔ 标志
        spinner.succeed();
        console.log(`Get started with the following commands:
${symbols.warning} ${chalk.cyan(`cd ${lcProjectName}`)}
${symbols.warning} ${chalk.cyan('yarn install')}
${symbols.warning} ${chalk.cyan('npm run dev')}
`)
      }).catch((error) => {
        if (error.isTtyError) {
          console.log(symbols.error, chalk.red("Prompt couldn't be rendered in the current environment."))
        } else {
          console.log(symbols.error, chalk.red(error))
        }
        process.exit()
      })
    }
  } catch(e) {
    console.error(e)
    process.exit()
  }
}

module.exports = initProject
