import { useNavigate, useParams } from "react-router";
import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";

function Map() {
  const navigate = useNavigate();
  // const x = useParams()

  const [searchParams, setsearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Hello World</h1>
      <p>
        Location lat {lat} , lng {lng}
      </p>

      <button
        onClick={() => {
          setsearchParams({ lat: 23, lng: 20 });
        }}
      >
        Change Location
      </button>

      {/* <h1>{x}</h1> */}
    </div>
  );
}

export default Map;
