package com.example.agrismart_final;

import android.media.Image;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class SimulatorResultPage extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_simulator_result_page);

        ImageView imageView=findViewById(R.id.image_result);
        TextView wish=findViewById(R.id.wish);
        TextView wish2=findViewById(R.id.wish2);

        imageView.setImageResource(R.drawable.good_crop);
        double perAcre=getIntent().getDoubleExtra("yieldperacre",0.0);
        double total=getIntent().getDoubleExtra("totalyield",0.0);


        if (perAcre<9.36)
        {
            wish.setText("Sorry!");
            imageView.setImageResource(R.drawable.failed_crop);
        }
        wish2.setText("Ideal Yield Per Acre: 9.36-10.28 tons.\n\nYour Yield Per Acre: "+String.format("%.2f",perAcre)+" tons.\n\nYour Total Predicted Yield: "+String.format("%.2f",total)+" tons.");

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}