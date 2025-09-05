import CropHealthMap from "./CropHealthMap";

function Dashboard() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, Sagar Awasthi</span>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="material-icons text-green-600">person</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="stat-card hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_4px_rgba(132,204,22,0.7)]">
          <div className="text-3xl font-bold text-green-600 mb-2">1,248</div>
          <div className="text-gray-600">Farmers Registered</div>
          <div className="mt-2">
            <span className="material-icons text-green-500">people</span>
          </div>
        </div>
        <div className="stat-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.7)]">
          <div className="text-3xl font-bold text-blue-600 mb-2">87</div>
          <div className="text-gray-600">Reports Generated</div>
          <div className="mt-2">
            <span className="material-icons text-blue-500">description</span>
          </div>
        </div>
        <div className="stat-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_5px_rgba(239,68,68,0.7)]">
          <div className="text-3xl font-bold text-red-600 mb-2">12</div>
          <div className="text-gray-600">Active Alerts</div>
          <div className="mt-2">
            <span className="material-icons text-red-500">warning</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Field Growth Stages</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">35%</div>
              <div className="text-sm text-green-600">Early Stage</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">28%</div>
              <div className="text-sm text-blue-600">Vegetative</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">22%</div>
              <div className="text-sm text-yellow-600">Tuber Formation</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">15%</div>
              <div className="text-sm text-purple-600">Late Stage</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Nutrient Deficiency</h2>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-700">18%</div>
            <div className="text-sm text-red-600">
              Fields with Nutrient Deficiency
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">
          Average NDVI for the Region
        </h2>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">0.72</div>
          <div className="text-sm text-blue-600">Average NDVI</div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Crop Health Heatmap</h2>
        <CropHealthMap />
      </div>
    </>
  );
}

export default Dashboard;
