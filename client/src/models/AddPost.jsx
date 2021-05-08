import { Button, Modal, TextareaAutosize } from "@material-ui/core";
import React, { useContext, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import globalContext from "../context/globalContext";
import Backdrop from "@material-ui/core/Backdrop";
import firebase from "../firebase/config";
// import { post } from "../../../../server/db";

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
function AddPost({ openModal, setOpenModal }) {
  // let history = useHistory();

  const classes = useStyles();
  // eslint-disable-next-line
  const bull = <span className={classes.bullet}>•</span>;
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const { user, flag, setFlag } = useContext(globalContext);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "post") {
      if (e.target.value.length < 1000) setDescription(e.target.value);
      // setName(e.target.value);
    }
    // else {
    // }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const post = async () => {
    let ref;
    let snapshot;
    let photoUrl;
    let formData = new FormData();
    if (image) {
      ref = firebase.storage().ref().child(image?.name);

      snapshot = await ref.put(image);
      photoUrl = await snapshot.ref.getDownloadURL();
      formData.append("photoUrl", photoUrl);
      setImage(null);
    }
    console.log(snapshot);
    console.log(photoUrl);
    // } catch (err) {
    //   console.log(err);
    // }
    // let payload = {
    //   username: user.displayName,
    //   description: description,
    //   uid: user.uid,
    //   photoUrl: photoUrl,
    // };
    // console.log(payload);
    formData.append("username", user.displayName);
    formData.append("description", description);
    formData.append("uid", user.uid);
    axios
      .post("http://localhost:8081/Addpost", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((result) => {
        console.log("image and post both added");
        //   if(result.data.status==="post added"){
        // alert(result.data.status);
        setFlag(!flag);
        setOpenModal(false);
        // history.push("/Dashboard");
        //   }
      })
      .catch((error) => alert(error));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (image && description.length > 10) {
      console.log("clicked");
      post("discription", "photoUrl");
    }

    if (description.length < 1 && image) {
      post("photoUrl");
    }
    if (description.length > 10 && !image) {
      post("discription");
    }
    if (description.length < 1 && !image) {
      console.log("post can not be null");
      return alert("post can not be null");
    }
  };

  if (!user) {
    return <div>Simon! Go back.</div>;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      // closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div in={openModal}>
        {/* <Sidebar /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // marginTop: "70px",
            justifyContent: "center",
          }}
        >
          <Card
            className={classes.root}
            style={{
              //   display: "flex",
              //   justifyContent: "center",
              //   width: "350px",
              //   marginTop: "10px",
              boxShadow: "5px 5px 15px grey",
            }}
          >
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Add Post
              </Typography>

              <TextareaAutosize
                type="text"
                name="post"
                placeholder="enter description"
                // rowsMin={4}
                value={description}
                style={{
                  marginTop: "15px",
                  minHeight: "200px",
                  maxHeight: "500px",
                  minWidth: "350px",
                  overflow: "scroll",
                }}
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <input
                type="file"
                name="postImg"
                onChange={(e) => handleImage(e)}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "15px" }}
                onClick={(e) => handlePost(e)}
              >
                Post
              </Button>
              {/* </Typography> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </Modal>
  );
}

export default AddPost;
