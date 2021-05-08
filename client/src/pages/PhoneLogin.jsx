import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import globalContext from "../context/globalContext";
import firebase from "../firebase/config";
import Headerpage from "./Headerpage";
import { Card } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import "../App.css";

function PhoneLogin() {
  let history = useHistory();
  // const [number, setNumber] = React.useState();
  const [showOtp, setShowOtp] = React.useState(false);
  const [otp, setOtp] = React.useState();
  const [selectedCallingCode, setSelectedCallingCode] = React.useState();

  // const handleChange = (e) => {
  //   console.log(e);
  //   setNumber(e.target.value);
  // };
  const { setUser } = useContext(globalContext);

  const signInBtn = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        setUser(user);
        console.log(result);
        // console.log(result.user);
        history.push("/Dashboard");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error);
        // ...
      });
  };
  const handlePhone = (e) => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "captcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          console.log(response);
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          console.log(response);
        },
      }
    );
    // const phoneNumber = getPhoneNumberFromUserInput(number);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(selectedCallingCode, appVerifier)
      .then((confirmationResult) => {
        setShowOtp(true);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        console.log(confirmationResult);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent

        console.log(error);
        // ...
      });
  };

  return (
    <div>
      <div style={{ height: "60px", backgroundColor: "#0077b6" }}>
        <Headerpage />
      </div>
      <div id="captcha-container"></div>
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
            boxShadow: "3px 5px 20px #0077b6",
            justifyContent: "center",
            alignItems: "center",
            width: "350px",
            height: "380px",
            background: "linear-gradient(to bottom, #99dbff 10%, #f6b4d5 90%)",
          }}
        >
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "38px",
                marginTop: "20px",
                marginBottom: "50px",
              }}
            >
              Phone Login
            </Card.Title>
            <Card.Text>
              <PhoneInput
                country={"in"}
                disabled={showOtp}
                id="standard-basic"
                value={selectedCallingCode}
                label="Enter your number"
                onChange={(value) => {
                  // console.log(e);
                  setSelectedCallingCode("+" + value);
                }}
              />
              {/* <PhoneInput
              // onChange={(selectedCallingCode) =>
              //   setSelectedCallingCode({ selectedCallingCode })
              // }
              /> */}
              {/* <TextField
                disabled={showOtp}
                id="standard-basic"
                label="Enter your number"
                onChange={(e) => handleChange(e)}
              /> */}
              {/* <br /> */}
              <Button
                variant="outlined"
                id="sign-in-button"
                color="primary"
                // hidden
                style={{ marginTop: "30px", display: showOtp ? "none" : null }}
                disabled={showOtp}
                onClick={(e) => {
                  handlePhone(e);
                }}
              >
                Send OTP
              </Button>
              {/* <Button
                variant="outlined"
                id="sign-in-button"
                color="primary"
                hidden
                style={{ marginTop: "50px", display: showOtp ? "none" : null }}
                disabled={showOtp}
                onClick={(e) => {
                  handlePhone(e);
                }}
              >
                Send OTP
              </Button> */}
              <br />
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  // width: "100px",
                }}
              >
                <OtpInput
                  className="OTP"
                  isDisabled={!showOtp}
                  label="OTP"
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                  }}
                  numInputs={6}
                  separator={<span>-</span>}
                  style={{ width: "50px" }}
                />
              </div>
              {/* <TextField
                disabled={!showOtp}
                label="OTP"
                onChange={(e) => setOtp(e.target.value)}
              /> */}
              <br />
              <Button
                variant="outlined"
                disabled={!showOtp}
                // id="sign-in-button"
                color="primary"
                style={{ marginTop: "10px", display: !showOtp ? "none" : null }}
                onClick={(e) => {
                  signInBtn(e);
                }}
              >
                Sign In
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <br />
    </div>
  );
}

export default PhoneLogin;
