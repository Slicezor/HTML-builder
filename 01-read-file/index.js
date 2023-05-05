const fs = require("fs");
const path = require("node:path")

let stream = new fs.ReadStream(`${path.join('01-read-file', 'text.txt')}`, 'utf8')

stream.on("readable", () => {
  let text = stream.read()
  if (text != null) { console.log(text) }
})

stream.on('end', () => { console.log("The file has been read") })