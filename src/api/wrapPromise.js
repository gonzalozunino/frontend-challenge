// Wraps over a Promise and provides a method that allows you to determine whether the data being returned from the Promise is ready to be read.
function wrapPromise(promise) {
  let status = "pending";
  let response;

  const suspend = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  // Query the value (or, if not resolved, the Promise itself)
  const read = () => {
    switch (status) {
      case "pending":
        throw suspend;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}
// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.

export default wrapPromise;
