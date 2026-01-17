import { Command } from "commander";
import fs from 'node:fs'
import { config } from "../config.js"

console.debug("Summary command loaded...")

const data = JSON.parse(fs.readFileSync(config.dataFile, 'utf8'))

export const summaryCommand = new Command("summary")
    .description("Summary expenses")
    .option("-m --month <number>", "Get summary by month")
    .action((options) => getExpensesSum(options))


const getExpensesSum = options => {

    if (options.month === undefined) {
        const total = data.reduce((acc, expense) => acc + expense.amount, 0)
        console.log(`Total expenses: $${total}`)
        return
    } else {
        const total = data.reduce((acc, expense) => {
            const [, month, ] = expense.date.split("/").map(Number)
            if (month === +options.month) return acc + expense.amount
            return acc
        }, 0)
        console.log(`Total expenses for ${getMonthName(options.month)}: $${total}`)
    }
}

const getMonthName = monthNumber => {
    const year = new Date().getFullYear()
    return new Date(year, monthNumber - 1).toLocaleString("en-US", { month: "long" })
}
