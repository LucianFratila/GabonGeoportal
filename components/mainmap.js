import React, { useRef, useEffect, useState } from "react";

import { TbMinus } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";
import { TiLocationArrow } from "react-icons/ti";
import {AiOutlineSearch} from "react-icons/ai"
import {TiArrowUpThick} from 'react-icons/ti'

//mapbox config//
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = "pk.eyJ1Ijoic2lydGl0aXNoIiwiYSI6ImNrbm9vYmZ6ZTEybzQydmt4NzVyaXYxNXAifQ.0PufbBNeILtvYD9NbXwJpQ";
//mapbox config//

const MainMap = () => {
  const [lng, setLng] = useState(11.528325);
  const [lat, setLat] = useState(-0.492455);
  const [zoom, setZoomCustom] = useState(7.0);
  const [getZoom, setGetZoom] = useState(zoom);
  const [pitchLevel,setPitchLevel] = useState(0)

  
  const OVERVIEW_DIFFERENCE = 5;
  const OVERVIEW_MIN_ZOOM = 3;
  const OVERVIEW_MAX_ZOOM = 19;

  const mapContainer = useRef(null);
  const map = useRef(null);

  const mapOverviewContainer = useRef(null);
  const mapOverview = useRef(null);
  
  useEffect(() => {
    buildMaps();
    
    map.current.on("zoom", () => {
      setGetZoom(map.current.getZoom());
      
    });
    map.current.on('pitch',()=>{const bearing = map.current.getBearing();
      setPitchLevel(bearing.toFixed(0));
    })
  }, []);


  const buildMaps = () => {
    // BUILD PARENT MAP
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/sirtitish/clagwupge000a14uo8lvbw4ga",
      center: [lng, lat],
      zoom:zoom,
      attributionControl: false,
    });

    
    // BUILD OVERVIEW MAP
    if (getZoom < 7) {
      return null;
    } else {
      mapOverview.current = new mapboxgl.Map({
        container: mapOverviewContainer.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [lng, lat],
        zoom: buildOverviewZoom(zoom),
        interactive: false,
        attributionControl: false,
      });
    }

    // BUILD BOUNDS ON OVERVIEW MAP ON FIRST RENDER
    mapOverview.current.on("load", () => {
      buildOverviewBounds();
    });

    // SETUP BOUNDS ON OVERVIEW ON ANY MOVEMENT OF PARENT MAP
    map.current.on("load", () => {
      map.current.on("moveend", () => {
        const mapCenter = map.current.getCenter();
        const zoomAmount = map.current.getZoom().toFixed(2);
        setZoomCustom(zoomAmount);
        // RECENTER AND ZOOM OVERVIEW MAP
        mapOverview.current.flyTo({
          center: [mapCenter.lng.toFixed(3), mapCenter.lat.toFixed(3)],
          zoom: buildOverviewZoom(zoomAmount),
        });
        buildOverviewBounds();
      });
    });
  };

  const buildOverviewZoom = (zoomAmount) => {
    return Math.min(Math.max(zoomAmount - OVERVIEW_DIFFERENCE, OVERVIEW_MIN_ZOOM), OVERVIEW_MAX_ZOOM);
  };

  const buildOverviewBounds = () => {
    // REMOVE OLD BOUNDS
    if (mapOverview.current.getSource("parentOutline")) {
      mapOverview.current.removeLayer("parentOutlineOutline");
      mapOverview.current.removeLayer("parentOutlineFill");
      mapOverview.current.removeSource("parentOutline");
    }
    if (map.current.getZoom().toFixed(2) > 5.25) {
      let bounds = [];
      const parentMapBounds = map.current.getBounds();
      const ne = [parentMapBounds._ne.lng, parentMapBounds._ne.lat];
      const se = [parentMapBounds._ne.lng, parentMapBounds._sw.lat];
      const sw = [parentMapBounds._sw.lng, parentMapBounds._sw.lat];
      const nw = [parentMapBounds._sw.lng, parentMapBounds._ne.lat];
      bounds.push(ne, se, sw, nw, ne);
      mapOverview.current.addSource("parentOutline", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [bounds],
          },
        },
      });

      // Add a new layer to visualize the polygon.
      mapOverview.current.addLayer({
        id: "parentOutlineFill",
        type: "fill",
        source: "parentOutline", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.3,
        },
      });

      // Add an outline around the polygon.
      mapOverview.current.addLayer({
        id: "parentOutlineOutline",
        type: "line",
        source: "parentOutline",
        layout: {},
        paint: {
          "line-color": "#0080ff",
          "line-width": 1,
        },
      });
    }
  };
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%", position: "absolute" }} ref={mapContainer} />
      <span
        style={{
          width: "200px",
          height: "200px",
          position: "absolute",
          right: "1rem",
          bottom: "2rem",
          opacity: getZoom < 8 ? " 0" : "1",
          transition: "opacity 1s ease-out",
          borderRadius: "9px",
        }}
        ref={mapOverviewContainer}
      ></span>
      <div className=' flex absolute z-90  right-[1rem] top-[18rem] '>
        <div className='flex flex-col' role='group'>
        <button onClick={()=>{map.current.zoomIn(1)}} 
          className=' bg-gray-800 p-1 my-3 rounded-md hover:bg-gray-600 text-maintext'>
            <AiOutlineSearch size={22} />
          </button>
          <button onClick={()=>{map.current.zoomIn(1)}} 
          className=' bg-gray-800 p-1 rounded-t-md hover:bg-gray-600 text-maintext'>
            <TbPlus size={22} />
          </button>
          <button onClick={()=>map.current.zoomOut(1)} className=' bg-gray-800 border-t border-b border-gray-200 p-1 hover:bg-gray-600 text-maintext '>
            <TbMinus size={22} />
          </button>
          <button onClick={()=>{map.current.rotateTo(0, {duration: 2000}); setPitchLevel(0)}} className=' bg-gray-800 p-1 rounded-b-md hover:bg-gray-600 text-maintext'>
            <TiArrowUpThick style={{transform: `rotate(${pitchLevel}deg)`, transitionDuration:'100ms'}}  size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMap;
