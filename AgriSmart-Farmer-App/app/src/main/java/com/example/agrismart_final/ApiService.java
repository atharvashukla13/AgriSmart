package com.example.agrismart_final;



import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

import java.util.Map;

public interface ApiService {

    @GET("/health")
    Call<ResponseBody> getHealth();

    @POST("/predict-gee")
    Call<ResponseBody> getNDVI(@Body Map<String, Double> body);
}

