package com.example.agrismart_final;

import android.content.ContentValues;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.ImageDecoder;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.io.OutputStream;

public class NDVIActivity extends AppCompatActivity {

    private static final int REQ_PICK_IMAGE = 101;

    private ImageView imageInput, imageNdvi, imageNdre, imageNutrient;
    private Button btnPick, btnGenerate, btnSave;
    private ProgressBar progress;

    private Bitmap inputBitmap, ndviBitmap, ndreBitmap, nutrientBitmap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ndviactivity);

        imageInput = findViewById(R.id.imageInput);
        imageNdvi = findViewById(R.id.imageNdvi);
        imageNdre = findViewById(R.id.imageNdre);
        imageNutrient = findViewById(R.id.imageNutrient);
        btnPick = findViewById(R.id.btnPick);
        btnGenerate = findViewById(R.id.btnGenerate);
        btnSave = findViewById(R.id.btnSave);
        progress = findViewById(R.id.progress);

        btnPick.setOnClickListener(v -> pickImage());

        btnGenerate.setOnClickListener(v -> {
            if (inputBitmap == null) {
                Toast.makeText(this, "Pick an image first", Toast.LENGTH_SHORT).show();
                return;
            }
            progress.setVisibility(android.view.View.VISIBLE);
            new Thread(() -> {
                ndviBitmap = computeIndex(inputBitmap, "NDVI");
                ndreBitmap = computeIndex(inputBitmap, "NDRE");
                nutrientBitmap = computeIndex(inputBitmap, "NUTRIENT");
                runOnUiThread(() -> {
                    progress.setVisibility(android.view.View.GONE);
                    imageNdvi.setImageBitmap(ndviBitmap);
                    imageNdre.setImageBitmap(ndreBitmap);
                    imageNutrient.setImageBitmap(nutrientBitmap);
                });
            }).start();
        });

        btnSave.setOnClickListener(v -> {
            if (ndviBitmap == null) {
                Toast.makeText(this, "Generate maps first", Toast.LENGTH_SHORT).show();
                return;
            }
            saveImage(ndviBitmap, "NDVI_" + System.currentTimeMillis() + ".png");
            saveImage(ndreBitmap, "NDRE_" + System.currentTimeMillis() + ".png");
            saveImage(nutrientBitmap, "Nutrient_" + System.currentTimeMillis() + ".png");
            Toast.makeText(this, "Saved all maps", Toast.LENGTH_SHORT).show();
        });
    }

    private void pickImage() {
        Intent i = new Intent(Intent.ACTION_GET_CONTENT);
        i.setType("image/*");
        startActivityForResult(Intent.createChooser(i, "Select image"), REQ_PICK_IMAGE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQ_PICK_IMAGE && resultCode == RESULT_OK && data != null) {
            Uri uri = data.getData();
            try {
                inputBitmap = decodeBitmap(uri);
                imageInput.setImageBitmap(inputBitmap);
            } catch (IOException e) {
                Toast.makeText(this, "Failed to load image", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private Bitmap decodeBitmap(Uri uri) throws IOException {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            ImageDecoder.Source src = ImageDecoder.createSource(getContentResolver(), uri);
            return ImageDecoder.decodeBitmap(src);
        } else {
            return BitmapFactory.decodeStream(getContentResolver().openInputStream(uri));
        }
    }

    /** Core logic for NDVI, NDRE, Nutrient map */
    private Bitmap computeIndex(Bitmap src, String type) {
        int w = src.getWidth();
        int h = src.getHeight();
        Bitmap in = src.copy(Bitmap.Config.ARGB_8888, false);
        Bitmap out = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);

        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                int px = in.getPixel(x, y);
                int r = Color.red(px);
                int g = Color.green(px);
                int b = Color.blue(px);

                double nir = g;   // Approximation
                double red = r;
                double redEdge = b;

                double value;
                if (type.equals("NDVI")) {
                    value = (nir - red) / (nir + red + 1e-6);
                } else if (type.equals("NDRE")) {
                    value = (nir - redEdge) / (nir + redEdge + 1e-6);
                } else { // Nutrient Map
                    value = (nir - red) / (nir + red + 1e-6); // like NDVI
                }

                // Normalize
                double t = (value + 1) / 2.0;
                t = Math.max(0, Math.min(1, t));

                int color;
                if (type.equals("NUTRIENT")) {
                    // Red-yellow-green
                    float[] hsv = new float[]{(float) ((1 - t) * 120), 1f, 1f};
                    color = Color.HSVToColor(hsv);
                } else {
                    // Green to Red colormap
                    float[] hsv = new float[]{(float) (t * 120), 1f, 1f};
                    color = Color.HSVToColor(hsv);
                }
                out.setPixel(x, y, color);
            }
        }
        return out;
    }

    private void saveImage(Bitmap bmp, String fileName) {
        try {
            ContentValues values = new ContentValues();
            values.put(MediaStore.Images.Media.DISPLAY_NAME, fileName);
            values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
            values.put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/AgriMaps");
            Uri uri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
            try (OutputStream os = getContentResolver().openOutputStream(uri)) {
                bmp.compress(Bitmap.CompressFormat.PNG, 100, os);
            }
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Failed to save image", Toast.LENGTH_SHORT).show();
        }
    }
}
