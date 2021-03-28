import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "11px",
    marginTop: theme.spacing(1),
      
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    "&:hover": {
      background: "black",
      borderRadius: "22px 0 0px 22px",
    },
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 10px",
    borderRadius: "22px 0 0px 22px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightBold,
  },
  icon: {
    color: "white",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
  },
  active: {
    color: theme.palette.primary.main,
    background: "black",
    borderRadius: "22px 0 0px 22px",
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
      background: "black",
      borderRadius: "22px 0 0px 22px",
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            style={{ color: "white", paddingLeft: "15px" }}
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon} style={{ color: "white" }}>
              {page.icon}
            </div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
