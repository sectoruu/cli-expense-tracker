import { Command } from "commander";
import fs from 'node:fs'
import { config } from "../config.js";

console.debug("Delete command loaded...")

let data = JSON.parse(fs.readFileSync(config.dataFile, 'utf8'))

export const deleteCommand = new Command("delete")
    .description("Delete expense")
    .requiredOption("--id <number>", "expense ID")
    .action(options => spliceExpense(options))

const spliceExpense = options => {

    const expenseIndex = data.indexOf(data.find(expense => expense.id === +options.id)) 

    if (expenseIndex === -1) {
        console.log(`Expense (ID: ${+options.id}) not found`)
        return
    }

    data.splice(expenseIndex, 1)
    data = data.map(expense => {
        if (expense.id > +options.id) {
            expense.id = expense.id - 1
        }
        return expense
    })

    fs.writeFileSync(config.dataFile, JSON.stringify(data, null, 2))
    console.log("Expense deleted successfully")

}