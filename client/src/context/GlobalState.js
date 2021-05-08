import axios from "axios";
import React, { useState } from "react";
import globalContext from "./globalContext";

function GlobalState({ children }) {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [like, setLike] = useState(false);
  const [flag, setFlag] = useState(false);
  const [totalLike, setTotalLike] = useState();
  const [likedPosts, setLikedPosts] = useState([]);
  const [allPost, setAllPost] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [proPicUrls, setProPicUrls] = useState([]);
  const [following, setFollowing] = React.useState([]);
  const [follower, setFollower] = React.useState([]);
  const [commentInput, setCommentInput] = React.useState("");
  const [showComment, setShowComment] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .post("http://localhost:8081/Allpost", {
          userId: user.uid,
        })
        .then(async (result) => {
          setAllPost(result.data.data);
          console.log(result.data.data);
          setTotalLike(result.data.likes);
          setLikedPosts(result.data.likedPosts);
          console.log(result);
          setLoading(false);
          // const querySnapshot = await firebase
          //   .firestore()
          //   .collection("user")
          //   .where(firebase.firestore.FieldPath.documentId(), "in", [
          //     ...new Set(
          //       result.data.data.filter((p) => p.uid !== null).map((p) => p.uid)
          //     ),
          //   ])
          //   .get();
          // let docsss = querySnapshot.docs.map((doc) => {
          //   return {
          //     id: doc.id,
          //     photoURL: doc.data()?.photoURL,
          //   };
          // });
          // let postsss = result.data.data;
          // docsss.forEach((doc) => {
          //   postsss.forEach((post, idx) => {
          //     if (post.uid === doc.id) {
          //       postsss[idx] = { ...postsss[idx], photoURL: doc.photoURL };
          //     }
          //   });
          // });
          // setAllPost(postsss);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [flag, user]);

  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        like,
        setLike,
        flag,
        setFlag,
        totalLike,
        setTotalLike,
        likedPosts,
        setLikedPosts,
        allPost,
        setAllPost,
        proPicUrls,
        setFollower,
        follower,
        setFollowing,
        following,
        commentInput,
        setCommentInput,
        showComment,
        setShowComment,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default GlobalState;
