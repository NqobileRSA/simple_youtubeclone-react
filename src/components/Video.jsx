import React, { useContext } from "react";
import { Card, Container, Image, Pagination } from "react-bootstrap";
import DataContext from "../context/DataContext";
import ThemeContext from "../context/ThemeContext";
import "../App.css";

const Video = () => {
  const { theme } = useContext(ThemeContext);
  const { data, currentPage, handlePageChange, totalResults } =
    useContext(DataContext);

  const render = data.map((element, index) => {
    return (
      <Card key={index} className={`text-bg-${theme} card`}>
        <iframe
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

  const lastPage = Math.ceil(totalResults / 10); // Calculate the last page number
  const visiblePageNumbers = 5; // Number of page numbers to show in the pagination
  const maxVisiblePages = Math.min(visiblePageNumbers, lastPage); // Ensure we don't exceed the total number of pages

  // Calculate the start and end page numbers for the visible range
  let startPage = Math.max(1, currentPage - Math.floor(visiblePageNumbers / 2));
  let endPage = Math.min(lastPage, startPage + visiblePageNumbers - 1);

  // Adjust the start page if the visible range is near the beginning or end
  if (endPage - startPage + 1 < visiblePageNumbers) {
    if (currentPage < visiblePageNumbers) {
      startPage = 1;
      endPage = Math.min(lastPage, visiblePageNumbers);
    } else {
      endPage = lastPage;
      startPage = endPage - visiblePageNumbers + 1;
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Render the start ellipsis if needed
    if (startPage > 1) {
      pageNumbers.push(
        <Pagination.Ellipsis
          linkClassName={`text-bg-${theme}`}
          key="start-ellipsis"
          disabled
        />
      );
    }

    // Render the visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          linkClassName={`text-bg-${theme}`}
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Render the end ellipsis if needed
    if (endPage < lastPage) {
      pageNumbers.push(
        <Pagination.Ellipsis
          linkClassName={`text-bg-${theme}`}
          key="end-ellipsis"
          disabled
        />
      );
    }

    return pageNumbers;
  };

  return (
    <div className={`text-bg-${theme}`}>
      <div className={`container-fluid text-bg-${theme} vid-wrap`}>
        {render}
      </div>
      <Pagination
        // size="lg"
        linkClassName={`text-bg-${theme}`}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "50px",
          marginTop: "20px",
        }}>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          linkClassName={`text-bg-${theme}`}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          linkClassName={`text-bg-${theme}`}
        />
        {renderPageNumbers()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          linkClassName={`text-bg-${theme}`}
        />
        <Pagination.Last
          onClick={() => handlePageChange(lastPage)}
          linkClassName={`text-bg-${theme}`}
        />
      </Pagination>
    </div>
  );
};

export default Video;
