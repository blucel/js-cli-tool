#!/usr/bin/env node
const program = require('commander')

const update = require('../lib/update')

const addProject = require('../lib/addProject')

const setMirro = require('../lib/mirro')

const defConfig = require('../lib/config')

const download = require('../lib/download')

// const init = require('../lib/init.copy')
const test = require('../lib/test')

program.version(require('../package.json').version, '-v, --version')

program.command('update').description('project version update').action(() => {update()})

program.command('initmirror').description('init mirror').action(() => defConfig())

program.command('mirror <set_mirror>').description('Set template mirror').action((tmp) => {setMirro(tmp)})

program.command('download').description('download template').action(() => download())

program.command('test').description('asd').action(() => test())

// packages目录下添加项目
program.command('add <package_name').description('add project in packages').action((name) => {
  addProject(name)
})

// program.command('init <set_project_name>').alias('create').description('init project').action(name => init(name));

program.parse(process.argv)
