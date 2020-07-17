import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { Grid, TextField } from "@material-ui/core";

const UserDetails = ({ formData: { touched, errors } }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Field
        id="name"
        name="name"
        label="First Name"
        required
        as={TextField}
        error={!!touched.name && !!errors.name}
        helperText={touched.name && errors.name}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Field
        id="email"
        name="email"
        label="Email"
        required
        type="email"
        as={TextField}
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Field
        id="password"
        name="password"
        label="Password"
        required
        type="password"
        as={TextField}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Grid>
  </Grid>
);

UserDetails.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default UserDetails;
