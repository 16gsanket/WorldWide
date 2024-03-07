import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList({ cities, IsLoading }) {
  if (IsLoading) return <Spinner />;
  if (!cities.length) return <Message />;

  return (
    <>
      {/* {console.log(cities)} */}
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.cityName + city.country} />
        ))}
      </ul>
    </>
  );
}

export default CityList;
