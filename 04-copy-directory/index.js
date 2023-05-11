const fs = require('fs')
const path = require('path')

const sourceFolder = path.join('04-copy-directory', 'files')
const copyFolder = path.join('04-copy-directory', 'files-copy')

deleteFiles(copyFolder, () => {
  createCopyFolder(copyFolder, () => {
    copyDir(sourceFolder, copyFolder)
  })
})

function deleteFiles(folder, callback) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      if (err.code === 'ENOENT') {
        callback()
      } else {
        console.error("Failed to read the folder", err)
      }
      return
    }

    let deletedCount = 0

    if (files.length === 0) {
      callback()
      return
    }

    files.forEach((file) => {
      const filePath = path.join(folder, file)

      fs.unlink(filePath, (err) => {
        deletedCount++

        if (err) {
          console.error("Failed to delete file", err)
          return
        }

        if (deletedCount === files.length) {
          callback()
        }
      })
    })
  })
}

function createCopyFolder(folder, callback) {
  fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) {
      console.error("Failed to create folder", err)
    }
    callback()
  })
}

function copyDir(sourceFolder, copyFolder) {
  fs.readdir(sourceFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Failed to read the folder", err)
      return
    }

    files.forEach((file) => {
      const source = path.join(sourceFolder, file.name)
      const copy = path.join(copyFolder, file.name)

      if (file.isDirectory()) {
        copyDir(source, copy)
      } else {
        performCopy(source, copy)
      }
    })
  })
}

function performCopy(source, copy) {
  fs.copyFile(source, copy, (err) => {
    if (err) {
      console.error("Failed to copy file", err)
      return
    }

    console.log(`Copied file "${source}" to "${copy}"`)
  })
}