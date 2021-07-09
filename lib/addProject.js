
const download = require('download-git-repo')
const inquirer = require('inquirer')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const fse = require('fs-extra')
async function addProject(project_name) {
  const dir = process.cwd();
  const packagedir = path.join(dir, 'packages');
  const pkg_project_name = path.join(packagedir, project_name);
  if (await fse.pathExists(pkg_project_name)) {
    const {exist_path} = await inquirer.prompt([
      {
        name: 'exist_path',
        type: 'list',
        message: '当前文件夹已存在，是否覆盖?',
        choices: ['是', '否']
      }
    ])
    if (exist_path === '否') {
      process.exit()
    } else {
      try {
        await fse.remove(pkg_project_name)
      } catch (e) {
        console.error(e)
        process.exit()
      }
    }
  }
  
  inquirer.prompt([
    {
      name: 'name',
      type: 'list',
      message: '选择一种模板框架...',
      choices: ['Vue', 'React']      
    }
  ]).then(async (answer) => {
    const {name} = answer;
    let frame_name = name.toLocaleLowerCase();
    frame_name = 'lerna';
    let existpkg = await fse.pathExists(packagedir);
    if (!existpkg) {
      await fse.mkdir('packages')
    }
    const spinner = ora(chalk.cyan('下载模板中...'))
    spinner.start()
    download('blucel/'+frame_name, pkg_project_name, function(err) {
      if (err) {
        spinner.text = chalk.red(err);
        process.exit()
      }
      spinner.text = 'Download template successful.';
      spinner.succeed()
    })
  })
}

module.exports = addProject
