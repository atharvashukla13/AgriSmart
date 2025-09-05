package com.example.agrismart_final;



import android.os.Handler;
import android.os.Looper;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ApiClient {

    private static final String BASE_URL = "http://10.63.152.182:5000"; // change to your Flask IP
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    private final OkHttpClient client = new OkHttpClient();

    // Callback interface to send results back
    public interface ApiCallback {
        void onSuccess(String coverageArea, String dataQuality, double ndviMean, double ndviStd,
                       String region, String growthStage, double nitrogenLevel,
                       String fert, String irrigation, String management);

        void onError(String errorMessage);
    }

    public void fetchPrediction(double lat, double lon, ApiCallback callback) {
        // Request body
        JSONObject json = new JSONObject();
        try {
            json.put("lat", lat);
            json.put("lon", lon);
        } catch (JSONException e) {
            callback.onError("JSON build error: " + e.getMessage());
            return;
        }

        RequestBody body = RequestBody.create(json.toString(), JSON);
        Request request = new Request.Builder()
                .url(BASE_URL + "/predict-gee")
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                new Handler(Looper.getMainLooper()).post(() ->
                        callback.onError("Network error: " + e.getMessage()));
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    new Handler(Looper.getMainLooper()).post(() ->
                            callback.onError("Server error: " + response.message()));
                    return;
                }

                String responseData = response.body().string();
                try {
                    JSONObject root = new JSONObject(responseData);

                    // Extract gee_summary
                    JSONObject geeSummary = root.getJSONObject("gee_summary");
                    String coverageArea = geeSummary.get("coverage_area_ha").toString();
                    String dataQuality = geeSummary.getString("data_quality");
                    double ndviMean = geeSummary.getDouble("ndvi_mean");
                    double ndviStd = geeSummary.getDouble("ndvi_std");
                    String region = geeSummary.getString("region");

                    // Extract predictions
                    JSONObject predictions = root.getJSONObject("predictions");
                    String growthStage = predictions.getString("growth_stage");
                    double nitrogenLevel = predictions.getDouble("nitrogen_level");

                    // Extract recommendations
                    JSONObject recommendations = root.getJSONObject("recommendations");
                    JSONObject recs = recommendations.getJSONObject("recommendations");
                    String fert = recs.getString("fertilizer");
                    String irrigation = recs.getString("irrigation");
                    String management = recs.getString("management");

                    // Return values on main thread
                    new Handler(Looper.getMainLooper()).post(() ->
                            callback.onSuccess(coverageArea, dataQuality, ndviMean, ndviStd,
                                    region, growthStage, nitrogenLevel,
                                    fert, irrigation, management));

                } catch (JSONException e) {
                    new Handler(Looper.getMainLooper()).post(() ->
                            callback.onError("JSON parse error: " + e.getMessage()));
                }
            }
        });
    }
}
