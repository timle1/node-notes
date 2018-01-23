const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions,
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help().command('read', 'Read a note', {
        title: titleOptions,
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv
var command = argv._[0];

switch (command) {
    case 'add':
        let note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log('Note created');
            notes.logNote(note)
        } else {
            console.log('Note title taken');
        }
        break;
    case 'list':
        let allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach(note => notes.logNote(note));
        break;
    case 'read':
        let note2 = notes.getNote(argv.title);
        if (note2) {
            console.log('Note found');
            notes.logNote(note2);
        } else {
            console.log('Note not found');
        }
        break;
    case 'remove':
        let noteRemoved = notes.removeNote(argv.title);
        let message = noteRemoved ? 'Note was removed' : 'Note not found';
        console.log(message);
        break;
    default:
        console.log('Command not recognized');
}

