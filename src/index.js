import React from "react";
import ReactDOM from "react-dom";
import "./config/fb-config.js";
import media from "./media";
import Container from "./containerComponent";
import "./index.css";

// firebase stuff is here for now
import firebase from "firebase";

const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child("images");
const audioRef = storageRef.child("sounds");

let images = media.map(item => {
  // console.log('itemURL', item.imgUrl );
  const imgRef = imagesRef.child(item.imgUrl);
  return imgRef.getDownloadURL();
});

let sounds = media.map(item => {
  const soundRef = audioRef.child(item.audioUrl);
  return soundRef.getDownloadURL();
});
// end firebase stuff

Promise.all(images)
.then(imgs => {
  media.forEach( (item, i) => {
    item.imgUrl = imgs[i]
  })
  return Promise.all(sounds)
})
.then( sounds => {
  media.forEach((item, i) => {
    item.audioUrl = sounds[i]
  })
  console.log(media)
  ReactDOM.render(<Container media={media} />, document.getElementById("root"));
})
.catch(function(error) {
    /*error handling*/
});
