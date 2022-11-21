import Map, { Marker,useMap } from "react-map-gl";
import { useRef} from "react";
import { MdOutlineMyLocation } from "react-icons/md";
const MiniMap = ({ mapboxAccessToken, parentViewState }) => {
  const { current: map } = useMap();
  const minimap = useRef(null);
  const { lng, lat } = map.getCenter();

  return (
    <>
      <Map
        id='minimap'
        ref={minimap}
        reuseMaps
        attributionControl={false}
        style={{
          width: "200px",
          height: "200px",
          position: "absolute",
          right: "1rem",
          bottom: "2rem",
          opacity: parentViewState.zoom < 8 ? " 0" : "1",
          transition: "opacity 1s ease-out",
          borderRadius: "9px",
        }}
        latitude={parentViewState.latitude}
        longitude={parentViewState.longitude}
        zoom={parentViewState.zoom - 4}
        className='w-full h-full'
        mapStyle='mapbox://styles/mapbox/dark-v10'
        mapboxAccessToken={mapboxAccessToken}
      >
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
          <MdOutlineMyLocation className=' text-maintext' size={20} />
        </Marker>
      </Map>
    </>
  );
};

export default MiniMap;
