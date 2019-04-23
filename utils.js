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
const l = console.log // laziness method...

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

/*
Current Notes:

-- Title --    ||  -- Body --
Allie Presents ||  Trip To Port Arthur, Spa Day
Dog Stuff      ||  Vet Appointment, Flea Medicine
Grocery List   ||  Eggs, Ham, Cheese, Bread (this could be colored)
*/
const list = () => {
  const notes = loadNotes()
  if (notes.length > 0) {
    listNotes(notes)
  } else {
    log.logMsg('error', 'There are no notes to list!')
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

const listNotes = (notes) => {
  const menu = formatMenu(notes)
  l(menu.header)
  menu.body.forEach(note => l(note))
}

const formatMenu = (notes) => {
  
  const titleColumnWidth = getTitleColumnWidth(notes)
  const centerColumn = ' || '
  const menu = {}

  menu.header = formatTitleColumn('-- Title --', titleColumnWidth) + centerColumn + '-- Body --'
  
  menu.body = notes.map(note => formatTitleColumn(note.title, titleColumnWidth) + centerColumn + note.body)

  return menu 
} 

const formatTitleColumn = (title, titleColumnWidth) => {
  const numExtraSpaces = titleColumnWidth - title.length
  for (let i = 0; i < numExtraSpaces; i++) {
    title += ' '
  }
  return title
}

const getTitleColumnWidth = (notes) => {

  // title column will have:
  // -- Title --
  // which needs 11 spaces
  const MIN_COL_WIDTH = 11
  
  // we need to figure out the longest note title so we can set the width of the menu, this is the callback function that will do that when passed to Array.reduce()
  const reducer = (longestNoteTitle, { title }) => title.length > longestNoteTitle ? title.length : longestNoteTitle 

  const longestNoteTitle = notes.reduce(reducer, 0)

  return MIN_COL_WIDTH >= longestNoteTitle ? MIN_COL_WIDTH : longestNoteTitle
}

module.exports = {
  create: create,
  list: list
}