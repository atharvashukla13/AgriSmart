export const farmers = [
  { id: "f1", name: "Amina Khan", region: "North Valley", size: 12.5 },
  { id: "f2", name: "Joseph Mwangi", region: "East Ridge", size: 8.2 },
  { id: "f3", name: "Ibrahim Musa", region: "River Plains", size: 15.0 },
];

export const alerts = [
  { id: "a1", title: "Low Soil Moisture", farmerId: "f2", date: "2025-08-20" },
  { id: "a2", title: "Pest Risk High", farmerId: "f1", date: "2025-08-18" },
];

export const reports = [
  { id: "r1", title: "Weekly NDVI Summary", date: "2025-08-22" },
  { id: "r2", title: "Nutrient Health Overview", date: "2025-08-15" },
];

export const farmerProfiles = {
  f1: {
    ndvi: [0.62, 0.58, 0.7, 0.66],
    nutrients: { N: "Optimal", P: "Low", K: "Optimal" },
  },
  f2: {
    ndvi: [0.45, 0.5, 0.48, 0.52],
    nutrients: { N: "Low", P: "Optimal", K: "Low" },
  },
  f3: {
    ndvi: [0.72, 0.68, 0.74, 0.76],
    nutrients: { N: "Optimal", P: "Optimal", K: "Optimal" },
  },
};

