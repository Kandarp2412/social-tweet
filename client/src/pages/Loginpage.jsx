import React, { useContext } from "react";
import firebase from "../firebase/config";
import { useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";
import globalContext from "../context/globalContext";
import { Button, Divider, TextField } from "@material-ui/core";
import { saveLocal } from "../utils/authLocalStorage";
import { Card } from "react-bootstrap";
import Headerpage from "./Headerpage";
// import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";

function Loginpage() {
  let history = useHistory();
  // const { user } = useContext(globalContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(globalContext);
  const { email } = useContext(globalContext);
  const { setEmail } = useContext(globalContext);
  const { password } = useContext(globalContext);
  const { setPassword } = useContext(globalContext);
  // const [user, setUser] = React.useState({});
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  const authBtn = async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
        saveLocal(result.user.uid, result.user.displayName);
        console.log(result);

        alert(result.operationType);
        history.push("/Dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        saveLocal(result.user.uid, result.user.displayName);

        setUser(result.user);
        // // var userName = firebase.auth().currentUser;
        // // userName.updateProfile({
        // //   displayName: "name",
        // // });
        alert(result.operationType);
        history.push("/Dashboard");
      })
      .catch((err) => alert(err));
  };

  // const handleRegister = (e) => {
  //   history.push("/Registerpage");
  // };

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
  });

  const phoneLogin = () => {
    // console.log("dfrghj");
    history.push("/phonelogin");
  };

  return (
    // <div>
    <div>
      <div style={{ height: "60px", backgroundColor: "#0077b6" }}>
        <Headerpage />
      </div>
      <div
        className="card-css"
        style={{
          display: "flex",
          marginTop: "50px",
          marginBottom: "30px",
          justifyContent: "center",
          alignItems: "center",
          transformStyle: "preserve-3d",
        }}
      >
        {/* </div> */}
        <Card
          style={{
            display: "flex",
            marginBottom: "50px",
            boxShadow: "3px 5px 20px #0077b6",
            justifyContent: "center",
            alignItems: "center",
            width: "350px",
            height: "485px",
            background: "linear-gradient(to bottom, #99dbff 10%, #f6b4d5 90%)",
          }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: "38px", marginBottom: "20px" }}>
              Login
            </Card.Title>
            <Card.Text>
              {/* <form> */}
              {/* Email &emsp;&emsp;&emsp;:&emsp; */}
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <AlternateEmailIcon
                  style={{ marginRight: "15px", marginTop: "15px" }}
                />
                <TextField
                  type="text"
                  name="email"
                  label="Enter email"
                  style={{
                    marginBottom: "20px",
                    // marginTop: "20px",
                    width: "200px",
                    height: "30px",
                  }}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <br />
              {/* Password &emsp;:&emsp; */}
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <LockIcon style={{ marginRight: "15px", marginTop: "15px" }} />
                <TextField
                  type="password"
                  name="password"
                  label="Enter your Password"
                  style={{
                    marginBottom: "15px",
                    width: "200px",
                    height: "30px",
                  }}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "230px",
                  marginBottom: "20px",
                  height: "35px",
                  cursor: "pointer",
                }}
                onClick={(e) => handleLogin(e)}
              >
                Login
              </Button>
              <br />
              Not a User? <a href="/RegisterPage">Signup now</a>
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
                width: "243px",
                marginBottom: "20px",
                marginTop: "15px",
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
                  marginTop: "0px",
                  marginBottom: "10px",
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

        {/* <Button
        variant="contained"
        color="primary"
        onClick={(e) => handleClick()}
        style={{ marginTop: "80px" }}
      >
        firebase Test
      </Button> */}
      </div>
    </div>
  );
}

export default Loginpage;
