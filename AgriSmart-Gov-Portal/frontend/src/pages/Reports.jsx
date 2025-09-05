import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import CropHealthMap from "./CropHealthMap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {
  const chartsRef = useRef([]); // ✅ Store all charts for export

  useEffect(() => {
    const charts = [];

    // ✅ Crop Stage Chart
    const cropStageCtx = document.getElementById("cropStageChart");
    if (cropStageCtx) {
      charts.push(
        new Chart(cropStageCtx.getContext("2d"), {
          type: "pie",
          data: {
            labels: ["Early Stage", "Vegetative", "Tuber Formation", "Late Stage"],
            datasets: [
              {
                label: "Crop Stage Distribution",
                data: [35, 28, 22, 15],
                backgroundColor: ["#98FF98", "#7ae07a", "#5ac25a", "#3da43d"],
              },
            ],
          },
        })
      );
    }

    // ✅ Forecasted Yield Chart
    const yieldCtx = document.getElementById("yieldChart");
    if (yieldCtx) {
      charts.push(
        new Chart(yieldCtx.getContext("2d"), {
          type: "line",
          data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
            datasets: [
              {
                label: "Forecasted Yield (ton/acre)",
                data: [8.2, 9.1, 10.3, 11.2, 11.8, 12.3, 12.5],
                borderColor: "#98FF98",
                backgroundColor: "rgba(152, 255, 152, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
              },
            ],
          },
        })
      );
    }

    // ✅ Regional Performance Chart
    const regionalCtx = document.getElementById("regionalChart");
    if (regionalCtx) {
      charts.push(
        new Chart(regionalCtx.getContext("2d"), {
          type: "bar",
          data: {
            labels: ["Sonipat", "Rohtak", "Jhajjar", "Panipat", "Karnal"],
            datasets: [
              {
                label: "Average Yield (ton/acre)",
                data: [12.5, 11.8, 13.2, 10.9, 12.1],
                backgroundColor: "#98FF98",
                borderRadius: 6,
              },
            ],
          },
        })
      );
    }

    // ✅ Growth Trend Chart
    const growthTrendCtx = document.getElementById("growthTrendChart");
    if (growthTrendCtx) {
      charts.push(
        new Chart(growthTrendCtx.getContext("2d"), {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "NDVI Index",
                data: [0.45, 0.52, 0.65, 0.72, 0.78, 0.82, 0.85, 0.88, 0.92, 0.85, 0.72, 0.58],
                borderColor: "#98FF98",
                backgroundColor: "rgba(152, 255, 152, 0.1)",
                borderWidth: 3,
                fill: true,
              },
            ],
          },
        })
      );
    }

    // ✅ Soil Health Chart
    const soilHealthCtx = document.getElementById("soilHealthChart");
    if (soilHealthCtx) {
      charts.push(
        new Chart(soilHealthCtx.getContext("2d"), {
          type: "bar",
          data: {
            labels: ["Nitrogen", "Phosphorus", "Potassium", "Organic Matter"],
            datasets: [
              {
                label: "Soil Health Index",
                data: [78, 65, 82, 71],
                backgroundColor: ["#98FF98", "#7ae07a", "#5ac25a", "#3da43d"],
                borderRadius: 6,
              },
            ],
          },
        })
      );
    }

    chartsRef.current = charts;
    return () => charts.forEach((c) => c.destroy());
  }, []);

  // ✅ Export PDF
  const handleExportPDF = async () => {
    const input = document.body;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Reports.pdf");
  };

  // ✅ Export Excel with Charts Data + Summary Stats
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    // ✅ 1. Add Summary Stats Sheet
    const summaryData = [
      ["Metric", "Value"],
      ["Avg Yield (ton/acre)", "12.5"],
      ["Field Health Index", "87%"],
      ["Nutrient Deficiency", "18%"],
      ["Avg NDVI", "0.72"],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Summary Stats");

    // ✅ 2. Add Each Chart Data as Separate Sheet
    chartsRef.current.forEach((chart) => {
      const sheetData = [];

      sheetData.push([chart.data.datasets[0].label]); // Title Row
      sheetData.push(["Label", "Value"]); // Header Row

      chart.data.labels.forEach((label, index) => {
        const value = chart.data.datasets[0].data[index];
        sheetData.push([label, value]);
      });

      const ws = XLSX.utils.aoa_to_sheet(sheetData);
      const sheetName = chart.canvas.id || "Chart";
      XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31)); // Max 31 chars
    });

    // ✅ Download the file
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Reports.xlsx");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        <div className="flex space-x-4">
          <button className="btn-export" onClick={handleExportPDF}>
            <span className="material-icons mr-2">picture_as_pdf</span>
            Export PDF
          </button>
          <button className="btn-export" style={{ backgroundColor: "var(--brown)" }} onClick={handleExportExcel}>
            <span className="material-icons mr-2">table_chart</span>
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="stat-card">
          <div className="text-3xl font-bold text-green-600 mb-2">12.5</div>
          <div className="text-gray-600">Avg Yield (ton/acre)</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
          <div className="text-gray-600">Field Health Index</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl font-bold text-red-600 mb-2">18%</div>
          <div className="text-gray-600">Nutrient Deficiency</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl font-bold text-purple-600 mb-2">0.72</div>
          <div className="text-gray-600">Avg NDVI</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            Crop Stage Distribution
          </h2>
          <div className="chart-container">
            <canvas id="cropStageChart"></canvas>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Forecasted Yield</h2>
          <div className="chart-container">
            <canvas id="yieldChart"></canvas>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Regional Performance Comparison
        </h2>
        <div className="chart-container">
          <canvas id="regionalChart"></canvas>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Seasonal Growth Trend</h2>
          <div className="chart-container">
            <canvas id="growthTrendChart"></canvas>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            Soil Health Distribution
          </h2>
          <div className="chart-container">
            <canvas id="soilHealthChart"></canvas>
          </div>
        </div>
      </div>

      {/* Crop Health Map */}
      <div className="mt-6">
        <CropHealthMap />
      </div>
    </>
  );
}

export default Reports;
