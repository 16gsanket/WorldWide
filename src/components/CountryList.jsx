import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, IsLoading }) {
  if (IsLoading) return <Spinner />;
  if (!cities.length) return <Message />;

  const countries = cities.reduce((arr,city)=>{
    if(!arr.map((el)=>el.country).includes(city.country))
        return [...arr , {country:city.country , emoji:city.emoji}]
    else return arr;
  },[])

  console.log(countries)
  return (
    <>
      
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <CountryItem country={country} />
        ))}
      </ul>
    </>
  );
}

export default CountryList;