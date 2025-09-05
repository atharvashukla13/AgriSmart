// frontend/services/api.js
const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Farmers API
  async getFarmers() {
    return this.request("/farmers");
  }

  async getFarmer(id) {
    return this.request(`/farmers/${id}`);
  }

  // Reports API
  async getReports() {
    return this.request("/reports");
  }

  // Dashboard API
  async getDashboardStats() {
    return this.request("/dashboard/stats");
  }

  // Health check
  async healthCheck() {
    return this.request("/health");
  }

  // NEW: Crop Health from Firebase
  async getCropHealthFromFirebase(userKey) {
    try {
      // Import Firebase functions
      const { ref, get, child } = await import("firebase/database");
      const { database } = await import("../config/firebase");
      
      // Get crop health data for the specific user
      const cropHealthRef = ref(database, `crop_health`);
      const snapshot = await get(cropHealthRef);
      
      if (snapshot.exists()) {
        const allCropData = snapshot.val();
        
        // Find the crop health data for the specific user
        for (const [key, data] of Object.entries(allCropData)) {
          if (data.user === userKey) {
            return {
              ndvi_mean: data.ndvi_mean,
              ndvi_std: data.ndvi_std,
              growth_stage: data.stage,
              coverage: data.coverage,
              fertilizer: data.fertilizer,
              irrigation: data.irrigation,
              management: data.management,
              nlevel: data.nlevel,
              quality: data.quality,
              region: data.region,
              // Generate NDVI timeline data based on mean and std
              ndvi_timeline: this.generateNDVITimeline(data.ndvi_mean, data.ndvi_std)
            };
          }
        }
        
        console.warn(`No crop health data found for user: ${userKey}`);
        return null;
      } else {
        console.warn("No crop health data available in Firebase");
        return null;
      }
    } catch (error) {
      console.error("Error fetching crop health data from Firebase:", error);
      throw error;
    }
  }

  // Helper method to generate NDVI timeline data
  generateNDVITimeline(mean, std) {
    // Generate 7 weeks of NDVI data based on mean and std
    const weeks = 7;
    const timeline = [];
    
    for (let i = 0; i < weeks; i++) {
      // Simulate growth progression - start lower and approach the mean
      const progress = (i + 1) / weeks;
      const baseValue = mean * (0.6 + 0.4 * progress); //
      const variation = (Math.random() - 0.5) * std * 0.5;
      const value = Math.max(0.1, Math.min(1.0, baseValue + variation));
      
      timeline.push(parseFloat(value.toFixed(3)));
    }
    
    return timeline;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;