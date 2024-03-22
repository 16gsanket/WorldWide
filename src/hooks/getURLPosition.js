import { useSearchParams } from "react-router-dom";

export function getURLPosition() {
  const [searchParams, setsearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];

  //new
}
