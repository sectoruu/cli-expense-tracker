import { Command } from "commander"
import fs from 'node:fs'
import { config } from "../config.js"

console.debug("List command loaded...")

const data = JSON.parse(fs.readFileSync(config.dataFile, 'utf8'))

export const listCommand = new Command("list")
    .description("List all expenses")
    .action(() => listExpenses())


const listExpenses = () => {

    data.forEach(({id, description, amount, date}) => console.log(`(ID: ${id}): ${description} $${amount} (${date})`))

}