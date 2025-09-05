package com.example.agrismart_final;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class AlertPage extends AppCompatActivity {


    TextView textView;
    RecyclerView recyclerView;
    EditText message;
    CardView send;
    ArrayList<String> title,type,description,region,time;
    FirebaseAuth auth;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_alert_page);



        recyclerView=findViewById(R.id.community_chat_recycler);

        title=new ArrayList<>();
        type=new ArrayList<>();
        description=new ArrayList<>();
        region=new ArrayList<>();
        time=new ArrayList<>();



        auth= FirebaseAuth.getInstance();

        DatabaseReference databaseReference= FirebaseDatabase.getInstance().getReference("alerts");







        AlertAdapter adapter=new AlertAdapter(title,description,region,type,time);
        recyclerView.setAdapter(adapter);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(this);
        recyclerView.setLayoutManager(linearLayoutManager);



        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                title.clear();
                description.clear();
                region.clear();
                type.clear();



                for (DataSnapshot dataSnapshot: snapshot.getChildren())
                {
                    String s=dataSnapshot.child("title").getValue(String.class);
                    String m=dataSnapshot.child("description").getValue(String.class);
                    String r=dataSnapshot.child("location").getValue(String.class);
                    String t=dataSnapshot.child("type").getValue(String.class);
                    String time_stamp=dataSnapshot.child("timestamp").getValue(String.class);

                    title.add(s);
                    description.add(m);
                    region.add(r);
                    type.add(t);
                    time.add(time_stamp);


                }
                adapter.notifyDataSetChanged();

            }



            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });












        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}