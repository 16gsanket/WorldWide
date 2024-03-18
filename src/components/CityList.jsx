import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { City_C } from "../contexts/CitiesContext";

function CityList() {

  const {cities , IsLoading} = City_C();

  if (IsLoading) return <Spinner />;
  if (!cities.length) return <Message />;

  return (
    <>
      
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.cityName + city.country} />
        ))}
      </ul>
    </>
  );
}

export default CityList;
