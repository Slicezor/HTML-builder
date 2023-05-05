const readline = require('node:readline')
const path = require('node:path')
const fs = require('fs')


fs.access(`${path.join('02-write-file', 'text.txt')}`, fs.F_OK, (err) => {
  if (err) {
    fs.writeFile(`${path.join('02-write-file', 'text.txt')}`, '', (err) => {
      if (err) throw err
      console.log("File has been created\n")
      getInput()
    })
  } else {
    console.log("Enter text to add to the file: ")
    getInput()
  }
})

function getInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  function addToFile() {
    rl.question('Enter text to add to the file: ', (text) => {
      if (text === 'exit') {
        console.log("Thank you! Goodbye\n")
        rl.close()
        process.exit()
      } else {
        fs.appendFile(`${path.join('02-write-file', 'text.txt')}`, `${text} `, (err) => {
          if (err) throw err
          console.log("Successful. The data is recorded\n")
          addToFile()
        })
      }
    })
  }
  addToFile()
}



  
  // const rl = readline.createInterface({ input, output })

  // rl.question("Enter text to add to the file: ", (text) => {
  //   if ((text.toLowerCase()) == "exit") text = "exit"

  //   while (true) {
  //     switch (text) {
  //       case 'exit': {
  //         console.log("Thank you! Goodbye")
  //         rl.close()
  //         process.exit(0)
  //       }
  //       default: {
  //         fs.appendFile(`${path.join('02-write-file', 'text.txt')}`, text, (error) => {
  //           if (error) { throw error }
  //           console.log("Successful. The data is recorded")
  //         })
  //         break
  //         console.log(text)
  //       }
  //     }
  //   }
  // })

