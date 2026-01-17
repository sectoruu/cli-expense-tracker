#!/usr/bin/env node

import { Command } from 'commander'
import { checkFileExistence } from './utils/checkFileExistence.js'
import { config } from './config.js'
import { addCommand } from './commands/add.js'
import { deleteCommand } from './commands/delete.js'
import { summaryCommand } from './commands/summary.js'
import { listCommand } from './commands/list.js'

checkFileExistence(config.dataFile)

const program = new Command()

program
    .name("expense-tracker")
    .description("CLI app to track expenses")
    .version("1.0.0")

program.addCommand(addCommand)
program.addCommand(deleteCommand)
program.addCommand(summaryCommand)
program.addCommand(listCommand)

program.parse()


