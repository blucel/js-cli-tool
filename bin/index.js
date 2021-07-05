#!/usr/bin/env node
const program = require('commander')

const update = require('../lib/update')

const setMirro = require('../lib/mirro')

const defConfig = require('../lib/config')

const download = require('../lib/download')

const init = require('../lib/init')

program.version(require('../package.json').version, '-v, --version')

program.command('update').description('project version update').action(() => {update()})

program.command('initmirror').description('init mirror').action(() => defConfig())

program.command('mirror <set_mirror>').description('Set template mirror').action((tmp) => {setMirro(tmp)})

program.command('download').description('download template').action(() => download())

program.command('init <set_project_name>').description('init project').action(name => init(name));
program.command('create <set_project_name>').description('init project').action(name => init(name));

program.parse(process.argv)
