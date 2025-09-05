import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function TestMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    console.log("Initializing test map...");

    // Initialize MapLibre
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [78.9629, 10.787], // Center of Tamil Nadu
      zoom: 7,
    });
    mapRef.current = map;

    map.on("load", () => {
      console.log("Test map loaded successfully!");
    });

    map.on("error", (e) => {
      console.error("Test map error:", e);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Test Map - Tamil Nadu
      </h1>
      <div
        ref={mapContainerRef}
        className="w-full h-[500px] rounded-lg border-2 border-gray-300"
        style={{ position: "relative" }}
      />
      <p className="text-center text-gray-600 mt-4">
        If you can see the map above, MapLibre is working correctly.
      </p>
    </div>
  );
}

export default TestMap;
