const fs = require("fs")
const notes = require("./notes.js")

const yargs = require("yargs")

yargs.version('1.1.0')


yargs.command({ // creting add command
    command: 'add',
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Notes Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Notes Body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//debugger

yargs.command({ // creting remove command
    command: 'remove',
    describe: "Remove a new note",
    builder: {
        title: {
            describe: "Notes Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({ // creting list command
    command: 'list',
    describe: "List a new note",
    handler() {
        notes.listNotes()
    }
})

yargs.command({ // creting read command
    command: 'read',
    describe: "Read a new note",
    builder: {
        title: {
            describe: "Notes Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//console.log(yargs.argv)
yargs.parse()