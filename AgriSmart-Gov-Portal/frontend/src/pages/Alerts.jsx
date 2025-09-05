import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

// Firebase config (use your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCYKrvHUvyh6L5Y7bWxZqHuYGjwsNSCrZM",
  authDomain: "agrismartfinal.firebaseapp.com",
  databaseURL: "https://agrismartfinal-default-rtdb.firebaseio.com",
  projectId: "agrismartfinal",
  storageBucket: "agrismartfinal.firebasestorage.app",
  messagingSenderId: "583584318964",
  appId: "1:583584318964:web:16850b877ce782a54825a1",
  measurementId: "G-73FV7DC2P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("rain");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const today = new Date();
  const dateToday = today.toISOString().split("T")[0];

  // Fetch alerts in real-time
  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setAlerts(alertList.reverse()); // Show latest first
      } else {
        setAlerts([]);
      }
    });
  }, []);

  // Add new alert
  const addAlert = () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }
    const newAlertRef = push(ref(db, "alerts"));
    set(newAlertRef, {
      type,
      title,
      description,
      location,
      timestamp: dateToday,
      status: "Active" // Default status
    });
    setTitle("");
    setDescription("");
    setType("rain");
    setShowForm(false);
    setLocation("")
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, Sagar Awasthi</span>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="material-icons text-green-600">person</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-item">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {alerts.filter((a) => a.status === "Active").length}
          </div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>
        <div className="stat-item">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {alerts.length}
          </div>
          <div className="text-sm text-gray-600">Total Alerts</div>
        </div>
      </div>

      {/* Filters & Create Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="filter-bar">
          <button className="filter-btn active">All Alerts</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Weather</button>
          <button className="filter-btn">Pest</button>
          <button className="filter-btn">Irrigation</button>
        </div>
        <button
          className="create-alert-btn"
          onClick={() => setShowForm(true)}
        >
          <span className="material-icons mr-2">add_alert</span>
          Create New Alert
        </button>
      </div>

      {/* Alert Cards */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className={`alert-card ${alert.type}`}>
              <div className="flex items-start">
                <div className="alert-icon">
                  <span className="material-icons">
                    {alert.type === "rain" && "cloud_queue"}
                    {alert.type === "pest" && "bug_report"}
                    {alert.type === "irrigation" && "water_drop"}
                    {alert.type === "temperature" && "thermostat"}
                    {alert.type === "fertilizer" && "science"}
                    {alert.type === "normal" && "notifications"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{alert.title}</h3>
                      <p className="text-gray-600">{alert.description}</p>
                      <p className="text-gray-600">{alert.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="status-badge status-active">
                        {alert.status}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No alerts available</p>
        )}
      </div>

      {/* Modal for Create Alert */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Alert</h2>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 w-full mb-3"
            >
              <option value="rain">Rain</option>
              <option value="irrigation">Irrigation</option>
              <option value="pest">Pest</option>
              <option value="fertilizer">Fertilizer</option>
              <option value="temperature">Temperature</option>
              <option value="normal">Normal</option>
            </select>
            <input
              type="text"
              placeholder="Alert Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <textarea
              placeholder="Alert Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <input
              type="text"
              placeholder="Alert Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={addAlert}
              >
                Save Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Alerts;
