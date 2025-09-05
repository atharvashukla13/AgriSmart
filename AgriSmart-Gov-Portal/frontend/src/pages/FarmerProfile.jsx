import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import apiService from "../services/api";

// To:
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebase";



function FarmerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cropHealth, setCropHealth] = useState(null);
  const [ndviMean, setNdviMean] = useState(0.78); // Default value
  const [ndviStd, setNdviStd] = useState(0.18); // Default value
  const [growthStage, setGrowthStage] = useState("Vegetative"); // Default value
  const [ndviData, setNdviData] = useState([0.45, 0.52, 0.58, 0.65, 0.72, 0.75, 0.78]); // Default values

  // Fetch farmer data
  useEffect(() => {
    const fetchFarmer = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getFarmer(id);
        setFarmer(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch farmer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmer();
  }, [id]);

  // Fetch crop health data from Firebase
  useEffect(() => {
    if (!id) return;

    const cropHealthRef = ref(database, 'crop_health');
    const unsubscribe = onValue(cropHealthRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.entries(data).filter(([_, val]) => val.user === id);
        if (entries.length > 0) {
          // Sort by key numerically ascending (more negative first, which is newer)
          entries.sort((a, b) => Number(a[0]) - Number(b[0])); // Newest first

          const latest = entries[0][1];
          setCropHealth(latest);
          
          // Update NDVI mean, std, and growth stage from latest
          if (latest['ndvi.mean']) setNdviMean(latest['ndvi.mean']);
          if (latest['ndvi.std']) setNdviStd(latest['ndvi.std']);
          if (latest.stage) setGrowthStage(latest.stage);
          
          // Build NDVI timeline (reverse to old to new)
          const timeline = entries.reverse().map(([_, val]) => val['ndvi.mean'] || 0);
          setNdviData(timeline);
        }
      }
    }, (err) => {
      console.error("Failed to fetch crop health data:", err);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const canvas = document.getElementById("growthChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Generate week labels based on the length of ndviData
    const weekLabels = ndviData.map((_, index) => `Week ${index + 1}`);
    
    const instance = new Chart(ctx, {
      type: "line",
      data: {
         labels: weekLabels,
     datasets: [
  {
    label: "NDVI Trend",
    data: ndviData,
    borderColor: "#4a944e",
    backgroundColor: "rgba(74, 148, 78, 0.1)",
    borderWidth: 3,
    fill: true,
    tension: 0.4,
  },
],

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            max: 1.0,
            grid: { color: "rgba(0, 0, 0, 0.1)" },
          },
          x: { grid: { color: "rgba(0, 0, 0, 0.1)" } },
        },
      },
    });
    return () => instance.destroy();
  }, [ndviData]); // Add ndviData as a dependency to update chart when data changes
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading farmer profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <span className="material-icons text-red-500 text-4xl mb-4">
            error
          </span>
          <p className="text-red-600 mb-2">Failed to load farmer profile</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <button
            onClick={() => navigate("/farmers")}
            className="mt-4 bg-[#4a944e] text-white px-4 py-2 rounded-lg"
          >
            Back to Farmers
          </button>
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <span className="material-icons text-gray-500 text-4xl mb-4">
            person_off
          </span>
          <p className="text-gray-600">Farmer not found</p>
          <button
            onClick={() => navigate("/farmers")}
            className="mt-4 bg-[#4a944e] text-white px-4 py-2 rounded-lg"
          >
            Back to Farmers
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/farmers")}
            className="bg-[#4a944e] text-white px-4 py-2 rounded-lg shadow-md 
                   hover:bg-[#3a7a3e] hover:shadow-lg 
                   active:scale-95 transition-all duration-200 flex items-center justify-center"
          >
            <span className="material-icons mr-2">arrow_back</span>Back to List
          </button>
          <h1 className="text-2xl font-bold">Farmer Profile: {farmer.name}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">ID: {farmer.id}</span>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="material-icons text-green-600">person</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-sm text-gray-600 mb-2">Contact</div>
          <div className="text-lg font-semibold">{farmer.phone}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-gray-600 mb-2">Village</div>
          <div className="text-lg font-semibold">{farmer.village}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-gray-600 mb-2">Field Size</div>
          <div className="text-lg font-semibold">{farmer.size} acres</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-gray-600 mb-2">Status</div>
          <div className="text-lg font-semibold text-green-600">
            {farmer.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Field Image</h2>
          <div className="map-placeholder">
            <img
              src="../../public/assets/potato.jpg"
              alt="Detailed satellite view"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Coordinates</div>
              <div className="font-semibold">28.98°N, 77.02°E</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Field Area</div>
              <div className="font-semibold">{farmer.size} acres</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            Crop Growth Timeline (NDVI)
          </h2>
          <div className="chart-container">
            <canvas id="growthChart"></canvas>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="text-sm text-gray-600">NDVI Mean</div>
              <div className="font-semibold text-green-600">{ndviMean.toFixed(2)}</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="text-sm text-gray-600">NVDI STD</div>
              <div className="font-semibold text-blue-600">{ndviStd.toFixed(2)}</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="text-sm text-gray-600">Growth Stage</div>
              <div className="font-semibold text-yellow-600">{growthStage}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recommendation History</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <div className="recommendation-item">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">
                    Potassium Fertilizer Application
                  </div>
                  <div className="text-sm text-gray-600">
                    Recommended: 25kg/acre of K₂O
                  </div>
                </div>
                <span className="text-xs text-gray-500">Today</span>
              </div>
              <div className="text-sm text-gray-600">
                Status: <span className="text-yellow-600">Pending</span>
              </div>
            </div>

            <div className="recommendation-item">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">Irrigation Schedule</div>
                  <div className="text-sm text-gray-600">
                    50mm water recommended
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="text-sm text-gray-600">
                Status: <span className="text-green-600">Completed</span>
              </div>
            </div>

            <div className="recommendation-item">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">Pest Control</div>
                  <div className="text-sm text-gray-600">
                    Apply neem oil spray
                  </div>
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
              <div className="text-sm text-gray-600">
                Status: <span className="text-green-600">Completed</span>
              </div>
            </div>

            <div className="recommendation-item">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">Soil Testing</div>
                  <div className="text-sm text-gray-600">
                    Comprehensive soil analysis
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 weeks ago</span>
              </div>
              <div className="text-sm text-gray-600">
                Status: <span className="text-green-600">Completed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Field Statistics</h2>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">0.78</div>
              <div className="text-sm text-gray-600">Current NDVI</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Crop Health</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">22°C</div>
              <div className="text-sm text-gray-600">Soil Temperature</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">65%</div>
              <div className="text-sm text-gray-600">Moisture Level</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button className="btn-primary">
          <span className="material-icons mr-2">add_alert</span>
          Create Alert
        </button>
        <button
          className="btn-primary"
          style={{ backgroundColor: "var(--sky-blue)" }}
        >
          <span className="material-icons mr-2">download</span>
          Export Report
        </button>
      </div>
    </>
  );
}

export default FarmerProfile;