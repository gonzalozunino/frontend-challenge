import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { DoneOutline, ClearOutlined } from "@material-ui/icons";

const avatar = {
  marginBottom: 16,
};

const useStyles = makeStyles((theme) => ({
  error: {
    ...avatar,
    backgroundColor: theme.palette.error.main,
  },
  success: {
    ...avatar,
    backgroundColor: theme.palette.success.main,
  },
}));

const Result = ({ message, failed = false }) => {
  const classes = useStyles();
  const getStatusClass = () => (failed ? classes.error : classes.success);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar className={getStatusClass()}>
            {failed ? <ClearOutlined /> : <DoneOutline />}
          </Avatar>
          <Typography component="h1" variant="h6">
            {message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}></Grid>
    </>
  );
};

Result.propTypes = {
  message: PropTypes.string.isRequired,
  failed: PropTypes.bool,
};

export default Result;
