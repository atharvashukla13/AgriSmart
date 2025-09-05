import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useFarmers, useDashboardStats } from "../hooks/useApi";

function Farmers() {
  const {
    farmers,
    loading: farmersLoading,
    error: farmersError,
  } = useFarmers();

  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useDashboardStats();

  // 🔹 States for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 🔹 Memoized filtering
  const filteredFarmers = useMemo(() => {
    if (!farmers) return [];

    return farmers.filter((farmer) => {
      const matchesSearch =
        farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.village.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter
        ? farmer.status.toLowerCase() === statusFilter.toLowerCase()
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [farmers, searchQuery, statusFilter]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Farmer Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, Sagar Awasthi</span>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="material-icons text-green-600">person</span>
          </div>
        </div>
      </div>

      {/* 🔹 Search & Filter */}
      <div className="search-container">
        <label htmlFor="search" className="mr-2 text-[#4a944e] font-bold text-xl">
          Search farmers -
        </label>
        <input
          type="text"
          placeholder="Search farmers by name, phone, or village..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input mr-2 rounded-lg px-4 py-2 mb-3"
          id="search"
        />
        <select
          className="search-input mr-3 rounded-lg px-4 py-2"
          style={{ maxWidth: 300 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {statsLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            ) : (
              stats?.activeFarmers || 0
            )}
          </div>
          <div className="text-gray-600">Active Farmers</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {statsLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
            ) : (
              stats?.pendingUpdates || 0
            )}
          </div>
          <div className="text-gray-600">Pending Updates</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {statsLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            ) : (
              stats?.inactiveFarmers || 0
            )}
          </div>
          <div className="text-gray-600">Inactive Farmers</div>
        </div>
      </div>

      {/* 🔹 Farmers Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Registered Farmers</h2>
          <span className="text-gray-600">
            Total:{" "}
            {farmersLoading
              ? "Loading..."
              : `${filteredFarmers?.length || 0} farmers`}
          </span>
        </div>

        {farmersLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading farmers data...</p>
            </div>
          </div>
        ) : farmersError ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <span className="material-icons text-red-500 text-4xl mb-4">
                error
              </span>
              <p className="text-red-600 mb-2">Failed to load farmers data</p>
              <p className="text-gray-600 text-sm">{farmersError}</p>
            </div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Village</th>
                  <th>Field Size (acres)</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers && filteredFarmers.length > 0 ? (
                  filteredFarmers.map((farmer) => (
                    <tr key={farmer.id}>
                      <td>
                        <div className="font-medium">{farmer.name}</div>
                        <div className="text-sm text-gray-500">
                          ID: {farmer.id}
                        </div>
                      </td>
                      <td>{farmer.phone}</td>
                      <td>{farmer.village}</td>
                      <td>{farmer.size} acres</td>
                      <td>
                        {new Date(farmer.lastUpdated).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`status-badge status-${farmer.status}`}>
                          {farmer.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/farmers/${farmer.id}`}
                          className="btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No farmers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Farmers;
