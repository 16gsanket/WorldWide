// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import { getURLPosition } from "../hooks/getURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { City_C } from "../contexts/CitiesContext";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = getURLPosition();
  const { createCity, isLoading } = City_C();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setemoji] = useState();
  const [geoCodingError, setGeoCodingError] = useState(false);

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCityData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError(false);

          let res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);

          let data = await res.json();

          if (!data.city) throw new Error("Click somewhere else on Map ☺️ ");

          setCityName(!data.city === "" ? data.city : data.locality);
          setCountry(data.countryName);
          setemoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodingError(true);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }

      getCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/pagelayout/cities");
  }

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Start ByClicking somewhere on the map ☺️"} />;

  if (geoCodingError) return <Message message={"Click Some Where else ☺️"} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add</Button>
        <BackButton />
        {/* <button>&larr; Back</button> */}
      </div>
    </form>
  );
}

export default Form;
