import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();
const BASE_URL = "http://localhost:8000";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const id_current_city = 0

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  useEffect(function () {
    async function fetchcities() {
      try {
        setIsLoading(true);
        let res = await fetch(`${BASE_URL}/cities/`);
        let data = await res.json();

        setCities((citydata) => (citydata = data));
        // console.log(data);
      } catch (err) {
        console.log("error in fetching data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchcities();
  }, []);

  async function getCurrentCityData(id) {
    console.log("current id is ", id);
    try {
      setIsLoading(true);
      let res = await fetch(`${BASE_URL}/cities/${id.id}`);
      let data = await res.json();

      setCurrentCity(data);
      id_current_city = data.id;
    } catch (err) {
      console.log(
        "error in fetching data local city check if server is up and running"
      );
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities: cities,
        IsLoading: IsLoading,
        formatDate,
        getCurrentCityData,
        currentCity,
        id_current_city
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function City_C() {
  const City_Ctxt = useContext(CityContext);
  return City_Ctxt;
}

export { CityProvider, City_C };
