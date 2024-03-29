import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const CityContext = createContext();
const BASE_URL = "http://localhost:8000";

function reducer(state, action) {
  switch (action.type) {
    case "addcities":
      return { ...state, cities: action.payload };
    case "loadingon":
      return { ...state, IsLoading: !state.IsLoading };
    case "loadingoff":
      console.log("city list after loading is done ", state.cities);
      return { ...state, IsLoading: !state.IsLoading };
    case "setCurrentCity":
      return { ...state, currentCity: action.payload };
    case "createCity":
      return { ...state, cities: [...state.cities, action.payload] };
    case "deleteCity":
      return { ...state, cities: action.payload };
    default:
      return "not anyof the logic defined";
  }

  return {};
}
const initalState = { cities: [], IsLoading: false, currentCity: {} };

function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [IsLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [state, dispatch] = useReducer(reducer, initalState);

  const { cities, IsLoading, currentCity } = state;

  const id_current_city = 0;

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
        dispatch({ type: "loadingon" });
        let res = await fetch(`${BASE_URL}/cities/`);
        let data = await res.json();

        dispatch({ type: "addcities", payload: data });

        // setCities((citydata) => (citydata = data));
        // console.log(data);
      } catch (err) {
        console.log("error in fetching data");
      } finally {
        dispatch({ type: "loadingoff" });
      }
    }

    fetchcities();
  }, []);

  const getCurrentCityData = useCallback(async function getCurrentCityData(id) {
    try {
      dispatch({ type: "loadingon" });
      let res = await fetch(`${BASE_URL}/cities/${id.id}`);
      let data = await res.json();

      dispatch({ type: "setCurrentCity", payload: date });
      id_current_city = data.id;
    } catch (err) {
      console.log(
        "error in fetching data local city check if server is up and running"
      );
    } finally {
      dispatch({ type: "loadingoff" });
    }
  },[currentCity.id])

  async function createCity(newCity) {
    try {
      dispatch({ type: "loadingon" });
      let res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        "Content-Type": "application/json",
      });
      let data = await res.json();
      dispatch({ type: "createCity", payload: data });
    } catch (err) {
      console.log(
        "error in seding data local city check if server is up and running"
      );
    } finally {
      dispatch({ type: "loadingoff" });
    }
  }

  async function deleteCity(id) {
    console.log("inside the deleteCIty");
    try {
      dispatch({ type: "loadingon" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      const new_city_list = state.cities.filter((city) => city.id !== id);
      dispatch({ type: "deleteCity", payload: new_city_list });
    } catch (err) {
      console.log("error");
    } finally {
      dispatch({ type: "loadingoff" });
    }
  }

  function testFunction() {
    console.log("this is test function");
  }

  return (
    <CityContext.Provider
      value={{
        cities: cities,
        IsLoading: IsLoading,
        formatDate,
        getCurrentCityData,
        currentCity: currentCity,
        id_current_city,
        createCity,
        deleteCity,
        testFunction,
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
