package com.example.agrismart_final;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class PrecipitationAdapter extends RecyclerView.Adapter<PrecipitationAdapter.ViewHolder> {

    private final List<TomorrowResponse.Interval> dailyList;

    public PrecipitationAdapter(List<TomorrowResponse.Interval> dailyList) {
        this.dailyList = dailyList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_precipitation, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        TomorrowResponse.Interval interval = dailyList.get(position);

        String date = formatDate(interval.startTime);
        String intensity = String.format(Locale.getDefault(), "%.2f mm/hr", interval.values.precipitationIntensity);
        String probability = String.format(Locale.getDefault(), "%.0f%%", interval.values.precipitationProbability);

        holder.dateText.setText(date);
        holder.intensityText.setText("Rainfall: " + intensity);
        holder.probabilityText.setText("Chance: " + probability);
    }

    @Override
    public int getItemCount() {
        return dailyList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView dateText, intensityText, probabilityText;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            dateText = itemView.findViewById(R.id.dateText);
            intensityText = itemView.findViewById(R.id.intensityText);
            probabilityText = itemView.findViewById(R.id.probabilityText);
        }
    }

    private String formatDate(String isoDate) {
        try {
            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault());
            Date date = inputFormat.parse(isoDate);
            SimpleDateFormat outputFormat = new SimpleDateFormat("EEEE, dd MMM", Locale.getDefault());
            return outputFormat.format(date);
        } catch (Exception e) {
            return isoDate;
        }
    }
}
