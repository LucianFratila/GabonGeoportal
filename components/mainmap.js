import * as React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Map from "react-map-gl";
import MapControls from "./(map-components)/mapcontrols";
import MiniMap from "./(map-components)/minimap";
import useStore from "./(store)/store";
import "mapbox-gl/dist/mapbox-gl.css";
import ConcessionLayer from "./(map-layers)/concessions-layer/concession-layer-index";
const MAPBOX_TOKEN = "pk.eyJ1Ijoic2lydGl0aXNoIiwiYSI6ImNrbm9vYmZ6ZTEybzQydmt4NzVyaXYxNXAifQ.0PufbBNeILtvYD9NbXwJpQ"; // Set your mapbox token here

export default function MainMap() {
  const mapRef = useRef(null);
  const [allData, setAllData] = useState(null);
  const concessionVisibiliy = useStore((state) => state.concessionVisibiliy);
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  function ZOOM_IN() {
    mapRef.current.zoomIn(1);
  }

  function ZOOM_OUT() {
    mapRef.current.zoomOut(1);
  }

  function ROTATE_NORTH() {
    mapRef.current.rotateTo(0, { duration: 2000 });
  }

  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson")
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);
  const onMove = useCallback((evt) => {
    setViewState(evt.viewState);
  }, []);

  return (
    <div>
      <Head>
        <title>Gabon Geoportal</title>
      </Head>

      <div className=' absolute w-full h-full'>
        <Map
          id='map'
          ref={mapRef}
          reuseMaps
          {...viewState}
          onMove={onMove}
          className='w-full h-full'
          mapStyle='mapbox://styles/sirtitish/clagwupge000a14uo8lvbw4ga'
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {viewState.zoom > 7 && <MiniMap parentViewState={viewState} mapboxAccessToken={MAPBOX_TOKEN} />}
          {concessionVisibiliy && <ConcessionLayer data={allData} mapRef={mapRef.current} />}
          <MapControls ZOOM_IN={ZOOM_IN} ZOOM_OUT={ZOOM_OUT} ROTATE_NORTH={ROTATE_NORTH} />
        </Map>
      </div>
    </div>
  );
}
