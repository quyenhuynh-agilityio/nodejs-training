async function myAsyncAwait(promise) {
  if (!Array.isArray(promises)) {
    throw new TypeError("Argument must be an array");
  }

  const results = [];
  let complete = 0;
  const errors = [];

  return new Promise((resolve, reject) => {
    promise.forEach((promise, index) => {
      (async () => {
        try {
          const value = await Promise.resolve(promise);
          results[index] = value;
          complete += 1;

          if (complete === promise.length) {
            resolve(results);
          }
        } catch (error) {
          errors.push(error);
          reject(error);
        }
      })();
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

myPromiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, 'foo']
});
