import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { KEY } from "../../APIKEY";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const apiKey = KEY;
  const [data, setData] = useState([]);
  const [input, setinput] = useState("");
  const [value, setValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const searchInput = (e) => {
    setinput(e.target.value);
  };

  const handleSearch = () => {
    setIsClicked(true);
    setValue(input);
  };

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const fetchLatestVideos = (pageNumber = 1) => {
    setIsLoading(true);
    const startIndex = (pageNumber - 1) * 10;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=latest&maxResults=10&key=${apiKey}&startIndex=${startIndex}`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data.items);
        setNextPageToken(response.data.nextPageToken || null);
        setTotalResults(response.data.pageInfo.totalResults);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isClicked) {
      setIsLoading(true);
      const startIndex = (currentPage - 1) * 10;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&maxResults=10&key=${apiKey}&startIndex=${startIndex}`;

      axios
        .get(url)
        .then((response) => {
          setData(response.data.items);
          setNextPageToken(response.data.nextPageToken || null);
          setTotalResults(response.data.pageInfo.totalResults);
          setIsLoading(false);
          setIsClicked(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
          setIsClicked(false);
        });
    }
  }, [value, isClicked, currentPage]);

  const fetchNextPage = () => {
    if (nextPageToken) {
      fetchLatestVideos(nextPageToken);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchLatestVideos(pageNumber); // Call fetchLatestVideos with the new page number
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        searchInput,
        handleSearch,
        value,
        fetchNextPage,
        currentPage,
        handlePageChange,
        totalResults,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
