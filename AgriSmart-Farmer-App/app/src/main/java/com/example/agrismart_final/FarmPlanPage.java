package com.example.agrismart_final;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import org.json.JSONArray;
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
import okhttp3.logging.HttpLoggingInterceptor;

public class FarmPlanPage extends AppCompatActivity {

    private EditText etPrompt;

    private ProgressBar progressBar;

    private CardView btnSend;
    private TextView tvResponse;

    // OpenRouter API endpoint
    private static final String API_URL = "https://openrouter.ai/api/v1/chat/completions";

    // 🔹 Replace with your OpenRouter API key
    private static final String API_KEY = "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";

    private OkHttpClient client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_farm_plan_page);

        progressBar=findViewById(R.id.loadingProgress);

        etPrompt = findViewById(R.id.etPrompt);
        btnSend = findViewById(R.id.btnSend);
        tvResponse = findViewById(R.id.tvResponse);

        // 🔹 Setup OkHttp client with logging
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor(message ->
                Log.d("HTTP_LOGS", message));
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        client = new OkHttpClient.Builder()
                .addInterceptor(logging)
                .build();

        btnSend.setOnClickListener(v -> {
            String prompt = etPrompt.getText().toString().trim();
            if (prompt.isEmpty()) {
                Toast.makeText(this, "Please enter budget/acre info", Toast.LENGTH_SHORT).show();
                return;
            }

            progressBar.setVisibility(View.VISIBLE);
            sendPromptToOpenRouter(prompt);
        });
    }

    private void sendPromptToOpenRouter(String prompt) {

        MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        JSONObject json = new JSONObject();
        try {
            json.put("model", "openai/gpt-oss-20b:free"); // <-- replace with your model slug
            JSONArray messages = new JSONArray();
            JSONObject userMsg = new JSONObject();
            userMsg.put("role", "user");
            userMsg.put("content", "Give a detailed potato crop plan for farmer with budget/acre in Rupees " + prompt +"Don't give any diagram and tables,don't use ** for headings, only give plan in paragraphs, start the plan with Hello Farmer," );
            messages.put(userMsg);
            json.put("messages", messages);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        RequestBody body = RequestBody.create(json.toString(), JSON);

        Request request = new Request.Builder()
                .url(API_URL)
                .post(body)
                .addHeader("Authorization", "Bearer " + API_KEY)
                .addHeader("Content-Type", "application/json")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                runOnUiThread(() -> tvResponse.setText("Error: " + e.getMessage()));
                Log.e("OpenRouter_Error", e.getMessage(), e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                runOnUiThread(() -> {
                    // Hide progress bar on main thread
                    progressBar.setVisibility(View.GONE);
                });

                if (!response.isSuccessful()) {
                    runOnUiThread(() -> tvResponse.setText("Error: " + response.message()));
                    return;
                }



                String responseData = response.body().string();
                Log.d("OpenRouter_Response", responseData);

                try {
                    JSONObject jsonResponse = new JSONObject(responseData);
                    JSONArray choices = jsonResponse.getJSONArray("choices");
                    JSONObject message = choices.getJSONObject(0).getJSONObject("message");
                    String result = message.getString("content");

                    int largest=result.lastIndexOf("Hello Farmer,");


                    if (largest!=-1) result=result.substring(largest);



                    // Make a final copy to use inside lambda
                    final String finalResult = result.trim();


                    runOnUiThread(() -> tvResponse.setText(finalResult.trim()));

                } catch (JSONException e) {
                    runOnUiThread(() -> tvResponse.setText("Parse error: " + responseData));
                }
            }
        });
    }
}
