function myPromiseAll(promise) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(promise)) {
      return reject(new TypeError("Argument must be an array"));
    }

    const results = [];
    let complete = 0;

    promise.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          complete += 1;

          if (complete === promise.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

    if (promise.length === 0) {
      resolve([]);
    }
  });
}

// Usage
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

myPromiseAll([promise1, promise2, promise3]).then((value) => {
  console.log(value); // [3, 42, 'foo']
});
