import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { useReports } from "../hooks/useApi";

const SAMPLE_DATA = [
  { position: [80.2707, 13.0827], weight: 1, city: "chennai" }, // Chennai
  { position: [76.9558, 11.0168], weight: 2, city: "coimbatore" }, // Coimbatore
  { position: [78.1198, 9.9252], weight: 4, city: "madurai" }, // Madurai
  { position: [78.7047, 10.7905], weight: 3, city: "trichy" }, // Trichy
  { position: [78.146, 11.6643], weight: 7, city: "salem" }, // Salem
  { position: [78.6569, 11.1271], weight: 1, city: "erode" }, // Erode
  { position: [79.84, 10.7656], weight: 1, city: "thanjavur" }, // Thanjavur
  { position: [79.1378, 10.79], weight: 8, city: "tirunelveli" }, // Tirunelveli
];

const COLOR_RANGE = [
  [255, 0, 0, 180], // red = poor (low weight)
  [255, 165, 0, 200], // orange = weak
  [255, 255, 0, 200], // yellow = medium
  [144, 238, 144, 220], // light green = good
  [0, 128, 0, 255], // dark green = healthy (high weight)
];

function CropHealthMap() {
  const { reports, loading, error } = useReports();
  console.log(reports.chennai);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Initialize map only once
useEffect(() => {
  if (!mapContainerRef.current) return;

  const map = new maplibregl.Map({
    container: mapContainerRef.current,
    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    center: [78.9629, 10.787],
    zoom: 6.5,
  });

  mapRef.current = map;

  return () => mapRef.current?.remove();
}, []);

useEffect(() => {
  if (!mapRef.current || loading) return;

  const overlay = new MapboxOverlay({
    layers: [
      new HeatmapLayer({
        id: "heatmap-layer",
        data: SAMPLE_DATA,
        getPosition: (d) => d.position,
        getWeight: (d) => (reports[d.city] ? reports[d.city] * 25 : 0),
        radiusPixels: 100,
        intensity: 2,
        threshold: 0.03,
        colorRange: COLOR_RANGE,
      }),
    ],
  });

  mapRef.current.addControl(overlay);
}, [reports, loading]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Crop Health Heatmap - Tamil Nadu
      </h1>
      <div
        ref={mapContainerRef}
        className="w-full h-[500px] rounded-lg"
        style={{ position: "relative" }}
      />
      {/* Legend */}
      <div className="mt-16 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <span className="text-sm text-gray-700">Poor</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 mr-2"></div>
          <span className="text-sm text-gray-700">Weak</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
          <span className="text-sm text-gray-700">Medium</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-300 mr-2"></div>
          <span className="text-sm text-gray-700">Good</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-700 mr-2"></div>
          <span className="text-sm text-gray-700">Healthy</span>
        </div>
      </div>
    </div>
  );
}

export default CropHealthMap;
