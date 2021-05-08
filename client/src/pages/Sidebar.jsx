import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Avatar, Button } from "@material-ui/core";
import firebase from "../firebase/config";
import { useHistory } from "react-router-dom";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TwitterIcon from "@material-ui/icons/Twitter";
import AddPost from "../models/AddPost";
import globalContext from "../context/globalContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#d3eefd",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // backgroundColor: "#d3eefd",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function ResponsiveDrawer(props) {
  let history = useHistory();
  const { user, setUser } = useContext(globalContext);
  const { openModal, setOpenModal } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const { open, setOpen } = props;
  const [open, setOpen] = React.useState(false);
  //   const [user, setUser] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser();
        history.push("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handlePost = (e) => {
    if (user.displayName === null) {
      history.push("/EditProfile");
    } else {
      setOpenModal(true);
      // history.push("/Addpost");
    }
    // console.log("dfghj");
  };

  // const handleMyPost = (e) => {
  //   history.push("/MyPost");
  // };
  let username = user.displayName;

  const handleProfile = (e, username) => {
    history.push("/profilepage/" + username);
  };

  const handleDashboard = (e) => {
    history.push("/Dashboard");
  };

  const handleEditProfile = () => {
    // setOpenModal(true);

    history.push("/EditProfile");
  };

  let add = "Add your name";

  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <CssBaseline />
        <AddPost openModal={openModal} setOpenModal={setOpenModal} />

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h5" noWrap>
              <center
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={(e) => handleDashboard(e)}
              >
                <TwitterIcon style={{ fontSize: "30px" }} />
                Twitter
              </center>
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div
            className={classes.drawerHeader}
            style={{ backgroundColor: "#d3eefd" }}
          >
            <h4
              style={{
                float: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // backgroundColor: "#d3eefd",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingRight: "10px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={user.photoURL}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleProfile(e, username)}
                >
                  {username ? username.charAt(0) : add.charAt(0)}
                </Avatar>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {username ? (
                  username
                ) : (
                  <h4
                    style={{ cursor: "pointer", alignItems: "center" }}
                    onClick={(e) => handleEditProfile(e)}
                  >
                    {add}
                  </h4>
                )}
              </div>
            </h4>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          {/* </div> */}
          <Divider />
          <div style={{ backgroundColor: "#d3eefd", height: "93vh" }}>
            <List>
              {[" Add Post"].map((text, index) => (
                <ListItem button key={text} onClick={(e) => handlePost(e)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AddCircleIcon /> : <AddCircleIcon />}
                    {/* <AddCircleIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              <Divider />
              {/* {["My Post"].map((text, index) => (
                <ListItem button key={text} onClick={(e) => handleMyPost(e)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <LibraryBooksIcon />
                    ) : (
                      <LibraryBooksIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              <Divider /> */}

              {/* {["Profile"].map((text, index) => (
              <ListItem button key={text} onClick={(e) => handleProfile(e)}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <AccountCircleIcon />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
