import axios from "axios";
import { useState, useEffect, useCallback } from "react";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

import { BASE_URL, BASE_QUERY } from "./fetching";

export interface SearchingProps {
  handleChange: any;
}

function useFetchNow() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const useFetchFirstData = async () => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}/movie/now_playing?${BASE_QUERY}&page=${page}`)
      .then((res) => {
        setItems(res.data.results);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    useFetchFirstData();
  }, []);

  const useFetchMoreData = useCallback(async () => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}/movie/now_playing?${BASE_QUERY}&page=${page}`)
      .then((response) => {
        const fetchedData = response.data.results;
        const mergedData = items.concat(...fetchedData);
        setItems(mergedData);
      });
    setPage(page + 1);
    setIsLoading(false);
  }, [page]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && isLoading == false) {
      useFetchMoreData();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  return {
    handleScroll,
    useFetchFirstData,
    useFetchMoreData,
    isLoading,
    items,
    page,
  };
}

export default useFetchNow;
