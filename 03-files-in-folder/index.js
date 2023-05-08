const fs = require('fs')
const path = require('path')

fs.readdir(`${path.join('03-files-in-folder', 'secret-folder')}`, (err, files) => {
  if (err) {
    console.error("Failed to read the folder", err)
    return
  }

  files.forEach((fileName) => {
    const file = path.join(`${path.join('03-files-in-folder', 'secret-folder')}`, fileName)

    fs.stat(file, (err, data) => {
      if (err) {
        console.error("Failed to get files data", err)
        return
      }

      if (data.isFile()) {
        const fileName = path.basename(file, path.extname(file))
        const fileExt = path.extname(file)
        const fileSize = data.size

        console.log(`${fileName} - ${fileExt} - ${((fileSize) / 1024).toFixed(3)} KB`)
      }
    })
  })
})