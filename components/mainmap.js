import * as React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Map, { Marker, Layer, Source, useMap, Popup } from "react-map-gl";
import { TiArrowUpThick } from "react-icons/ti";
import MapControls from "./(map-components)/mapcontrols";
import useStore from "./(store)/store";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
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
  const onMove = useCallback(evt => {
    setViewState(evt.viewState)
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
          {concessionVisibiliy ? <ConcessionLayer data={allData} mapRef={mapRef.current} /> : null}

          <MapControls ZOOM_IN={ZOOM_IN} ZOOM_OUT={ZOOM_OUT} ROTATE_NORTH={ROTATE_NORTH} />
        </Map>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import useStore from "./(store)/store";
// //mapbox config//
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// mapboxgl.accessToken = "pk.eyJ1Ijoic2lydGl0aXNoIiwiYSI6ImNrbm9vYmZ6ZTEybzQydmt4NzVyaXYxNXAifQ.0PufbBNeILtvYD9NbXwJpQ";
// //mapbox config//

// function loadConcessions(map) {

// }

// const MainMap = () => {
//   const [pageIsMounted, setPageIsMounted] = useState(false);
//   const [Map, setMap] = useState();
//   const concessionVisibiliy = useStore((state) => state.concessionVisibiliy);

//   ////map init/////
//   useEffect(() => {
//     setPageIsMounted(true);

//     let map = new mapboxgl.Map({
//       container: "my-map",
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [-77.02, 38.887],
//       zoom: 5,
//       pitch: 0,
//     });

//     setMap(map);
//   }, []);
//   ////map init/////

//   useEffect(() => {
//     if (pageIsMounted) {
//       loadConcessions(Map,concessionVisibiliy);
//     }
//   }, [pageIsMounted,concessionVisibiliy]);

//   return (
//     <>
//       <div className=' w-full h-full'>
//         <div id='my-map' className=' h-screen' />
//       </div>
//     </>
//   );
// };

// export default MainMap;

// import React, { useRef, useEffect, useState } from "react";

// import MapControls from "./(map-components)/mapcontrols";

// import useStore from "./(store)/store";
// import geoJson from "./chicago-parks.json";

// //mapbox config//
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// mapboxgl.accessToken = "pk.eyJ1Ijoic2lydGl0aXNoIiwiYSI6ImNrbm9vYmZ6ZTEybzQydmt4NzVyaXYxNXAifQ.0PufbBNeILtvYD9NbXwJpQ";
// //mapbox config//
// const markers = [
//   {
//     city: "Sydney",
//     country: "Australia",
//     latCoord: -33.8688,
//     longCoord: 151.2093,
//   },
//   {
//     city: "Amsterdam",
//     country: "Netherlands",
//     latCoord: 52.3676,
//     longCoord: 4.9041,
//   },
//   {
//     city: "Seoul",
//     country: "South Korea",
//     latCoord: 37.5665,
//     longCoord: 126.978,
//   },
// ];

// const geojson = {
//   type: "Feature",
//   features: markers.map((marker) => ({
//     geometry: {
//       type: "Point",
//       coordinates: {
//         lat: marker.latCoord,
//         lng: marker.longCoord,
//       },
//     },
//   })),
// };

// const MainMap = () => {
//   const [lng, setLng] = useState(11.528325);
//   const [lat, setLat] = useState(-0.492455);
//   const [zoom, setZoomCustom] = useState(7.0);

//   const concessionVisibiliy = useStore((state) => state.concessionVisibiliy);

//   let zoomTest = zoom;

//   const OVERVIEW_DIFFERENCE = 5;
//   const OVERVIEW_MIN_ZOOM = 3;
//   const OVERVIEW_MAX_ZOOM = 19;

//   const mapContainer = useRef(null);
//   const map = useRef(null);

//   const mapOverviewContainer = useRef(null);
//   const mapOverview = useRef(null);

//   useEffect(() => {
//     let mounted = true;
//     if (mounted) {
//       buildMaps();
//     }
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   if (map.current !== null) {
//     map.current.on("zoom", () => {
//       zoomTest = map.current.getZoom();
//     });

//     map.current.on("load", () => {
//       geojson.features.forEach((marker) => {
//         // create a DOM element for the marker
//         const markerIcon = document.createElement("div");
//         markerIcon.className = "location-marker";
//         markerIcon.style.backgroundImage = "url(/location-marker.png)";
//         markerIcon.style.width = "10px";
//         markerIcon.style.height = "10px";

//         new mapboxgl.Marker(markerIcon).setLngLat(marker.geometry.coordinates).addTo(map.current);
//       });
//     });
//   }

//   const buildMaps = () => {
//     // BUILD PARENT MAP
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/sirtitish/clagwupge000a14uo8lvbw4ga",
//       center: [lng, lat],
//       zoom: zoom,
//       attributionControl: false,
//     });

//     // BUILD OVERVIEW MAP
//     if (zoomTest < 7) {
//       return null;
//     } else {
//       mapOverview.current = new mapboxgl.Map({
//         container: mapOverviewContainer.current,
//         style: "mapbox://styles/mapbox/dark-v10",
//         center: [lng, lat],
//         zoom: buildOverviewZoom(zoom),
//         interactive: false,
//         attributionControl: false,
//       });
//     }

//     // BUILD BOUNDS ON OVERVIEW MAP ON FIRST RENDER
//     mapOverview.current.on("load", () => {
//       buildOverviewBounds();
//     });

//     // SETUP BOUNDS ON OVERVIEW ON ANY MOVEMENT OF PARENT MAP
//     map.current.on("load", () => {
//       map.current.on("moveend", () => {
//         const mapCenter = map.current.getCenter();
//         const zoomAmount = map.current.getZoom().toFixed(2);
//         setZoomCustom(zoomAmount);
//         // zoomTest = zoomAmount
//         // RECENTER AND ZOOM OVERVIEW MAP
//         mapOverview.current.flyTo({
//           center: [mapCenter.lng.toFixed(3), mapCenter.lat.toFixed(3)],
//           zoom: buildOverviewZoom(zoomAmount),
//         });
//         buildOverviewBounds();
//       });
//     });
//   };

//   const buildOverviewZoom = (zoomAmount) => {
//     return Math.min(Math.max(zoomAmount - OVERVIEW_DIFFERENCE, OVERVIEW_MIN_ZOOM), OVERVIEW_MAX_ZOOM);
//   };

//   const buildOverviewBounds = () => {
//     // REMOVE OLD BOUNDS
//     if (mapOverview.current.getSource("parentOutline")) {
//       mapOverview.current.removeLayer("parentOutlineOutline");
//       mapOverview.current.removeLayer("parentOutlineFill");
//       mapOverview.current.removeSource("parentOutline");
//     }
//     if (map.current.getZoom().toFixed(2) > 5.25) {
//       let bounds = [];
//       const parentMapBounds = map.current.getBounds();
//       const ne = [parentMapBounds._ne.lng, parentMapBounds._ne.lat];
//       const se = [parentMapBounds._ne.lng, parentMapBounds._sw.lat];
//       const sw = [parentMapBounds._sw.lng, parentMapBounds._sw.lat];
//       const nw = [parentMapBounds._sw.lng, parentMapBounds._ne.lat];
//       bounds.push(ne, se, sw, nw, ne);
//       mapOverview.current.addSource("parentOutline", {
//         type: "geojson",
//         data: {
//           type: "Feature",
//           geometry: {
//             type: "Polygon",
//             coordinates: [bounds],
//           },
//         },
//       });

//       // Add a new layer to visualize the polygon.
//       mapOverview.current.addLayer({
//         id: "parentOutlineFill",
//         type: "fill",
//         source: "parentOutline", // reference the data source
//         layout: {},
//         paint: {
//           "fill-color": "#0080ff", // blue color fill
//           "fill-opacity": 0.3,
//         },
//       });

//       // Add an outline around the polygon.
//       mapOverview.current.addLayer({
//         id: "parentOutlineOutline",
//         type: "line",
//         source: "parentOutline",
//         layout: {},
//         paint: {
//           "line-color": "#0080ff",
//           "line-width": 1,
//         },
//       });
//     }
//   };

//   function ZOOM_IN() {
//     map.current.zoomIn(1);
//   }

//   function ZOOM_OUT() {
//     map.current.zoomOut(1);
//   }

//   function ROTATE_NORTH() {
//     map.current.rotateTo(0, { duration: 2000 });
//   }

//   return (
//     <div>
//       <div className='h-screen w-screen absolute' ref={mapContainer} />

//       <span
//         style={{
//           width: "200px",
//           height: "200px",
//           position: "absolute",
//           right: "1rem",
//           bottom: "2rem",
//           opacity: zoomTest < 8 ? " 0" : "1",
//           transition: "opacity 1s ease-out",
//           borderRadius: "9px",
//         }}
//         ref={mapOverviewContainer}
//       ></span>

//       {/* Map Controls */}
//       <MapControls ZOOM_IN={ZOOM_IN} ZOOM_OUT={ZOOM_OUT} ROTATE_NORTH={ROTATE_NORTH} />

//       {/* Map Controls */}
//     </div>
//   );
// };

// export default MainMap;
