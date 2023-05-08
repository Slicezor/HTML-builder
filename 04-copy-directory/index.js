const fs = require('fs')
const path = require('path')

const sourceFolder = `${path.join('04-copy-directory', 'files')}`
const copyFolder = `${path.join('04-copy-directory', 'files-copy')}`

copyDir(sourceFolder, copyFolder)

function copyDir(sourceFolder, copyFolder) {
  fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) {
      console.error("Failed to create folder", err);
      return
    }

    fs.readdir(sourceFolder, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error("Failed to read the folder", err);
        return
      }

      files.forEach((file) => {
        const source = path.join(sourceFolder, file.name)
        const copy = path.join(copyFolder, file.name)

        if (file.isDirectory()) {
          copyDir(source, copy)
        } else {
          fs.copyFile(source, copy, (err) => {
            if (err) {
              console.error("Failed to copy file", err);
              return
            }

            console.log(`Copied file "${source}" to "${copy}"`)
          })
        }
      })
    })
  })
}
