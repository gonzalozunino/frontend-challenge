// Common pages utils
// the specific path for each page
const pages = [
  { id: 0, path: "/", title: "Sign up" },
  { id: 1, path: "/more-info", title: "Additional Info" },
  { id: 2, path: "/confirmation", title: "Confirmation" },
  { id: 3, path: "/success", title: "Success!" },
  { id: 4, path: "/error", title: "Error" },
];

// Current page is determined by matching path in locations
const getStep = (path) => {
  const { id = 0 } = pages.find((page) => page.path === path);

  return id;
};

// Check if step is validation
const isConfirmationStep = (path) => getStep("/confirmation") === getStep(path);

// Check if step is a type of result
const isResultStep = (path) =>
  getStep("/success") === getStep(path) || getStep("/error") === getStep(path);

export { pages, getStep, isConfirmationStep, isResultStep };
