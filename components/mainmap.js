import * as React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Map, { Marker, Layer, Source, useMap, Popup } from "react-map-gl";
import { TiArrowUpThick } from "react-icons/ti";
import MapControls from "./(map-components)/mapcontrols";
import useStore from "./(store)/store";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

const MAPBOX_TOKEN = "pk.eyJ1Ijoic2lydGl0aXNoIiwiYSI6ImNrbm9vYmZ6ZTEybzQydmt4NzVyaXYxNXAifQ.0PufbBNeILtvYD9NbXwJpQ"; // Set your mapbox token here

const CustomMarkersComp = ({ data }) => {
  const { current: map } = useMap();
  const [popupPos, setPopupPos] = useState({ pos: null, show: false, data: null });
  let hoveredStateId = null;
  map.on("mousemove", "state-fills", (e) => {
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: false });
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: true });
    }
  });

  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource("earthquakes").getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;

      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom,
      });
    });
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.
  map.on("click", "unclustered-point", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const mag = e.features[0].properties.mag;
    const tsunami = e.features[0].properties.tsunami === 1 ? "yes" : "no";

    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    setPopupPos({ pos: coordinates, show: true, data: `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}` });
    // new mapboxgl.Popup().setLngLat(coordinates).setHTML(`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`);
    // .addTo(map);
  });
  if (popupPos.show) {
    map.on("click", () => {
      setPopupPos({ pos: null, show: false, data: null });
    });
  }

  // map.on('mouseenter', 'clusters', () => {
  // map.getCanvas().style.cursor = 'pointer';
  // });
  // map.on('mouseleave', 'clusters', () => {
  // map.getCanvas().style.cursor = '';
  // });

  map.on("load", () => {
    const layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style.
    let firstSymbolId;
    for (const layer of layers) {
      if (layer.type === "symbol") {
        firstSymbolId = layer.id;
        break;
      }
    }

    

    
  });
  const layers = map.getStyle().layers;
// Find the index of the first symbol layer in the map style.
let firstSymbolId;
for (const layer of layers) {
if (layer.type === 'symbol') {
firstSymbolId = layer.id;
break;
}
}


  const parkLayer = {
    id: "urban-areas-fill",
    type: "fill",
    source: "urban-areas",
    layout: {},
    paint: {
      "fill-color": "#f08",
      "fill-opacity": 0.4,
    },
  }

  return (
    <>
      {popupPos.show ? (
        <Popup
          longitude={popupPos.pos[0]}
          latitude={popupPos.pos[1]}
          anchor='bottom'
          onClose={() => {
            setPopupPos({ pos: null, show: false, data: null });
          }}
        >
          {popupPos.data}
        </Popup>
      ) : (
        ""
      )}
      <Source
        id='urban-areas'
        type='geojson'
        data={"https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson"}
      >
        <Layer {...parkLayer} beforeId={firstSymbolId} />
      </Source>
      <Source
        id='earthquakes'
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        type='geojson'
        data='https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      >
        <Layer
          id='clusters'
          type='circle'
          source='earthquakes'
          filter={["has", "point_count"]}
          paint={{
            "circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f28cb1"],
            "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
          }}
        />
        <Layer
          id='cluster-count'
          type='symbol'
          source='earthquakes'
          filter={["has", "point_count"]}
          layout={{
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          }}
        />
        <Layer
          id='unclustered-point'
          type='circle'
          source='earthquakes'
          filter={["!", ["has", "point_count"]]}
          paint={{
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          }}
        />
      </Source>
      {/* <Source id='states' type='geojson' data={data}>
        <Layer
          id='state-fills'
          type='fill'
          source='states'
          layout={{}}
          paint={{
            "fill-color": "#627BC1",
            "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.5],
          }}
        />
        <Layer
          id='state-borders'
          type='line'
          source='states'
          layout={{}}
          paint={{ "line-color": "#627BC1", "line-width": 2 }}
        />
      </Source> */}
      {/* <Source
        id='radar'
        type='image'
        url='https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif'
        coordinates={[
          [-80.425, 46.437],
          [-71.516, 46.437],
          [-71.516, 37.936],
          [-80.425, 37.936],
        ]}
      >
        <Layer
          id='radar-layer'
          type='raster'
          source='radar'
          paint={{
            "raster-fade-duration": 0,
          }}
        />
      </Source>
      <Source id='contours' type='geojson' data='https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'>
        <Layer
          id='earthquakes-layer'
          type='circle'
          source='earthquakes'
          paint={{
            "circle-radius": 4,
            "circle-stroke-width": 2,
            "circle-color": "red",
            "circle-stroke-color": "white",
          }}
        />
      </Source> */}
    </>
  );
};

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
          onMove={(evt) => setViewState(evt.viewState)}
          className='w-full h-full'
          mapStyle='mapbox://styles/sirtitish/clagwupge000a14uo8lvbw4ga'
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {concessionVisibiliy ? <CustomMarkersComp data={allData} mapRef={mapRef.current} /> : null}

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
