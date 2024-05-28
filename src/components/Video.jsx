import React, { useContext, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import DataContext from "../context/DataContext";
import ThemeContext from "../context/ThemeContext";
import "../App.css";

const Video = () => {
  const { theme } = useContext(ThemeContext);
  const { data } = useContext(DataContext);

  const render = data.map((element) => {
    return (
      <Card className={`text-bg-${theme} card`}>
        <iframe
          // width="500px"
          height="200px"
          src={`https://www.youtube.com/embed/${element.id.videoId}`}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen></iframe>
        <Container className=" card-body">
          <div className="desciption-wrap">
            <div className="channelIcon">
              <Image
                src={element.snippet.thumbnails.high.url}
                roundedCircle
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div className="description">
              <h6 className="card-title">{element.snippet.title}</h6>
              <p className="card-text">{element.snippet.channelTitle}</p>
            </div>
          </div>
        </Container>
      </Card>
    );
  });
  return (
    <div className={`container-fluid text-bg-${theme} vid-wrap`}>{render}</div>
  );
};

export default Video;
