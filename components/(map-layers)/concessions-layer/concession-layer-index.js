import Map, { Marker, Layer, Source, useMap, Popup } from "react-map-gl";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import ConcessionHeatMap from "./concession-layer-heatmaps";

const ConcessionLayer = ({ data }) => {
    
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
              "circle-opacity":0.7
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
        <ConcessionHeatMap/>
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
 
export default ConcessionLayer;