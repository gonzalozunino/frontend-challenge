import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import {
  PersonOutlineOutlined,
  EmailOutlined,
  LockOutlined,
  ColorLensOutlined,
  DescriptionOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  password: {
    textSecurity: "disc",
  },
}));

const Confirmation = ({
  formData: {
    values: { name, email, password, color, terms },
  },
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List disablePadding dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonOutlineOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="First Name" secondary={name} />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EmailOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LockOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              classes={{ secondary: classes.password }}
              primary="Password"
              secondary={password}
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ColorLensOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Favorite color" secondary={color} />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DescriptionOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Terms and conditions"
              secondary={(terms && "Agreed") || "Disagreed"}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Grid>
    </Grid>
  );
};

Confirmation.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default Confirmation;
