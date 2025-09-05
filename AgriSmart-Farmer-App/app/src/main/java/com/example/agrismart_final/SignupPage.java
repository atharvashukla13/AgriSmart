package com.example.agrismart_final;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;

public class SignupPage extends AppCompatActivity {

    private FirebaseAuth mAuth;
    private EditText emailEditText, passwordEditText, nameEditText;
    private CardView signupButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_signup_page);

        mAuth = FirebaseAuth.getInstance();

        emailEditText = findViewById(R.id.et2);
        nameEditText=findViewById(R.id.et1);
        passwordEditText = findViewById(R.id.et3);
        signupButton = findViewById(R.id.cv1);

        signupButton.setOnClickListener(v -> {
            String email = emailEditText.getText().toString().toLowerCase().trim();
            String password = passwordEditText.getText().toString().trim();
            String fullname = nameEditText.getText().toString().trim();

            if (fullname.trim().equals(""))
            {
                Toast.makeText(this, "Please Enter Name", Toast.LENGTH_SHORT).show();
                return;
            }


            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(SignupPage.this, "Please enter email and password", Toast.LENGTH_SHORT).show();
                return;
            }

            createUser(email, password,fullname);
        });



        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    private void createUser(String email, String password,String fullname) {
        mAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(this, task -> {
                    if (task.isSuccessful()) {
                        // Signup success


                        int index=email.indexOf("@");

                        String email_name=email.substring(0,index);

                        FirebaseDatabase.getInstance().getReference("users").child(email_name).child("name").setValue(fullname);
                        FirebaseDatabase.getInstance().getReference("users").child(email_name).child("password").setValue(password);


                        Toast.makeText(SignupPage.this, "Signup successful", Toast.LENGTH_SHORT).show();
                        // Navigate to login or main activity
                    } else {
                        // Signup failed
                        Toast.makeText(SignupPage.this, "Signup failed: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
    }


}