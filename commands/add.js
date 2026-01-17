import { Command } from "commander"
import fs from 'node:fs'
import { config } from "../config.js"

console.debug("Add command loaded...")

const data = JSON.parse(fs.readFileSync(config.dataFile, 'utf8'))

export const addCommand = new Command("add")
    .description("Add new expense")
    .requiredOption("-d, --description <string>", "expense description")
    .requiredOption("-a, --amount <number>", "expense amount", Number)
    .action(options => pushExpense(options))


const pushExpense = options => {

    const expense = {
        id: data.length + 1,
        description: options.description,
        amount: options.amount,
        date: new Date().toLocaleDateString()
    }

    data.push(expense)
    fs.writeFileSync(config.dataFile, JSON.stringify(data, null, 2))
    console.log(`Expense added successfully (ID: ${expense.id})`)
}