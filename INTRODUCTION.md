# Upgrade Challenge

## Implementation

This wizard form project was built using Formik a very powerfull library to take care of repetitive and annoying stuff (—keeping track of values/errors/visited fields, orchestrating validation, and handling submission. The main reason behind using Formik was to avoid keeping track of the form state which in Dan Abramov words is ephemeral and local so using Redux or any kind of Flux library seems unnecesary.
Since Formik provides a special configuration option called validationSchema Yup was used, this will automatically transform Yup's validation errors messages into objects whose keys match values / initialValues / touched. Yup is 100% optional but you can express the same validation in fewer lines of code.
The project also is taking advantaje of Material UI, reacts components for faster and easier web development. This integration works well together because you can use Formik Fields as any of the Material UI components and extend their use trough the entire app.
Suspense was used as an experimental feature to test render as you fetch approach, allowing you also to "wait" for some code to load and declaratively specify a load state (like a spinner) while waiting.

### Quick start

```sh
# use npm
npm i
npm start
```

## Useful Links & Credits

[Formik](https://formik.org/)
[Yup](https://github.com/jquense/yup)
[Material UI](https://material-ui.com/)
[Suspense](https://en.reactjs.org/docs/concurrent-mode-suspense.html)
