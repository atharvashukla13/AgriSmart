# AgriSmart: AI-Powered Potato Crop Growth & Nutrient Management

AgriSmart is a Python-based project that uses *Sentinel-2 satellite imagery* to analyze potato crop fields. It performs the following tasks:

1. Computes vegetation indices such as *NDVI* and *NDRE*.
2. Generates *RGB composite images*.
3. Classifies *growth stages* of potato crops.
4. Maps *nutrient health zones* to optimize fertilization and irrigation.



## Project Structure

```

AgriSmart/
│
├── notebooks/
│ ├── IMG_DATA/
│ │ ├── R10m/
│ │ ├── R20m/
│ │ └── R60m/
│ │
│ ├── outputs/
│ │ ├── Growth_Stages.png
│ │ ├── NDRE.png
│ │ ├── NDVI.png
│ │ └── RGB_composite.png
│ │
│ ├── 01_read_visualize.ipynb
│ ├── 02_compute_indices.ipynb
│ └── 03_growth_stage_classification.ipynb
│
├── src/
│ ├── read_band.py
│ ├── compute_indices.py
│ ├── classify_growth_stage.py
│ ├── nutrient_mapping.py
│ └── utils.py
│
└── environment.yml


```

## ⚙ Setup Instructions

1. *Clone the repository* (or download the folder):
   ```bash
   git clone <repository_url>
   cd AgriSmart
Create the conda environment:

bash
Copy code
conda env create -f environment.yml
conda activate s2env
Install additional packages (if needed):

bash
Copy code
pip install rasterio numpy matplotlib


## ⚙ Notebooks Overview

01_read_visualize.ipynb

Reads Sentinel-2 bands (.jp2 files).

Creates RGB composite images.

Saves output in notebooks/outputs/.

02_compute_indices.ipynb

Computes NDVI (Normalized Difference Vegetation Index).

Computes NDRE (Normalized Difference Red Edge Index).

Saves index maps as PNG.

03_growth_stage_classification.ipynb

Classifies potato crop growth stages using NDVI thresholds.

Generates color-coded growth stage maps (Early, Mid, Late).

## ⚙ Source Code (src/)

read_band.py – Functions to read and resample Sentinel-2 bands.

compute_indices.py – NDVI & NDRE computation.

classify_growth_stage.py – Growth stage classification and visualization.

nutrient_mapping.py – Map nutrient health zones using NDVI/NDRE.

utils.py – Helper functions for file handling and plotting.

## ⚙ Usage

Open the notebooks in Jupyter:
```

01_read_visualize.ipynb → generates RGB composite.

02_compute_indices.ipynb → generates NDVI & NDRE maps.

03_growth_stage_classification.ipynb → generates growth stage maps.

```

## ⚙ Output


RGB_composite.png – True color satellite view.

NDVI.png – Vegetation index map.

NDRE.png – Nutrient stress map.

Growth_Stages.png – Growth stage classification map.

## ⚙ Requirements
Python 3.10+

Conda environment (s2env)

Libraries: rasterio, numpy, matplotlib, scipy

Notes
Make sure all .jp2 files from Sentinel-2 are placed under notebooks/IMG_DATA/ in their respective resolutions (R10m, R20m, R60m).

Paths in notebooks are set relative to the notebooks/ directory.

License
This project is open-source and free to use for educational and research purposes.


---

