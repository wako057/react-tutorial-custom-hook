import {useEffect, useState} from "react";
import {fetchUserPlaces} from "../http";

export function useFetch(fetchFn, initialValue) {
  const [ isFetching, setIsFetching ] = useState(false);
  const [ error, setError ] = useState();
  const [ fetchData, setFetchData ] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchData(data);
      } catch (error) {
        setError({message: error.message || 'Failed to fetch data.'})
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchData,
    setFetchData,
    error,
    setError
  };
}