// import { Button } from "semantic-ui-react";
import React, { useContext } from "react";
import firebase from "../firebase/config";
import { useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";
import globalContext from "../context/globalContext";
import { Button, Divider, TextField } from "@material-ui/core";
import axios from "axios";
import { Card } from "react-bootstrap";
import Headerpage from "./Headerpage";
import { serverUrl } from "../config";

// import globalContext from "../context/globalContext";

function Registerpage() {
  let history = useHistory();

  // const [user, setUser] = React.useState({});
  const { setUser } = useContext(globalContext);
  const { email } = useContext(globalContext);
  const { setEmail } = useContext(globalContext);
  const { password } = useContext(globalContext);
  const { setPassword } = useContext(globalContext);

  const [name, setName] = React.useState("");
  const [username, setUserName] = React.useState("");

  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const authBtn = async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    // let photoURL;
    let full_name = name;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        axios.post(serverUrl + "/addUser", {
          displayName: result.user.displayName || undefined,
          photoURL: result.user.photoURL || undefined,
          email: result.user.email || undefined,
          full_name,
          userId: result.user.uid,
        });
        history.push("/Dashboard");
        console.log(result.user.displayName);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "name") {
      setName(event.target.value);
    }
    if (event.target.name === "username") {
      setUserName(event.target.value);
    }
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
    if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  };

  const emailRegx = RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  function ValidateEmail(email) {
    if (emailRegx.test(email)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!ValidateEmail(email)) return null;
    if (confirmPassword !== password) {
      return alert("password do not match");
    }
    console.log(username);
    const userRef = firebase.firestore().collection("user");
    const snapshot = await userRef
      .where("username", "==", username.toLocaleLowerCase())
      .get();
    if (snapshot.empty) {
      // console.log("No matching documents.");
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          console.log(userCredential);
          // firebase
          //   .firestore()
          //   .collection("user")
          //   .doc(userCredential.user.uid)
          //   .set({
          //     email: email,
          //     name: name,
          //     username: username.toLocaleLowerCase(),
          //   });
          let photoURL;
          let full_name = name;
          axios.post(serverUrl + "/addUser", {
            displayName: username || undefined,
            photoURL,
            email: userCredential.user.email || undefined,
            full_name,
            userId: userCredential.user.uid,
          });
          // var userName = firebase.auth().currentUser;
          userCredential.user.updateProfile({
            displayName: username,
          });
          var user = userCredential.user;
          if (!user) {
            user.set({
              email: email,
              password: password,
            });
          }
          alert("sign up ");
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
          return alert(error);
        });
    } else {
      alert("username already exits");
      // console.log(snapshot);
    }
  };
  // const handleLogin = () => {
  //   history.push("/");
  // };

  const phoneLogin = () => {
    // console.log("dfrghj");
    history.push("/phonelogin");
  };

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
  });

  return (
    <div>
      <div style={{ height: "60px", backgroundColor: "#0077b6" }}>
        <Headerpage />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          marginBottom: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            display: "flex",
            marginBottom: "50px",
            boxShadow: "3px 5px 20px #0077b6",
            justifyContent: "center",
            alignItems: "center",
            width: "350px",
            height: "580px",
            background: "linear-gradient(to bottom, #99dbff 10%, #f6b4d5 90%)",
          }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: "38px", marginBottom: "20px" }}>
              Signup
            </Card.Title>
            <Card.Text>
              {/* <form> */}
              {/* Email &emsp;&emsp;&emsp;:&emsp; */}
              <TextField
                text="text"
                name="name"
                label="Enter name"
                style={{ marginBottom: "20px", width: "200px", height: "30px" }}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              <br />
              {/* userName &emsp;&emsp;&emsp;&ensp;:&emsp; */}
              <TextField
                text="text"
                name="username"
                label="Enter username name"
                style={{ marginBottom: "20px", width: "200px", height: "30px" }}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              <br />
              {/* Email &emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&emsp;:&emsp; */}
              <TextField
                type="text"
                name="email"
                label="Enter email"
                style={{ marginBottom: "20px", width: "200px", height: "30px" }}
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              {/* Password &emsp;&emsp;&emsp;&ensp;&ensp;:&emsp; */}
              <TextField
                type="password"
                name="password"
                label="Enter your Password"
                style={{ marginBottom: "20px", width: "200px", height: "30px" }}
                onChange={(e) => handleChange(e)}
              />
              <br />
              {/* Confirm Password&ensp;:&emsp; */}
              <TextField
                type="password"
                name="confirmPassword"
                label="Enter Confirm Password"
                style={{ marginBottom: "30px", width: "200px", height: "30px" }}
                onChange={(e) => handleChange(e)}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "205px",
                  marginBottom: "10px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={(e) => handleRegister(e)}
              >
                Sign up
              </Button>
              <br />
              Have already an Account? <a href="/">Login</a>
            </Card.Text>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Divider
                style={{
                  marginRight: "5px",
                  backgroundColor: "grey",
                  // height: "1px",
                  width: "45%",
                }}
              />
              or
              <Divider
                style={{
                  marginLeft: "5px",
                  backgroundColor: "grey",
                  // height: "0px",
                  width: "45%",
                }}
              />
            </div>
            <Button
              variant="outlined"
              color="primary"
              style={{
                marginTop: "15px",
                width: "243px",
                marginBottom: "10px",
              }}
              onClick={phoneLogin}
            >
              SignIn with Phone
            </Button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleButton
                className="button"
                onClick={(e) => authBtn()}
                style={{
                  marginTop: "10px",
                  // width: "150px",
                  // height: "40px",
                  cursor: "pointer",
                  // display: "flex",
                  // justifyContent: "space-around",
                }}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Registerpage;
