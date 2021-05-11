import { Avatar, Divider, Modal } from "@material-ui/core";
import React, { useEffect } from "react";
import globalContext from "../context/globalContext";
import Sidebar from "./Sidebar";
import { useHistory, useParams } from "react-router-dom";
import MyPost from "../models/MyPost";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { serverUrl } from "../config";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  pos: {
    marginBottom: 12,
  },
});

function ProfilePage({ openModal, setOpenModal }) {
  const classes = useStyles();
  // eslint-disable-next-line
  const bull = <span className={classes.bullet}>•</span>;

  let history = useHistory();
  const {
    user,
    // flag,
    // setFlag,
    setFollower,
    follower,
    following,
    setFollowing,
  } = React.useContext(globalContext);
  const [userNameParam, setUserNameParam] = React.useState("");
  const [myPost, setMyPost] = React.useState([]);
  const [followingCount, setFollowingCount] = React.useState([]);
  const [followerCount, setFollowerCount] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [followingModal, setFollowingModal] = React.useState(false);
  const [followerModal, setFollowerModal] = React.useState(false);

  const handleEditProfile = () => {
    history.push("/EditProfile");
  };

  let { userName } = useParams();

  useEffect(() => {
    if (user)
      axios
        .post(serverUrl + "/mypost", { userName: userName })
        .then((result) => {
          // setFollowers(result.data.follower);
          console.log(result);
          setMyPost(result.data.data);
        });
  }, [user, flag, userName]);

  // useEffect(() => {
  //   axios.post("http://localhost:8081/follow", {
  //     followerId: user.uid,
  //     // userId: id,
  //   });
  // });

  useEffect(() => {
    axios
      .post(serverUrl + "/userfollowing", { userName: userName })
      .then((result) => {
        console.log("following");
        console.log(result);
        setFollowingCount(result.data.data.length);
        setFollowing(result.data.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [userName]);

  useEffect(() => {
    axios
      .post(serverUrl + "/userfollower", { userName: userName })
      .then((result) => {
        console.log(result);
        setFollowerCount(result.data.data.length);
        setFollower(result.data.data);
      });
    // eslint-disable-next-line
  }, [userName]);

  useEffect(() => {
    setUserNameParam(userName);
    console.log(userName);
  }, [userName]);

  const handleFollowing = (e) => {
    setFollowingModal(true);
    axios
      .post(serverUrl + "/userfollowing", { userName: userName })
      .then((result) => {
        console.log(result);
        setFollowing(result.data.data);
      });
  };

  const handleFollowers = (modalState) => {
    setFollowerModal(modalState);
    axios
      .post(serverUrl + "/userfollower", { userName: userName })
      .then((result) => {
        console.log(result);
        setFollower(result.data.data);
      });
  };

  const handleFollow = (e) => {
    // console.log(myPost[0]?.userId);
    if (user)
      axios
        .post(serverUrl + "/follow", {
          userId: user.uid,
          displayName: userName,
        })
        .then((result) => {
          console.log(user.uid);
          handleFollowers(false);
          // setFollowing(result.data.data);
          setFlag(!flag);
          console.log(result);
        })
        .catch((err) => console.log(err));
  };

  const handleFollowingProfile = (e, userName) => {
    // console.log(userName);
    history.push("/profilepage/:userName");
  };

  const handleFollowerProfile = (e, userName) => {
    history.push("/profilepage/" + userName);
  };

  // const handleFollowUserProfile = ()=>{}

  if (!user) {
    return <div>Simon! Go back.</div>;
  }
  //   let joined = user.createdAt;
  //   console.log(user.createdAt);
  let add = "Add your name";

  return (
    <div>
      <Sidebar openModal={openModal} setOpenModal={setOpenModal} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "100px",
        }}
      >
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
        <div></div>
        {/* <div style={{ display: "flex" }}>
          <div style={{ justifyContent: "center" }}> */}
        <Avatar
          src={myPost && myPost.length > 0 && myPost[0]?.user?.photoURL}
          style={{
            fontSize: "150px",
            display: "flex",
            justifyContent: "center",
            // marginLeft: "675px",
            float: "center",
            height: "200px",
            width: "200px",
            cursor: "pointer",
          }}
          // onClick={(e) => handleEditProfile(e)}
        >
          {userName ? userName.charAt(0) : add.charAt(0)}
        </Avatar>
        {/* </div> */}

        {
          userName === user.displayName ? (
            <h4
              style={{
                marginRight: "50px",
                cursor: "pointer",
                float: "right",
                // marginTop: "-180px",
              }}
              onClick={(e) => handleEditProfile(e)}
            >
              Edit Profile
            </h4>
          ) : (
            <h4
              style={{
                marginRight: "50px",
                cursor: "pointer",
                float: "right",
                // marginTop: "-180px",
              }}
            ></h4>
          )
          // (
          // <div
          //   style={{
          //     display: "flex",
          //     justifyContent: "space-between",
          //     marginTop: "100px",
          //   }}
          // >
          //   <Avatar
          //     src={myPost && myPost.length > 0 && myPost[0]?.user?.photoURL}
          //     style={{
          //       fontSize: "150px",
          //       display: "flex",
          //       justifyContent: "center",
          //       // marginLeft: "675px",
          //       float: "center",
          //       height: "200px",
          //       width: "200px",
          //       cursor: "pointer",
          //     }}
          //     // onClick={(e) => handleEditProfile(e)}
          //   >
          //     {userName ? userName.charAt(0) : add.charAt(0)}
          //   </Avatar>
          //   <h4
          //     style={{
          //       marginRight: "50px",
          //       cursor: "pointer",
          //       float: "right",
          //       // marginTop: "-180px",
          //     }}
          //     // onClick={(e) => handleEditProfile(e)}
          //   >
          //     {/* Edit Profile */}
          //   </h4>
          // </div>)
        }
        {/* </div> */}
        {/* <div></div> */}
        {/* </div> */}
      </div>
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          marginTop: "10px",
          fontSize: "20px",
          marginRight: "130px",
          justifyContent: "center",
          // display: "flex",
        }}
      >
        @
        {userName ? (
          userName
        ) : (
          <h4
            style={{ cursor: "pointer", alignItems: "center" }}
            // onClick={(e) => handleEditProfile(e)}
          >
            {add}
          </h4>
        )}
        <br />
        {userName !== user.displayName && (
          <h5
            style={{
              marginLeft: "15px",
              cursor: "pointer",
            }}
            onClick={(e) => handleFollow(e)}
          >
            {follower &&
            follower.find((fo, index) => fo.followerId === user.uid)
              ? "Following"
              : "Follow"}
          </h5>
        )}
        {/* {followers && followers.length > 0
          ? followers.map((followers) => {
              return <>Follower:{followers[0].followersCount}</>;
            })
          : null} */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          {/* <div></div> */}
          <h5
            style={{ marginRight: "15px", cursor: "pointer" }}
            onClick={(e) => handleFollowing(e)}
          >
            Following: {followingCount}&emsp;
          </h5>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={followingModal}
            onClose={() => setFollowingModal(false)}
            // closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div
              in={followingModal}
              style={{
                width: "300px",
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll",
              }}
            >
              {following && following.length > 0
                ? following.map((f) => {
                    return (
                      <>
                        <h3
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            cursor: "pointer",
                            marginTop: "15px",
                          }}
                        >
                          <Avatar
                            src={f.user?.photoURL}
                            // style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleFollowingProfile(e, f.user.displayName)
                            }
                          >
                            {/* {userName ? userName.charAt(0) : add.charAt(0)} */}
                          </Avatar>
                          {f.user?.displayName}
                        </h3>
                        <Divider />
                        <br />
                      </>
                    );
                  })
                : "you are not following any one"}
            </div>
          </Modal>
          {/* <div></div> */}
          <h5
            style={{ cursor: "pointer", display: "flex" }}
            onClick={(e) => handleFollowers(true)}
          >
            Followers:{followerCount}
          </h5>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={followerModal}
            onClose={() => setFollowerModal(false)}
            // closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div
              in={followerModal}
              style={{
                width: "300px",
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll",
              }}
            >
              {follower && follower.length > 0
                ? follower.map((fo) => {
                    return (
                      <>
                        <h3
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            cursor: "pointer",
                            marginTop: "15px",
                          }}
                          onClick={(e) =>
                            handleFollowerProfile(e, fo.follower.displayName)
                          }
                        >
                          <Avatar
                            src={fo.follower.photoURL}
                            // style={{ cursor: "pointer" }}
                          >
                            {/* {userName ? userName.charAt(0) : add.charAt(0)} */}
                          </Avatar>
                          {fo.follower.displayName}
                        </h3>
                        <Divider />
                        <br />
                      </>
                    );
                  })
                : "you have not any follower"}
            </div>
          </Modal>
          {/* </div> */}
          {/* </Modal> */}
        </div>
      </div>
      <div style={{ height: "45vh", overflow: "scroll", marginTop: "15px" }}>
        <MyPost userNameParam={userNameParam} myPost={myPost} />
      </div>
      {/* <div
        style={{ fontSize: "20px", justifyContent: "center", display: "flex" }}
      ></div> */}
    </div>
  );
}

export default ProfilePage;
