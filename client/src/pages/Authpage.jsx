import React from "react";
import Dashboard from "./Dashboard";
import Registerpage from "./Registerpage";
import Loginpage from "./Loginpage";

function Authpage() {
  const [page, setPage] = React.useState("Login");
  const [user, setUser] = React.useState();

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   if (event.target.name === "username") {
  //     setEmail(event.target.value);
  //   } else {
  //     setPassword(event.target.value);
  //   }
  // };

  if (user) {
    return <Dashboard user={user} />;
  }
  if (page === "Login")
    return <Loginpage setPage={setPage} user={user} setUser={setUser} />;

  return <Registerpage user={user} setUser={setUser} setPage={setPage} />;
}

export default Authpage;
