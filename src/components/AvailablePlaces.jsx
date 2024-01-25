import Places from './Places.jsx';
import Error from "./Error";
import {sortPlacesByDistance} from "../loc";
import {fetchAvailablePlaces} from "../http";
import {useFetch} from "../hooks/useFetch";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}
export default function AvailablePlaces({ onSelectPlace }) {

  const { isFetching, error, fetchData: availablePlaces, setFetchData: setAvailablePlaces } = useFetch(fetchSortedPlaces, []);

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
