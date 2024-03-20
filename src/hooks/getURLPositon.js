export function getURLPosition(){
      
  const [searchParams, setsearchParams] = useSearchParams();
  const latLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  return [lat ,lng]
}