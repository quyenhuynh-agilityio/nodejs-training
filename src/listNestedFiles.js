const fs = require("fs");
const path = require("path");

function listNestedFiles(dir, cb) {
  let result = [];

  function readDir(dir, done) {
    // The fs.readdir function reads the directory contents.
    fs.readDir(dir, (err, list) => {
      if (err) return done(err);

      let pending = list.length;
      if (!pending) return done(null, result);

      list.forEach((file) => {
        file = path.resolve(dir, file);

        // The fs.stat function checks if the item is a file or a directory.
        fs.stat(file, (err, stat) => {
          if (err) return done(err);

          // We maintain a pending count to track the number of asynchronous operations in progress.
          // When pending reaches zero, it means all operations are complete, and the done callback is called.
          if (stat && stat.isDirectory()) {
            // Avoiding Callback Hell. The code structure remains flat and readable, avoiding deeply nested callbacks.
            readDir(file, (err) => {
              if (err) return done(err);

              if (!--pending) done(null, results);
            });
          } else {
            result.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
    });
  }
  readDir(dir, cb);
}

// Usage example
listNestedFiles("/path/to/your/directory", (err, files) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Files:", files);
  }
});
