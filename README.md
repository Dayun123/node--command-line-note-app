# A Simple Node Command Line Note App 
Based on the 'Notes App' section of Andrew Mead's Udemy course *The Complete Node.js Developer Course(3rd Edition)* which you can find here: [Link](https://www.udemy.com/the-complete-nodejs-developer-course-2/)

Run the app with:
```
node app.js [command] --option='value'
```

App functionality:
1. Create notes 
`node app.js create --title='Note Title' --body='Note Body'`
2. Read notes  
`node app.js read --title='Note Title'`
3. Delete notes 
`node app.js delete --title='Note Title'`
4. List all notes 
`node app.js list`
5. Update a note 
`node app.js update --title='Note Title' --body='New Body'`