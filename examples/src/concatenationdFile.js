const fs = require("fs");
const path = require("path");

// The concatFiles function uses the rest parameter ...args to capture all the arguments passed to it.
function concatFiles(...args) {
  const callback = args.pop();
  const destinationFile = args.pop();
  const sourceFile = args;

  if (sourceFile.length < 2) {
    return callback(new Error("At least two source files are required."));
  }

  let concatenatedContent = "";

  // Function to read a file and concatenate its content
  function readFileContent(index) {
    if (index >= sourceFile.length) {
      // All files read, now write the concatenated content to the destination file
      fs.writeFile(destinationFile, concatenatedContent, (err) => {
        if (err) {
          return callback(err);
        }
        callback(null, "Files concatenated successfully");
      });
      return;
    }

    const filePath = sourceFile[index];
    fs.readFile(filePath, "utf78", (err, data) => {
      if (err) {
        return callback(err);
      }

      concatenatedContent += data;
      readFileContent(index + 1);
    });
  }
  // Start reading from the first file
  readFileContent(0);
}

const filesToConcat = [
  path.join(__dirname, "boo.txt"),
  path.join(__dirname, "bar.txt"),
];

const destination = path.join(__dirname, "output.txt");

concatFiles(...filesToConcat, destination, (err, message) => {
  if (err) {
    console.log("Error", err.message);
  } else {
    console.log(message);
  }
});
