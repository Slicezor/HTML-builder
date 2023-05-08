const fs = require('fs').promises
const path = require('path')

const stylesP = path.join(__dirname, 'styles')
const projectDistP = path.join(__dirname, 'project-dist', 'bundle.css')

async function readFile(file) {
  try {
    const data = await fs.readFile(file, 'utf8')
    return data
  } catch (err) {
    console.error("Failed to read file", err);
    return
  }
}

fs.readdir(stylesP)
  .then((files) => {
    const cssFiles = files.filter((file) => path.extname(file).toLowerCase() === '.css')
    const styles = Promise.all(cssFiles.map((file) => {
      const filePath = path.join(stylesP, file)
      return readFile(filePath)
    }))
    return styles
  })
  .then((styles) => {
    const stylesData = styles.join('\n')
    return fs.writeFile(projectDistP, stylesData)
  })
  .then(() => {
    console.log("The bundle.css file was successfully created")
  })
  .catch((err) => {
    console.error("Failed to build file", err);
  })