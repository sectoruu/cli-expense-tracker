import path from "node:path"

export const config = {
    dataFile: path.join(import.meta.dirname, "data", "expenses.json")
}