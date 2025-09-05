package com.example.agrismart_final;

import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class AlertAdapter extends RecyclerView.Adapter<AlertAdapter.ViewHolder> {

    ArrayList<String> sender, message,region,type,time;

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        CardView cv = (CardView) LayoutInflater.from(parent.getContext()).inflate(R.layout.alert_cardview, parent, false);


        return new ViewHolder(cv);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        CardView cv = holder.cardView;
        TextView title = cv.findViewById(R.id.card_text1);
        TextView mes = cv.findViewById(R.id.card_text2);
        title.setText(sender.get(position));

        mes.setText(message.get(position)+"\nregion: "+region.get(position)+"\n"+time.get(position));
        ImageView imageView=cv.findViewById(R.id.card_image1);
        String type_string = type.get(position).trim().toLowerCase();

        if (type_string.equals("rain")) {
            imageView.setImageResource(R.drawable.rain);
        } else if (type_string.equals("pest")) {
            imageView.setImageResource(R.drawable.pest);
        } else if (type_string.equals("irrigation")) {
            imageView.setImageResource(R.drawable.irrigation);
        } else if (type_string.equals("weather")) {
            imageView.setImageResource(R.drawable.weather);
        } else if (type_string.equals("nutrients")) {
            imageView.setImageResource(R.drawable.fertilizer);
        } else {
            imageView.setImageResource(R.drawable.good_crop);
        }



    }

    @Override
    public int getItemCount() {
        return message.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        CardView cardView;

        public ViewHolder(@NonNull CardView cv) {
            super(cv);
            this.cardView = cv;
        }
    }

    public AlertAdapter(ArrayList<String> s, ArrayList<String> m,ArrayList<String> r,ArrayList<String> t,ArrayList<String> time_stamp) {
        this.sender = s;
        this.message = m;
        this.region = r;
        this.type = t;
        this.time = time_stamp;

    }
}


