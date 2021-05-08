import { Avatar, Button, LinearProgress } from "@material-ui/core";
import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Sidebar from "../pages/Sidebar";
import { useHistory, useParams } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import globalContext from "../context/globalContext";
import moment from "moment";
import { Divider } from "@material-ui/core";
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
function MyPost({ openModal, setOpenModal, myPost, userNameParam }) {
  let history = useHistory();
  // eslint-disable-next-line
  const [anchorEl, setAnchorEl] = React.useState(null);
  // eslint-disable-next-line
  const open = Boolean(anchorEl);
  // eslint-disable-next-line
  const { userName } = useParams();

  const classes = useStyles();
  // eslint-disable-next-line
  const bull = <span className={classes.bullet}>•</span>;
  // const [flag, setFlag] = useState(false);
  // const [totalLike, setTotalLike] = useState();
  // const [likedPosts, setLikedPosts] = useState([]);
  const {
    user,
    like,
    setLike,
    totalLike,
    likedPosts,
    flag,
    setFlag,
    // allPost,
    // setLikedPosts,
    // setTotalLike,
    // proPicUrls,
  } = React.useContext(globalContext);

  const handleLike = (e, id) => {
    console.log(id);
    axios
      .post(serverUrl + "mylikes", { userId: user.uid, id })
      .then((result) => {
        setLike(!like);
        setFlag(!flag);
      });
  };

  const handleDelete = (e, postId) => {
    axios.post("http://localhost:8081/delete", { postId }).then((result) => {
      alert("Deleted");
      setFlag(!flag);
    });
  };

  const handleBack = (e) => {
    history.push("/Dashboard");
  };

  if (!user) {
    return <div>Simon! Go back.</div>;
  }

  return (
    <div>
      <Sidebar openModal={openModal} setOpenModal={setOpenModal} />
      <h2 style={{ marginTop: "100px" }}>Posts</h2>
      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        {myPost && myPost.length <= 0 && <LinearProgress />}

        {myPost && myPost.length > 0 ? (
          myPost.map((i, index) => {
            return (
              <>
                <div
                  key={i.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Card
                    className={classes.root}
                    style={{
                      width: "500px",
                      boxShadow: "5px 5px 15px black",
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
                            color: "#03045e",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              style={{ marginRight: "5px" }}
                              src={
                                i.user.photoURL ||
                                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                              }
                            ></Avatar>
                            @{i.user.displayName}
                          </div>
                          {userName === user.displayName ? (
                            <button
                              className="close"
                              style={{
                                borderRadius: "100px",
                                height: "25px",
                                width: "25px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                handleDelete(e, i.id);
                              }}
                            >
                              x
                            </button>
                          ) : null}
                          {/* )} */}
                        </h3>
                        <Divider
                          style={{ height: "1px", backgroundColor: "black" }}
                        />
                        <br />
                        <h3
                          style={{
                            marginTop: "-5px",
                            textAlign: "left",
                            color: "#023e8a",
                          }}
                        >
                          {i.description}
                        </h3>
                        {i.postImg && (
                          <img
                            src={i.postImg}
                            alt=""
                            style={{ maxWidth: "480px" }}
                          />
                        )}
                        <Divider
                          style={{ height: "1px", backgroundColor: "black" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <h5
                              onClick={(e) => handleLike(e, i.id, i.Liked)}
                              style={{
                                float: "left",
                                cursor: "pointer",
                                paddingRight: "5px",
                              }}
                            >
                              {likedPosts &&
                              likedPosts.find(
                                (item, index) => item.postId === i.id
                              ) ? (
                                <FavoriteIcon style={{ color: "red" }} />
                              ) : (
                                <FavoriteBorderIcon />
                              )}
                            </h5>

                            {totalLike &&
                              totalLike.find(
                                (like, index) => like.postId === i.id
                              )?.likesCount}
                          </div>
                          <h5
                            style={{
                              float: "right",
                              color: "#023e8a",
                              marginTop: "11px",
                              marginBottom: "11px",
                            }}
                          >
                            {moment(`${i.createdAt}`).format(
                              " ddd, DD MMM  LT"
                            )}
                          </h5>
                        </div>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </>
            );
          })
        ) : myPost.length <= 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Card
              className={classes.root}
              style={{
                //   display: "flex",
                //   justifyContent: "center",
                width: "300px",
                height: "200px",
                boxShadow: "5px 5px 15px black",
              }}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <h2
                    style={{
                      marginTop: "65px",
                      display: "flex",
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    No Post
                  </h2>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ) : (
          ""
        )}
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "30px", marginBottom: "20px" }}
          onClick={(e) => handleBack(e)}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default MyPost;
