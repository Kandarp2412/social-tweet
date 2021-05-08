import axios from "axios";
import React, { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import globalContext from "../context/globalContext";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router";
import "semantic-ui-css/semantic.min.css";
import Collapsible from "react-collapsible";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
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
    fontSize: 16,
    // float: "top",
    // textAlign: "start",
  },
  pos: {
    marginBottom: 12,
  },
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function Dashboard({ openModal, setOpenModal }) {
  let history = useHistory();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  // const [allPost, setAllPost] = useState([]);
  const classes = useStyles();
  // eslint-disable-next-line
  const bull = <span className={classes.bullet}>•</span>;

  // const [isOpen, setIsOpen] = React.useState(true);
  const [postId, setPostId] = React.useState();
  const [suggestion, setSuggestion] = React.useState([]);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deletePId, setDeletePId] = React.useState();

  const {
    user,
    totalLike,
    setFlag,
    flag,
    setLike,
    like,
    likedPosts,
    allPost,
    // setFollowing,
    // following,
    commentInput,
    setCommentInput,
    showComment,
    setShowComment,
    // setTotalLike,
    // setLikedPosts,
    // setAllPost,
    // loading,
    // proPicUrls,
  } = useContext(globalContext);

  const handleShowComment = (e, pId) => {
    console.log(pId);
    setPostId(pId);
    axios
      .post(serverUrl + "/showcomment", { postId: pId })
      .then((result) => {
        console.log(result);
        setShowComment(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleLike = (e, id) => {
    axios
      .post(serverUrl + "/mylikes", { userId: user.uid, id })
      .then((result) => {
        setLike(!like);
        setFlag(!flag);
      });
  };

  const handleDelete = (e, uid, username) => {
    // console.log(pId);
    if (uid === user.uid) {
      axios
        .post(serverUrl + "/delete", { postId: deletePId })
        .then((result) => {
          // alert("Deleted");
          console.log(result);
          setDeleteModal(false);
          setFlag(!flag);
        });
    } else {
      alert("you can not delete other user's post");
    }
  };

  const handleUserProfile = (e, userName, userID) => {
    console.log(userName, userID);
    history.push("/profilepage/" + userName);
  };

  useEffect(() => {
    // console.log(user.uid);
    axios
      .post(`${serverUrl}/suggestion`, {
        userId: user?.uid,
      })
      .then((result) => {
        setSuggestion(result.data.data);
        // let random = Math.random();
        console.log(result);
        // console.log(suggestion);
      })
      .catch((err) => console.log(err));
  }, [user]);

  // const handleFollow = (e, postUserId) => {
  //   if (user)
  //     axios
  //       .post("http://localhost:8081/follow", {
  //         userId: user.uid,
  //         followerId: postUserId,
  //       })
  //       .then((result) => {
  //         // setFollowing(result.data.data);
  //         setFlag(!flag);
  //         console.log(result.data.data);
  //       })
  //       .catch((err) => console.log(err));
  // };

  // console.log();
  // useEffect(async () => {
  //   if (user) {
  //     // let ref = firebase
  //     //   .firestore()
  //     //   .collection("user")
  //     //   .doc(...allPost.map((post) => post.uid));
  //     // console.log(...allPost.map((post) => `"${post.uid}"` + ","));
  //     // let collections = await ref.get();
  //     // console.log(collections.data());

  // }, [user]);
  if (!user) {
    return <div>Simon! Go back.</div>;
  }

  // let username = user.displayName;

  let add = "Add your name";

  // const toggle = () => setIsOpen(!isOpen);

  const handleComment = (e, pId) => {
    axios
      .post(serverUrl + "/addcomment", {
        userId: user.uid,
        postId: pId,
        commentInput,
      })
      .then((result) => {
        setFlag(!flag);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteModal = (e, dpostid) => {
    setDeletePId(dpostid);
    // console.log(dpostid);
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleRetweet = (e, retweet, userUId, userName, postImg) => {
    // console.log(photoUrl);
    axios
      .post(serverUrl + "/retweet", {
        discription: retweet,
        userUId: userUId,
        username: userName,
        photoUrl: postImg,
      })
      .then((result) => {
        setFlag(!flag);
        console.log(result);
      });
  };

  // if (loading) {
  //   return <LinearProgress />;
  // }

  return (
    <div>
      <Sidebar openModal={openModal} setOpenModal={setOpenModal} />
      {/* <center>
        <h2 style={{ marginTop: "80px" }}>{`Welcome `}</h2>
      </center> */}
      {/* <div className="row">
        <div className="col-sm-10"> */}
      <div
        style={{
          marginTop: "100px",
          marginBottom: "100px",
          backgroundColor: "#d3eefd",
        }}
      >
        <div>
          <div style={{ height: "85vh", overflow: "scroll" }}>
            {allPost && allPost.length <= 0 && <LinearProgress />}
            {allPost && allPost.length > 0
              ? allPost.map((i, index) => {
                  return (
                    <div
                      key={i.id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "5px",
                        paddingBottom: "0px",
                      }}
                    >
                      <Card
                        className={classes.root}
                        style={{
                          width: "500px",
                          paddingBottom: "0px",
                          marginBottom: "15px",
                          backgroundColor: "#eaf1f5",
                          boxShadow: "1px 1px 10px #0077b6",
                        }}
                      >
                        <CardContent style={{ paddingBottom: "0px" }}>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          >
                            <h3
                              style={{
                                marginTop: "-5px",
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#03045e",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  onClick={(e) =>
                                    handleUserProfile(
                                      e,
                                      i.user.displayName,
                                      i.userId
                                    )
                                  }
                                  style={{
                                    display: "flex",
                                    cursor: "pointer",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    style={{ marginRight: "5px" }}
                                    src={
                                      i?.user?.photoURL ||
                                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                    }
                                  >
                                    {i?.user?.displayName
                                      ? i?.user?.displayName.charAt(0)
                                      : add.charAt(0)}
                                  </Avatar>
                                  @{i?.user?.displayName}
                                </div>
                                {/* {i.userId !== user.uid && (
                              <h3
                                style={{
                                  marginLeft: "15px",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => handleFollow(e, i.userId)}
                              >
                                {following &&
                                following.find(
                                  (fo, index) =>
                                    fo.followerId === user.uid &&
                                    fo.userId === i.userId
                                )
                                  ? "Following"
                                  : "Follow"}
                              </h3>
                            )} */}
                              </div>
                              {/* <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MoreVertIcon />
                          </IconButton> */}
                              {i.userId === user.uid && (
                                <div>
                                  <button
                                    className="close"
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      borderRadius: "100px",
                                      height: "25px",
                                      width: "25px",
                                      cursor: "pointer",
                                      // border: "0px",
                                    }}
                                    onClick={(e) => {
                                      // handleDelete(
                                      //   e,
                                      //   i.userId,
                                      //   i.id,
                                      //   i.username
                                      // );
                                      handleDeleteModal(e, i.id);
                                    }}
                                  >
                                    x
                                  </button>
                                  <Dialog
                                    open={deleteModal}
                                    onClose={handleCloseDeleteModal}
                                    PaperComponent={PaperComponent}
                                    aria-labelledby="draggable-dialog-title"
                                  >
                                    <DialogTitle
                                      style={{ cursor: "move" }}
                                      id="draggable-dialog-title"
                                    >
                                      Delete
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText>
                                        Are you sure you want to delete this
                                        post?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        autoFocus
                                        onClick={handleCloseDeleteModal}
                                        color="primary"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={(e) => {
                                          // console.log(i.id);
                                          handleDelete(
                                            e,
                                            i.userId,
                                            // i.id,
                                            i.username
                                          );
                                        }}
                                        color="secondary"
                                      >
                                        Delete
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                              )}
                            </h3>
                            <Divider
                              style={{
                                height: "1px",
                                backgroundColor: "black",
                              }}
                            />
                            <br />
                            <h3
                              style={{
                                marginTop: "-5px",
                                color: "#023e8a",
                                textAlign: "justify",
                              }}
                            >
                              {i.description}
                            </h3>
                            {i.postImg && (
                              <img
                                src={i.postImg}
                                alt=""
                                style={{
                                  maxWidth: "480px",
                                  maxHeight: "480px",
                                  marginLeft: "-5px",
                                }}
                              />
                            )}
                            <Divider
                              style={{
                                marginTop: "15px",
                                height: "1px",
                                backgroundColor: "black",
                              }}
                            />

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      // marginTop: "10px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <h5
                                      onClick={(e) =>
                                        handleLike(e, i.id, i.Liked)
                                      }
                                      style={{
                                        float: "left",
                                        cursor: "pointer",
                                        // paddingRight: "5px",
                                      }}
                                    >
                                      <Tooltip title="Like">
                                        <IconButton aria-label="Like">
                                          {likedPosts &&
                                          likedPosts.find(
                                            (item, index) =>
                                              item.postId === i.id
                                          ) ? (
                                            <FavoriteIcon
                                              style={{ color: "red" }}
                                            />
                                          ) : (
                                            <FavoriteBorderIcon />
                                          )}
                                        </IconButton>
                                      </Tooltip>
                                    </h5>

                                    {totalLike &&
                                      totalLike.find(
                                        (like, index) => like.postId === i.id
                                      )?.likesCount}
                                  </div>
                                  {i.userId !== user.uid ? (
                                    <div style={{ alignItems: "center" }}>
                                      <Tooltip title="Retweet">
                                        <IconButton
                                          aria-label="Retweet"
                                          // style={{ width: "500px" }}
                                        >
                                          <RepeatOutlinedIcon
                                            style={{
                                              // marginLeft: "5px",
                                              alignItems: "center",
                                              // marginTop: "5px",
                                              cursor: "pointer",
                                            }}
                                            onClick={(e) =>
                                              handleRetweet(
                                                e,
                                                i.description,
                                                user.uid,
                                                user.displayName,
                                                i.postImg
                                              )
                                            }
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  ) : null}

                                  <Collapsible
                                    open={i.id === postId}
                                    trigger={
                                      <i
                                        class="comment outline icon"
                                        style={{
                                          // marginLeft: "-200px",
                                          marginTop: "7px",
                                          fontSize: "larger",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) =>
                                          handleShowComment(e, i.id)
                                        }
                                      ></i>
                                    }
                                  >
                                    <div>
                                      {/* <form onSubmit={(e) => handleComment(e, i.id)}> */}
                                      <TextField
                                        type="text"
                                        name="comment"
                                        placeholder="Add Comment"
                                        style={{
                                          marginBottom: "15px",
                                          marginTop: "10px",
                                        }}
                                        onChange={(e) =>
                                          setCommentInput(e.target.value)
                                        }
                                      />
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        style={{
                                          marginLeft: "15px",
                                          marginTop: "10px",
                                        }}
                                        onClick={(e) => handleComment(e, i.id)}
                                      >
                                        Post
                                      </Button>
                                      {/* </form> */}
                                      <br />
                                      {showComment && showComment.length > 0 ? (
                                        showComment.map((comm, index) => {
                                          return (
                                            <div
                                              style={{
                                                display: "flex",
                                                marginBottom: "15px",
                                              }}
                                            >
                                              <Avatar
                                                src={comm.user.photoURL}
                                                style={{ marginRight: "15px" }}
                                              ></Avatar>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <h3
                                                  style={{
                                                    alignItems: "center",
                                                    fontWeight: "bold",
                                                    marginRight: "15px",
                                                  }}
                                                >
                                                  {comm.user.displayName}
                                                </h3>

                                                {/* <h4 style={{ display: "flex" }}> */}
                                                {comm.comment}
                                                {/* </h4> */}
                                              </div>
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <h3
                                          style={{
                                            marginBottom: "15px",
                                            diplay: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          Be the first to comment
                                        </h3>
                                      )}
                                    </div>
                                  </Collapsible>
                                </div>
                              </div>
                              <h5
                                style={{
                                  float: "right",
                                  marginTop: "11px",
                                  marginBottom: "11px",
                                  color: "#023e8a",
                                  // fontSize: "x-small",
                                  marginLeft: "-30px",
                                }}
                              >
                                {moment(`${i.createdAt}`).format(
                                  "ddd, DD MMM  LT"
                                )}
                              </h5>
                            </div>
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })
              : null}
          </div>
          <div
            style={{
              float: "right",
              fontSize: "20px",
              marginLeft: "10px",
              marginRight: "100px",
              // zIndex: "999",
              // top: "0px",
              marginTop: "-500px",
              position: "sticky",
            }}
          >
            <div>
              <div>
                <Card
                  style={{
                    display: "flex",
                    boxShadow: "3px 5px 20px #0077b6",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "350px",
                    height: "480px",
                    backgroundColor: "#eaf1f5",

                    // background:
                    //   "linear-gradient(to bottom, #99dbff 10%, #f6b4d5 90%)",
                  }}
                >
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      style={{ marginTop: "-210px", fontSize: "20px" }}
                    >
                      suggestion
                      <Divider
                        style={{
                          width: "330px",
                          marginTop: "15px",
                          height: "1px",
                          backgroundColor: "black",
                        }}
                      />
                    </Typography>
                    {suggestion && suggestion.length > 0
                      ? suggestion.map((sug, index) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "15px",
                              }}
                            >
                              <Avatar
                                src={sug.photoURL}
                                style={{
                                  marginLeft: "15px",
                                  marginRight: "15px",
                                }}
                              />
                              <h3
                                style={{
                                  marginTop: "15px",
                                  cursor: "pointer",
                                  color: "#03045E",
                                }}
                                onClick={(e) =>
                                  handleUserProfile(e, sug.displayName, sug.id)
                                }
                              >
                                @{sug.displayName}
                              </h3>
                              <Divider />
                            </div>
                          );
                        })
                      : "No suggestion"}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          {/* hijdsvk */}
        </div>
      </div>
      {/* </div>  */}
    </div>
  );
}

export default Dashboard;
