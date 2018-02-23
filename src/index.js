import React from "react";
import ReactDOM from "react-dom";
import "./config/fb-config.js";
import media from "./media";
import Game from "./gameComponent";
import "./index.css";

// firebase stuff is here for now
import firebase from "firebase";

const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child("images");

let images = media.map(item => {
  // console.log('itemURL', item.imgUrl );
  const imgRef = imagesRef.child(item.imgUrl);
  return imgRef.getDownloadURL();
});

Promise.all(images)
  .then(imgUrls => {
    // console.log("images?", imgUrls);
    media.forEach( (item, i) => {
      item.imgUrl = imgUrls[i]
    })
    // console.log("media", media)
    ReactDOM.render(<Game media={media} />, document.getElementById("root"));
  })
  .catch(function(error) {
    /*error handling*/
  });
