import fs from 'node:fs'

export const checkFileExistence = filePath => {

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]")
        console.debug("expenses.json created successfully...")
    }
}