package com.example.agrismart_final;


import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import android.os.Bundle;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;

public class CropHealthPage extends AppCompatActivity {


    private TextView resultText;
    int count=0;


    private FusedLocationProviderClient fusedLocationClient;
    private static final int LOCATION_REQUEST_CODE = 100;


    FirebaseAuth auth;
    String email="null",key="";
    private CardView current, btnPredict;
    ApiClient apiClient;
    ImageView img1,img2,img3;
    RelativeLayout relativeLayout2;
    RelativeLayout relativeLayout1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_crop_health_page);



        resultText = findViewById(R.id.info_text);
        EditText editText1=findViewById(R.id.et1);
        EditText editText2=findViewById(R.id.et2);

        img1=findViewById(R.id.image1);
         img2=findViewById(R.id.image2);
         img3=findViewById(R.id.image3);







        relativeLayout1=findViewById(R.id.rl1);
        relativeLayout2=findViewById(R.id.rl2);

        relativeLayout2.setVisibility(View.GONE);
        relativeLayout1.setVisibility(View.GONE);

        btnPredict = findViewById(R.id.cv1);

        current=findViewById(R.id.cv2);


        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);




        current.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {




                getCurrentLocation();





            }
        });




        apiClient = new ApiClient();

        auth=FirebaseAuth.getInstance();

        email=auth.getCurrentUser().getEmail().toString();

        key=email;
        int index=email.indexOf("@");
        email=email.substring(0,index);





        btnPredict.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                relativeLayout2.setVisibility(View.VISIBLE);

                String latitude=editText2.getText().toString();
                double lat=Double.parseDouble(latitude);
                String longitude=editText1.getText().toString();
                double lon=Double.parseDouble(longitude);


                apiClient.fetchPrediction(lat, lon, new ApiClient.ApiCallback() {

                    @Override
                    public void onSuccess(String coverageArea, String dataQuality, double ndviMean, double ndviStd,
                                          String region, String growthStage, double nitrogenLevel,
                                          String fert, String irrigation, String management) {



                        String result = "Coverage Area: " + coverageArea + " ha\n\n" +
                                "Data Quality: " + dataQuality + "\n\n" +
                                "NDVI Mean: " + ndviMean + "\n\n" +
                                "NDVI Std: " + ndviStd + "\n\n" +
                                "Region: " + region + "\n\n" +
                                "Growth Stage: " + growthStage + "\n\n" +
                                "Nitrogen Level: " + nitrogenLevel + "\n\n" +
                                "--Recommendation by AI Agent--\n\n"+
                                "Fertilizer: " + fert + "\n\n" +
                                "Irrigation: " + irrigation + "\n\n" +
                                "Management: " + management;

                        String k=System.currentTimeMillis()+"";
                        relativeLayout2.setVisibility(View.GONE);
                        relativeLayout1.setVisibility(View.VISIBLE);



                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("user").setValue(email);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("coverage").setValue(coverageArea);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("quality").setValue(dataQuality);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("ndvi_mean").setValue(ndviMean);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("ndvi_std").setValue(ndviStd);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("region").setValue(region);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("stage").setValue(growthStage);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("nlevel").setValue(nitrogenLevel);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("fertilizer").setValue(fert);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("irrigation").setValue(irrigation);
                        FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("management").setValue(management);


                        resultText.setText(result);
                    }

                    @Override
                    public void onError(String errorMessage) {
                        Log.d("error",errorMessage);
                        Toast.makeText(CropHealthPage.this, errorMessage, Toast.LENGTH_LONG).show();
                        relativeLayout2.setVisibility(View.GONE);

                    }
                });



            }
        });








        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }


    private void getCurrentLocation() {
        fusedLocationClient.getLastLocation()
                .addOnSuccessListener(location -> {
                    if (location != null) {
                        double lat = location.getLatitude();
                        double lon = location.getLongitude();

                        apiClient.fetchPrediction(lat, lon, new ApiClient.ApiCallback() {

                            @Override
                            public void onSuccess(String coverageArea, String dataQuality, double ndviMean, double ndviStd,
                                                  String region, String growthStage, double nitrogenLevel,
                                                  String fert, String irrigation, String management) {



                                String result = "Coverage Area: " + coverageArea + " ha\n\n" +
                                        "Data Quality: " + dataQuality + "\n\n" +
                                        "NDVI Mean: " + ndviMean + "\n\n" +
                                        "NDVI Std: " + ndviStd + "\n\n" +
                                        "Region: " + region + "\n\n" +
                                        "Growth Stage: " + growthStage + "\n\n" +
                                        "Nitrogen Level: " + nitrogenLevel + "\n\n" +
                                        "--Recommendation by AI Agent--\n\n"+
                                        "Fertilizer: " + fert + "\n\n" +
                                        "Irrigation: " + irrigation + "\n\n" +
                                        "Management: " + management;

                                String k=System.currentTimeMillis()+"";
                                relativeLayout2.setVisibility(View.GONE);
                                relativeLayout1.setVisibility(View.VISIBLE);

                               



                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("user").setValue(email);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("coverage").setValue(coverageArea);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("quality").setValue(dataQuality);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("ndvi_mean").setValue(ndviMean);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("ndvi_std").setValue(ndviStd);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("region").setValue(region);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("stage").setValue(growthStage);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("nlevel").setValue(nitrogenLevel);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("fertilizer").setValue(fert);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("irrigation").setValue(irrigation);
                                FirebaseDatabase.getInstance().getReference().child("crop_health").child(k).child("management").setValue(management);


                                resultText.setText(result);
                            }

                            @Override
                            public void onError(String errorMessage) {
                                Log.d("error",errorMessage);

                                Toast.makeText(CropHealthPage.this, errorMessage, Toast.LENGTH_LONG).show();
                                relativeLayout2.setVisibility(View.GONE);

                            }
                        });



                    } else {
                        Toast.makeText(this, "Location not found", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            getCurrentLocation();
        } else {
            Toast.makeText(this, "Location permission denied", Toast.LENGTH_SHORT).show();
        }
    }



}