import React, { lazy, Suspense } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

import {
  pages,
  getStep,
  isConfirmationStep,
  isResultStep,
} from "../utils/pages";
import { schemaArray } from "./validations";
import { postColors } from "../api/endpoints";
// Using lazy as experimental feature
const UserDetails = lazy(() => import("./UserDetails"));
const Confirmation = lazy(() => import("./Confirmation"));
const MoreInfo = lazy(() => import("./MoreInfo"));
const Result = lazy(() => import("./Result"));

const initialFormData = {
  name: "",
  email: "",
  password: "",
  color: "",
  terms: false,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6),
  },
  form: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 470,
    minWidth: 270,
  },
  progress: {
    position: "absolute",
    top: "30%",
  },
}));

const Wizard = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  // useLocation and useHistory provides current location and history to go to next pages
  const step = getStep(pathname);
  const isConfirmation = isConfirmationStep(pathname);
  const isResult = isResultStep(pathname);

  const next = ({ setSubmitting }) => {
    const nextPath = step + 1;
    const { path } = pages[nextPath];

    setSubmitting(false);
    history.push(path);
  };

  const previous = () => {
    const prevPath = step - 1;
    const { path } = pages[prevPath];

    history.push(path);
  };

  const reset = ({ setSubmitting, resetForm }) => {
    setSubmitting(false);
    resetForm(initialFormData);
    history.push("/");
  };

  const submit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const response = await postColors(values);

    // check for error response
    if (response.ok) {
      setSubmitting(false);
      return history.push("/success");
    }

    return history.push("/error");
  };

  const handleSubmitFormik = (values, actions) => {
    if (isConfirmation) {
      return submit(values, actions);
    }

    if (isResult) {
      return reset(actions);
    }

    return next(actions);
  };

  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={schemaArray[step]}
      onSubmit={handleSubmitFormik}
    >
      {({ values, touched, errors, handleSubmit, isSubmitting }) => (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Suspense
                delayMs={500}
                fallback={
                  <CircularProgress
                    className={classes.progress}
                    color="secondary"
                  />
                }
              >
                <Grid container justify="center" spacing={2}>
                  <Typography component="h1" variant="h5">
                    {pages[step].title}
                  </Typography>
                </Grid>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <UserDetails formData={{ values, touched, errors }} />
                    )}
                  />
                  <Route
                    exact
                    path="/more-info"
                    render={() => (
                      <MoreInfo formData={{ values, touched, errors }} />
                    )}
                  />
                  <Route
                    exact
                    path="/confirmation"
                    render={() => (
                      <>
                        {isSubmitting ? (
                          <CircularProgress
                            className={classes.progress}
                            color="secondary"
                          />
                        ) : (
                          <Confirmation formData={{ values }} />
                        )}
                      </>
                    )}
                  />
                  <Route
                    exact
                    path="/success"
                    render={() => (
                      <Result
                        title="Success!"
                        message="You should receive a confirmation email soon."
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/error"
                    render={() => (
                      <Result
                        message="Uh oh, something went wrong. Please try again later."
                        failed
                      />
                    )}
                  />
                  <Redirect to="/" />
                </Switch>
                <Grid container spacing={2}>
                  {step > 0 && !isResult && (
                    <Grid item>
                      <Button
                        type="button"
                        disabled={isConfirmation && isSubmitting}
                        variant="contained"
                        color="secondary"
                        onClick={previous}
                      >
                        Back
                      </Button>
                    </Grid>
                  )}
                  {!isConfirmation && !isResult && (
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Next
                      </Button>
                    </Grid>
                  )}
                  {isConfirmation && (
                    <Grid item>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </Grid>
                  )}
                  {isResult && (
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Restart
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Suspense>
            </form>
          </Paper>
        </Container>
      )}
    </Formik>
  );
};

export default Wizard;
