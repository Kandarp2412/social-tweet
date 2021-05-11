import "./App.css";
import Loginpage from "./pages/Loginpage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Registerpage from "./pages/Registerpage";
import React, { useContext, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AddPost from "./models/AddPost";
import MyPost from "./models/MyPost";
import EditProfile from "./models/EditProfile";
import PhoneLogin from "./pages/PhoneLogin";
import globalContext from "./context/globalContext";
import firebase from "./firebase/config";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [openModal, setOpenModal] = React.useState(false);

  const { user, setUser } = useContext(globalContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user1) {
      if (user1) {
        setUser(user1);
        // User is signed in.
      } else {
        setUser(null);
        // No user is signed in.
      }
    });
  }, [user, setUser]);
  if (!user) {
    <Loginpage />;
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Loginpage />
          </Route>
          <Route exact path="/Registerpage">
            <Registerpage />
          </Route>
          <Route exact path="/Dashboard">
            <Dashboard openModal={openModal} setOpenModal={setOpenModal} />
          </Route>
          <Route exact path="/Addpost">
            <AddPost />
          </Route>
          <Route exact path="/MyPost">
            <MyPost openModal={openModal} setOpenModal={setOpenModal} />
          </Route>
          <Route exact path="/EditProfile">
            <EditProfile openModal={openModal} setOpenModal={setOpenModal} />
          </Route>
          <Route exact path="/phonelogin">
            <PhoneLogin />
          </Route>
          <Route exact path="/profilepage/:userName">
            <ProfilePage openModal={openModal} setOpenModal={setOpenModal} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
