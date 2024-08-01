"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  //video path
  let videosrc = "/videos/next.mp4";

  return (
    <div>
      <h1></h1>
      <ReactPlayer
        width="90%"
        height="90%"
        url="/versus-tut.mp4"
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
      <source src="versus-tut.mp4" type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;