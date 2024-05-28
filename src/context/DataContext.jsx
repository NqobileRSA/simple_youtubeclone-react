import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { KEY } from "../../APIKEY";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const apiKey = KEY;
  const [data, setData] = useState([]); // Initialize as an empty array
  const [input, setinput] = useState("");
  const [value, setValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const searchInput = (e) => {
    setinput(e.target.value);
  };

  const handleSearch = () => {
    setIsClicked(true);
    setValue(input);
  };
  // executes on pageLoad
  useEffect(() => {
    setValue("latest");
    setIsLoading(true);
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&maxResults=10&key=${apiKey}`
      )
      .then((response) => {
        setData(response.data.items);
        setIsLoading(false);
        setIsClicked(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setIsClicked(false);
      });
  }, []);
  // Executes on every search
  useEffect(() => {
    if (apiKey === "") {
      alert("API key is not defined. Please provide a valid API key.");
      return;
    }
    if (isClicked === true) {
      setIsLoading(true);
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&maxResults=10&key=${apiKey}&pageToken=${
            currentPage > 1 ? data.nextPageToken : ""
          }`
        )
        .then((response) => {
          setData((prevData) => ({
            ...response.data,
            items: [...prevData.items, ...response.data.items],
          }));
          setIsLoading(false);
          setIsClicked(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
          setIsClicked(false);
        });
    }
  }, [value, currentPage]);
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        searchInput,
        handleSearch,
        value,
        handleLoadMore,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
