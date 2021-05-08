import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";

function Headerpage() {
  return (
    <div>
      <center
        style={{
          alignItems: "center",
          paddingTop: "10px",
          color: "white",
          fontSize: "30px",
          cursor: "pointer",
        }}
        // onClick={(e) => handleDashboard(e)}
      >
        <TwitterIcon style={{ fontSize: "30px" }} />
        Twitter
      </center>
    </div>
  );
}

export default Headerpage;
