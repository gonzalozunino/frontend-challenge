// Endpoint handler util using fetch Api (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
import wrapPromise from "./wrapPromise";

// API urls
const baseUrl = "http://localhost:3001/api";
const colorsUrl = `${baseUrl}/colors`;
const postColorsUrl = `${baseUrl}/submit`;

// Asynchronous functions to fetch the data that our components require
// Fetchs list of colors
function fetchColors() {
  const promise = fetch(colorsUrl).then((res) => res.json());

  return wrapPromise(promise);
}

// Post submitted values on form
function postColors(values) {
  const promise = fetch(postColorsUrl, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .catch((error) => {
      console.error("There was an error!", error);
      return error;
    });

  return promise;
}

export { fetchColors, postColors };
