import Places from './Places.jsx';
import {useState, useEffect} from "react";
import Error from "./Error";
import {sortPlacesByDistance} from "../loc";
import {fetchAvailablePlaces} from "../http";


export default function AvailablePlaces({ onSelectPlace }) {
  const [ availablePlaces, setAvailablePlaces ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const [error, setError ] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        setError({message: error.message || 'Could not fetch palces, please try again later.'});
        setIsFetching(false);
      }

    }

    fetchPlaces();
  }, []);


  if (error) {
    return (<Error title="An error occured" message={error.message} />);
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
