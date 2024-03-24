import { useParams } from "react-router";
import styles from "./City.module.css";
import { City_C } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
import { useEffect } from "react";
import Spinner from "./Spinner";

const BASE_URL = "http://localhost:8000";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const id = useParams();
  const id_of_city = id.id;
  console.log(id_of_city);
  console.log(typeof id_of_city);

  const { formatDate, getCurrentCityData, currentCity, IsLoading } = City_C();

  const { cityName, emoji, date, notes } = currentCity;

  useEffect(
    function () {
      getCurrentCityData(id);
    },
    [id, getCurrentCityData]
  );

  if (IsLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3>
          <span>{emoji}</span>

          {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {currentCity.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
