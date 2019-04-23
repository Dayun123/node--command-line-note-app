// notes will be saved as an array of JSON objects, like so:
// [
//  {
//    "title":"Note Title", 
//    "body":"Note Body"
//  },
//  {
//    "title":"Todo List",
//    "body":"So Much Stuff"
//  }
// ]

const fs = require('fs')

const log = require('./log')

const dataStorePath = './notes.json'

const create = (title, body) => {
  // load the notes from the filesystem
  const notes = loadNotes()
  // notes must have a unique title, so check for this before allowing creation
  if (isUniqueTitle(notes, title)) {
    // add the note to the notes array
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes) ? log.logMsg('success', `Created new note: ${title}`) : log.logMsg('error',`Error writing to the file system, note ${title} not saved!`)
  
  } else {
    log.logMsg('error', 'Title already taken!')
  }
}



// ############### HELPER FUNCTIONS ##################### //

const loadNotes = () => {
  // if there is no file present at dataStorePath, an error will be thrown. 
  try {
    // notes will be a JSON string
    const notes = fs.readFileSync(dataStorePath, 'utf8')
    return JSON.parse(notes)
  } 
  catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  try {  
    fs.writeFileSync(dataStorePath, JSON.stringify(notes))
    return true
  }
  catch (e) {
    return false
  }
}

const isUniqueTitle = (notes, title) => {
  // if the title exists in the notes array, notes.some() will return true, meaning we have a duplicate title. This method's name leads us to return true if there is NO duplicate title, so we need to reverse the logic.
  return !(notes.some(note => note.title === title))
}

module.exports = {
  create: create
}