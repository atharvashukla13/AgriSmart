package com.example.agrismart_final;


import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link PestReportPage#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PestReportPage extends Fragment {


    Spinner spinnerPestType, spinnerDistrict;
    CardView btnSubmit;
    ImageView imagePest;

    String[] pestTypes = {
            "Select Pest",
            "Potato Tuber Moth",
            "Aphids",
            "Whiteflies",
            "Leafhoppers",
            "Cutworms",
            "Termites",
            "Flea Beetles",
            "Colorado Potato Beetle"
    };

    String chennai,coimbatore,madurai,trichy,salem,erode,tirunelveli,vellore,thanjavur;
    int chennai_int,coimbatore_int,madurai_int,trichy_int,salem_int,erode_int,tirunelveli_int,vellore_int,thanjavur_int;

    String[] districts = {
            "Select District", "Chennai", "Coimbatore", "Madurai", "Trichy",
            "Salem", "Erode", "Tirunelveli", "Vellore", "Thanjavur"
    };


    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public PestReportPage() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PestReportPage.
     */
    // TODO: Rename and change types and number of parameters
    public static PestReportPage newInstance(String param1, String param2) {
        PestReportPage fragment = new PestReportPage();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {








        DatabaseReference databaseReference1 = FirebaseDatabase.getInstance().getReference("reports").child("chennai");
        DatabaseReference databaseReference2 = FirebaseDatabase.getInstance().getReference("reports").child("coimbatore");
        DatabaseReference databaseReference3 = FirebaseDatabase.getInstance().getReference("reports").child("madurai");
        DatabaseReference databaseReference4 = FirebaseDatabase.getInstance().getReference("reports").child("trichy");
        DatabaseReference databaseReference5 = FirebaseDatabase.getInstance().getReference("reports").child("salem");
        DatabaseReference databaseReference6 = FirebaseDatabase.getInstance().getReference("reports").child("erode");
        DatabaseReference databaseReference7 = FirebaseDatabase.getInstance().getReference("reports").child("tirunelveli");
        DatabaseReference databaseReference8 = FirebaseDatabase.getInstance().getReference("reports").child("vellore");
        DatabaseReference databaseReference9 = FirebaseDatabase.getInstance().getReference("reports").child("thanjavur");


        databaseReference1.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    chennai=snapshot.getValue().toString();
                    chennai_int=Integer.parseInt(chennai);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        databaseReference2.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    coimbatore=snapshot.getValue().toString();
                    coimbatore_int=Integer.parseInt(coimbatore);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        databaseReference3.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    madurai=snapshot.getValue().toString();
                    madurai_int=Integer.parseInt(madurai);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        databaseReference4.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    trichy=snapshot.getValue().toString();
                    trichy_int=Integer.parseInt(trichy);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        databaseReference5.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    salem=snapshot.getValue().toString();
                    salem_int=Integer.parseInt(salem);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        databaseReference6.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    erode=snapshot.getValue().toString();
                    erode_int=Integer.parseInt(erode);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        databaseReference7.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    tirunelveli=snapshot.getValue().toString();
                    tirunelveli_int=Integer.parseInt(tirunelveli);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });



        databaseReference8.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    vellore=snapshot.getValue().toString();
                    vellore_int=Integer.parseInt(vellore);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        databaseReference9.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists())
                {
                    thanjavur=snapshot.getValue().toString();
                    thanjavur_int=Integer.parseInt(thanjavur);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });








        View view = inflater.inflate(R.layout.fragment_pest_report_page, container, false);

        // Initialize UI elements
        spinnerPestType = view.findViewById(R.id.spinnerPestType);
        spinnerDistrict = view.findViewById(R.id.spinnerDistrict);
        btnSubmit = view.findViewById(R.id.btnSubmit);
        imagePest = view.findViewById(R.id.imagePest);

        imagePest.setVisibility(View.GONE);

        // Pest Type Dropdown
        ArrayAdapter<String> pestAdapter = new ArrayAdapter<>(
                requireContext(),
                R.layout.spinner_item,
                pestTypes
        );

        pestAdapter.setDropDownViewResource(R.layout.spinner_dropdown_item);


        spinnerPestType.setAdapter(pestAdapter);

        // District Dropdown
        ArrayAdapter<String> districtAdapter = new ArrayAdapter<>(
                requireContext(),
                R.layout.spinner_item,
                districts
        );

        districtAdapter.setDropDownViewResource(R.layout.spinner_dropdown_item);




        spinnerDistrict.setAdapter(districtAdapter);

        spinnerPestType.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (position == 0) {
                    // User has not selected a pest
                    imagePest.setVisibility(View.GONE);
                } else {
                    switch (position) {
                        case 1: // Potato Tuber Moth
                            imagePest.setImageResource(R.drawable.pest1);
                            break;
                        case 2: // Aphids
                            imagePest.setImageResource(R.drawable.pest2);
                            break;
                        case 3: // Whiteflies
                            imagePest.setImageResource(R.drawable.pest3);
                            break;
                        case 4: // Jassids
                            imagePest.setImageResource(R.drawable.pest4);
                            break;
                        case 5: // Cutworms
                            imagePest.setImageResource(R.drawable.pest5);
                            break;
                        case 6: // Termites
                            imagePest.setImageResource(R.drawable.pest6);
                            break;
                        case 7: // Flea Beetles
                            imagePest.setImageResource(R.drawable.pest7);
                            break;
                        case 8: // Colorado Potato Beetle
                            imagePest.setImageResource(R.drawable.pest8);
                            break;
                    }
                    imagePest.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                imagePest.setVisibility(View.GONE);
            }
        });


        // Button click logic
        btnSubmit.setOnClickListener(v -> {
            String selectedPest = spinnerPestType.getSelectedItem().toString();
            String selectedDistrict = spinnerDistrict.getSelectedItem().toString();

            if (selectedPest.equals("Select Pest") || selectedDistrict.equals("Select District")) {
                Toast.makeText(requireContext(), "Please select pest and district", Toast.LENGTH_SHORT).show();
                return;
            }

            Toast.makeText(requireContext(),
                    "Pest: " + selectedPest + "\nDistrict: " + selectedDistrict,
                    Toast.LENGTH_LONG).show();

            String[] districts = {
                    "Select District", "Chennai", "Coimbatore", "Madurai", "Trichy",
                    "Salem", "Erode", "Tirunelveli", "Vellore", "Thanjavur"
            };


            if (selectedDistrict.equals("Chennai"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("chennai").setValue(chennai_int+1);


            } else if (selectedDistrict.equals("Coimbatore"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("coimbatore").setValue(coimbatore_int+1);


            } else if (selectedDistrict.equals("Madurai"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("madurai").setValue(madurai_int+1);


            } else if (selectedDistrict.equals("Trichy"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("trichy").setValue(trichy_int+1);


            } else if (selectedDistrict.equals("Salem"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("salem").setValue(salem_int+1);


            } else if (selectedDistrict.equals("Erode"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("erode").setValue(erode_int+1);


            } else if (selectedDistrict.equals("Tirunelveli"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("tirunelveli").setValue(tirunelveli_int+1);


            } else if (selectedDistrict.equals("Vellore"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("vellore").setValue(vellore_int+1);


            } else if (selectedDistrict.equals("Thanjavur"))
            {
                FirebaseDatabase.getInstance().getReference("reports").child("thanjavur").setValue(thanjavur_int+1);
            }




        });

        return view;



    }
}