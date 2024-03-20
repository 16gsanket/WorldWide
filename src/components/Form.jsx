// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { getURLPosition } from "../hooks/getURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setemoji] = useState();
  const [geoCodingError, setGeoCodingError] = useState(false);

  const [lat, lng] = getURLPosition();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);

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

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng) return <Message message={"Start ByClicking somewhere on the map ☺️"} />;

  if (geoCodingError) return <Message message={"Click Some Where else ☺️"} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
