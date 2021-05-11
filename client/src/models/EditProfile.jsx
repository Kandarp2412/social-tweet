import React, { useState } from "react";
// import firebase from "../firebase/config";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Sidebar from "../pages/Sidebar";
import { Button, TextField } from "@material-ui/core";
// import { saveLocal } from "../utils/authLocalStorage";
import globalContext from "../context/globalContext";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { serverUrl } from "../config";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function EditProfile({ openModal, setOpenModal }) {
  const classes = useStyles();
  // eslint-disable-next-line
  const bull = <span className={classes.bullet}>•</span>;
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  // eslint-disable-next-line
  const [password, setPassword] = useState("");
  const { user, setFlag, flag } = React.useContext(globalContext);
  let history = useHistory();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "url") {
      setUrl(e.target.value);
    }
  };

  // let { userName } = useParams();

  const userUpdate = ({ ...params }) => {
    user
      .updateProfile({
        // displayName: name,
        // photoURL: url,
        ...params,
      })
      .then(async function (res) {
        console.log("called");
        let dbUpdate = await axios.post(serverUrl + "/updateUser", {
          userId: user.uid,
          ...params,
        });
        setFlag(!flag);
        window.location.replace("/#/profilepage/" + name);
        console.log(res);
        console.log(dbUpdate);
        // alert("Name and URL both updated");
        // saveLocal(null, user.displayName, user.photoURL);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdate = async (e) => {
    if (url.length > 0 && name.length > 0) {
      if (user) userUpdate({ displayName: name, photoURL: url });
    } else if (name.length > 0) {
      if (user) userUpdate({ displayName: name });
      // const update = firebase.firestore().collection("user").doc(user.uid);

      // await update.update({ displayName: name });
    } else if (url.length > 0) {
      if (user) userUpdate({ photoURL: url });

      // const update = firebase.firestore().collection("user").doc(user.uid);

      // await update.update({ photoURL: url });
    } else {
      alert("nothing to update");
      history.push("/profilepage");
    }
    // history.push("/profilepage");
  };

  if (!user) {
    return <div>Simon! Go back.</div>;
  }

  return (
    <div>
      <div>
        <Sidebar openModal={openModal} setOpenModal={setOpenModal} />
        <h2 style={{ marginTop: "100px" }}>Edit Profile</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "70px",
            justifyContent: "center",
          }}
        >
          <Card
            className={classes.root}
            style={{
              //   display: "flex",
              //   justifyContent: "center",
              width: "350px",
              //   marginTop: "10px",
              boxShadow: "5px 5px 15px black",
            }}
          >
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <TextField
                  type="text"
                  name="name"
                  defaultValue={user.displayName}
                  label="enter your name"
                  style={{ marginTop: "15px" }}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <br />
                <TextField
                  type="password"
                  name="password"
                  label="enter new password"
                  style={{ marginTop: "15px" }}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <br />
                <TextField
                  type="text"
                  name="url"
                  label="URL"
                  style={{ marginTop: "15px" }}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px" }}
                  onClick={(e) => handleUpdate(e)}
                >
                  Update
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
