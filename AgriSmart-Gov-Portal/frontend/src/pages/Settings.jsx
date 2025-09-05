import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "Sagar Awasthi",
    email: "sagar@agriculture.gov",
    employeeId: "AGRI-2023-001",
    department: "Agriculture Development",
    phone: "+91 9876543210",
    designation: "Senior Agriculture Supervisor"
  });
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const logoutFun=()=>{
    navigate("/login");
  }

  const handleProfileUpdate = () => {
    // In a real app, this would send data to the backend
    setIsProfileUpdated(true);
    setTimeout(() => setIsProfileUpdated(false), 3000);
  }

  const handlePhoneChange = (e) => {
    setProfileData({...profileData, phone: e.target.value});
  }

  useEffect(() => {
    // Apply saved settings on component mount
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const isHighContrast = localStorage.getItem("highContrast") === "true";
    const isLargeText = localStorage.getItem("largeText") === "true";
    
    if (isDarkMode) document.body.classList.add("dark-mode");
    if (isHighContrast) document.body.classList.add("high-contrast");
    if (isLargeText) document.body.classList.add("large-text");
    
    return () => {
      document.body.classList.remove("dark-mode");
      document.body.classList.remove("high-contrast");
      document.body.classList.remove("large-text");
    };
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, Sagar Awasthi</span>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="material-icons text-green-600">person</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-header">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="input-field"
              defaultValue="Sagar Awasthi"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              defaultValue="sharma@agriculture.gov"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="input-field"
              defaultValue="AGRI-2023-001"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="input-field"
              defaultValue="Agriculture Development"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="input-field"
              value={profileData.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className="input-field"
              defaultValue="Senior Agriculture Supervisor"
              disabled
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="btn-primary" onClick={handleProfileUpdate}>
            <span className="material-icons mr-2">save</span>
            Update Profile
          </button>
          {isProfileUpdated && (
            <span className="ml-4 text-green-600 font-medium">Profile updated successfully!</span>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="section-header">Region Assignment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">State</label>
            <select className="select-field">
              <option defaultValue>Haryana</option>
              <option>Punjab</option>
              <option>Uttar Pradesh</option>
              <option>Rajasthan</option>
              <option>Madhya Pradesh</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">District</label>
            <select className="select-field">
              <option defaultValue>Sonipat</option>
              <option>Rohtak</option>
              <option>Jhajjar</option>
              <option>Panipat</option>
              <option>Karnal</option>
              <option>Faridabad</option>
              <option>Gurgaon</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Zone</label>
            <select className="select-field">
              <option defaultValue>Northern Zone</option>
              <option>Southern Zone</option>
              <option>Eastern Zone</option>
              <option>Western Zone</option>
              <option>Central Zone</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Assigned Villages</label>
            <input
              type="text"
              className="input-field"
              defaultValue="25"
              disabled
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="btn-primary">
            <span className="material-icons mr-2">location_on</span>
            Save Region Settings
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="section-header">Appearance Settings</h2>
        <div className="toggle-container">
          <div className="toggle-info">
            <div className="toggle-label">Dark Mode</div>
            <div className="toggle-description">
              Switch between light and dark theme
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              id="darkModeToggle"
              onChange={(e) => {
                if (e.target.checked) {
                  document.body.classList.add("dark-mode");
                  localStorage.setItem("darkMode", "true");
                } else {
                  document.body.classList.remove("dark-mode");
                  localStorage.setItem("darkMode", "false");
                }
              }}
              defaultChecked={localStorage.getItem("darkMode") === "true"}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-container mt-4">
          <div className="toggle-info">
            <div className="toggle-label">High Contrast Mode</div>
            <div className="toggle-description">
              Enhanced visibility for better accessibility
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-container mt-4">
          <div className="toggle-info">
            <div className="toggle-label">Large Text</div>
            <div className="toggle-description">
              Increase text size for better readability
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="card">
        <h2 className="section-header">Notification Preferences</h2>
        <div className="toggle-container">
          <div className="toggle-info">
            <div className="toggle-label">Email Notifications</div>
            <div className="toggle-description">
              Receive alerts and reports via email
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-container mt-4">
          <div className="toggle-info">
            <div className="toggle-label">SMS Alerts</div>
            <div className="toggle-description">Critical alerts via SMS</div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="toggle-container mt-4">
          <div className="toggle-info">
            <div className="toggle-label">Push Notifications</div>
            <div className="toggle-description">
              Real-time updates on your device
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="card">
        <h2 className="section-header">Account Actions</h2>
        <div className="space-y-4">
          <button
            className="btn-primary  mr-4"
            style={{ backgroundColor: "var(--sky-blue)" }}
          >
            <span className="material-icons mr-2">vpn_key</span>
            Change Password
          </button>
          <button
            className="btn-primary mr-4"
            style={{ backgroundColor: "var(--brown)" }}
          >
            <span className="material-icons mr-2">download</span>
            Export Account Data
          </button>
          <button
            className="btn-primary mr-4"
            style={{ backgroundColor: "#ef4444" }}
            onClick={logoutFun}
          >
            <span className="material-icons mr-2">logout</span>
            Logout All Devices
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;
