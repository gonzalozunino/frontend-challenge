import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Grid,
  Link as Anchor,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import { fetchColors } from "../api/endpoints";

const useStyles = makeStyles((theme) => ({
  termsRoot: {
    marginTop: theme.spacing(2),
    terms: {
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  },
}));

// Fetch the list of colors. Object with a reference to the request Promise.
const resource = fetchColors();

const MoreInfo = ({
  formData: {
    values: { terms },
    touched,
    errors,
  },
}) => {
  const classes = useStyles();

  //
  const getColors = () => {
    // If the request isn’t resolved yet, calling resource.read() will throw an exception back to the Suspense component.
    const colors = resource.read();

    return Array.from(colors, (color, id) => {
      if (id === 0) {
        return {
          id,
          color: "Select your favorite color.",
          value: "",
        };
      }
      return { id, color, value: color };
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl error={!!errors.color}>
          <Field
            id="color"
            name="color"
            label="I agree to the terms and conditions"
            required
            as={NativeSelect}
            error={!!touched.color && !!errors.color}
            variant="outlined"
            fullWidth
          >
            {getColors().map(({ id, color, value }) => (
              <option key={id} value={value}>
                {color}
              </option>
            ))}
          </Field>
          {touched.color && <FormHelperText>{errors.color}</FormHelperText>}
        </FormControl>

        <FormControl
          required
          error={!!errors.terms}
          component="fieldset"
          className={classes.formControl}
        >
          <Field
            className={classes.termsRoot}
            id="terms"
            name="terms"
            label={
              <Typography
                style={{ fontSize: 14 }}
                className={classes.termsRoot.terms}
              >
                <span>I agree to the </span>
                <Anchor
                  id="termsAnchor"
                  name="termsAnchor"
                  href="#"
                  onClick={(event) => event.preventDefault()}
                >
                  Terms and Conditions
                </Anchor>
              </Typography>
            }
            control={<Checkbox checked={terms} />}
            as={FormControlLabel}
            variant="outlined"
          />
          {touched.terms && <FormHelperText>{errors.terms}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  );
};

MoreInfo.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default MoreInfo;
