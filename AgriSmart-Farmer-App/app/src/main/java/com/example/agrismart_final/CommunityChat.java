package com.example.agrismart_final;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import android.os.Bundle;
import android.view.View;
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


public class CommunityChat extends AppCompatActivity {


    TextView textView;
    RecyclerView recyclerView;
    EditText message;
    CardView send;
    ArrayList<String> sender,messages;
    FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_community_chat);

        textView=findViewById(R.id.community_title2);
        recyclerView=findViewById(R.id.community_chat_recycler);
        message=findViewById(R.id.message_box_community);

        sender=new ArrayList<>();
        messages=new ArrayList<>();

        auth=FirebaseAuth.getInstance();
        send=findViewById(R.id.send_cardview_community_chat);
        String title=getIntent().getStringExtra("community").toString();

        if (title.equals("MH"))
        {
            textView.setText("Maharashtra");

        }
        else if (title.equals("TN"))
        {
            textView.setText("Tamil Nadu");

        }
        else if (title.equals("UP"))
        {
            textView.setText("Uttar Pradesh");
        }
        else if (title.equals("K"))
        {
            textView.setText("Kerala");

        }
        else if (title.equals("KAR"))
        {
            textView.setText("Karnataka");
        }



        DatabaseReference databaseReference= FirebaseDatabase.getInstance().getReference("community_chat").child(title);

        ChatAdapter adapter=new ChatAdapter(sender,messages);
        recyclerView.setAdapter(adapter);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(this);
        recyclerView.setLayoutManager(linearLayoutManager);


        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                sender.clear();
                messages.clear();
                for (DataSnapshot dataSnapshot: snapshot.getChildren())
                {
                    String s=dataSnapshot.child("sender").getValue(String.class);
                    String m=dataSnapshot.child("message").getValue(String.class);
                    sender.add(s);
                    messages.add(m);
                }
                adapter.notifyDataSetChanged();

            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String message_text=message.getText().toString().trim();
                String sender_name=auth.getCurrentUser().getEmail().toString();
                int index=sender_name.indexOf("@");
                sender_name=sender_name.substring(0,index);
                String key=""+System.currentTimeMillis();
                FirebaseDatabase.getInstance().getReference("community_chat").child(title).child(key).child("sender").setValue(sender_name);
                FirebaseDatabase.getInstance().getReference("community_chat").child(title).child(key).child("message").setValue(message_text);
                message.setText("");
            }
        });



        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}