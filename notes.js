const fs = require("fs")
const chalk = require("chalk")

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green("New note has been added !"))
    } else
        console.log(chalk.red("Title has been taken already !"))
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)

    fs.writeFileSync('notes.json', dataJSON)
}

const JSONtoObj = () => {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
}
const loadNotes = () => {
    try {
        return JSONtoObj()
    } catch (e) {

        return []
    }
}

const removeNote = (title) => {
    try {
        const notes = JSONtoObj()

        var i = 0
        const len = notes.length
        for (i = 0; i < len; i++) {
            if (notes[i].title === title) {
                notes.splice(i, 1)
                break
            }
        }

        if (i == len)
            console.log(chalk.red("Note with given title is not available !"))
        else {
            saveNotes(notes)
            console.log(chalk.green("Note with title *" + title + "* has been removed !"))
        }

    } catch {
        console.log(chalk.red("File is not available !"))
    }
}

const listNotes = () => {
    try {
        const notes = JSONtoObj()

        var i
        if (notes.length > 0) {
            console.log(chalk.blue("Your Titles : "))
            for (i = 0; i < notes.length; i++) {
                console.log((i + 1) + ". Title : " + notes[i].title)
            }
        } else
            console.log(chalk.bgRed("File is empty !"))

    } catch {
        console.log(chalk.red.inverse("File is not available !"))
    }
}

const readNote = (title) => {
    try {
        const notes = JSONtoObj()

        const note = notes.find((note) => note.title === title)
        if (note === undefined)
            console.log(chalk.bgRed.inverse("Note with title *" + title + "* is not found !"))
        else
            console.log(chalk.italic.inverse(note.title) + " : " + note.body)
    } catch (e) {
        console.log(chalk.bgRed.italic("File is not found !"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}