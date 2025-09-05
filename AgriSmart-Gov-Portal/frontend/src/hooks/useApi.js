import { useState, useEffect } from "react";
import apiService from "../services/api";

export const useFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getFarmers();
        setFarmers(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch farmers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  return { farmers, loading, error, refetch: () => window.location.reload() };
};

export const useReports = () => {
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getReports();
        setReports(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, loading, error, refetch: () => window.location.reload() };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error, refetch: () => window.location.reload() };
};
