import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import * as d3 from "d3"; 
import '../css/lol.css'
import { useTheme } from "../components/Context/ThemeContext";
import html2canvas from "html2canvas";

function LolReport() {
    const { theme } = useTheme();
  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [heroTypeFilter, setHeroTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
    // Use effect para obtener los campeones del csv
  useEffect(() => {
    d3.csv("/assets/200125_LoL_champion_data.csv").then((data) => {
      setChampions(data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error loading the CSV file:", error);
    });
  }, []);

  const difficultyMap = {
    "Easy": 1,
    "Medium": 2,
    "Hard": 3
  };
// Use effect del barchart
  useEffect(() => {
    const filtered = champions.filter((champion) => {
      const difficultyMatch = difficultyFilter
        ? champion.difficulty == difficultyMap[difficultyFilter] 
        : true;
      const heroTypeMatch = heroTypeFilter
        ? champion.herotype.trim().toLowerCase() === heroTypeFilter.toLowerCase()
        : true;

      return difficultyMatch && heroTypeMatch;
    });
    setFilteredChampions(filtered);
  }, [difficultyFilter, heroTypeFilter, champions]);

  useEffect(() => {
    if (filteredChampions.length === 0) return;
  
    // Clear previous chart
    d3.select("#barChart").selectAll("*").remove();
  
    // Data processing: Count champions by role
    const roleCounts = d3.rollup(filteredChampions, v => v.length, d => d.role);
    const data = Array.from(roleCounts, ([role, count]) => ({ role, count }));
  
    const width = 500;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
  
    const svg = d3.select("#barChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    const x = d3.scaleBand()
      .domain(data.map(d => d.role))
      .range([margin.left, width - margin.right])
      .padding(0.2);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => x(d.role))
      .attr("y", d => y(d.count))
      .attr("height", d => y(0) - y(d.count))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue");
  
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [filteredChampions]);
  //Use effect the pieChart
  useEffect(() => {
    if (filteredChampions.length === 0) return;
  
    // Clear previous chart
    d3.select("#pieChart").selectAll("*").remove();
  
    // Data processing: Count champions by position
    const positionCounts = d3.rollup(filteredChampions, v => v.length, d => d.client_positions);
    const data = Array.from(positionCounts, ([position, count]) => ({ position, count }));
  
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
  
    const svg = d3.select("#pieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
  
    svg.selectAll("path")
      .data(pie(data))
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.position));
  }, [filteredChampions]);
  
  function generateReport() {
    if (filteredChampions.length === 0) {
        alert("No champions found for the selected filters!");
        return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("League of Legends Champions Report", 105, 20, { align: "center" });

    doc.setFontSize(18);
    doc.text(
        `Campeones filtrados por ${difficultyFilter || "All"} y ${heroTypeFilter || "All"}`,
        105,
        35,
        { align: "center" }
    );

    let yOffset = 50;

    // Define table structure
    const headers = ["Nº", "Campeón", "Rango", "Rol", "Dureza"];
    const columnWidths = [10, 50, 40, 60, 30];
    const rowHeight = 10;
    const startX = 10;
    let startY = yOffset;

    // Draw table headers
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, i) => {
        let xPos = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
        doc.text(header, xPos + 2, startY + 7);
        doc.rect(xPos, startY, columnWidths[i], rowHeight);
    });

    startY += rowHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Draw table rows
    filteredChampions.forEach((champion, index) => {
        // Ensure space for the row
        if (startY + rowHeight > 260) { 
            addFooter(doc);
            doc.addPage();
            startY = 20;

            // Redraw table headers
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            headers.forEach((header, i) => {
                let xPos = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
                doc.text(header, xPos + 2, startY + 7);
                doc.rect(xPos, startY, columnWidths[i], rowHeight);
            });
            startY += rowHeight;
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
        }

        const rowData = [
            index + 1,
            champion.apiname,
            champion.rangetype,
            champion.role,
            champion.toughness
        ];

        rowData.forEach((text, i) => {
            let xPos = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
            doc.text(String(text), xPos + 2, startY + 7);
            doc.rect(xPos, startY, columnWidths[i], rowHeight);
        });

        startY += rowHeight;
    });

    // Ensure enough space before adding the summary
    if (startY + 40 > 260) {
        addFooter(doc);
        doc.addPage();
        startY = 20;
    }

    // Add summary section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Resumen de Campeones", 70, startY+20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Este es un reporte con una tabla de campeones elegidos por dificultad y tipo`, 10, startY + 30);
    doc.text(`Total campeones: ${filteredChampions.length}`, 10, startY + 40);

    startY += 60;

    // Ensure space for charts
    if (startY + 100 > 260) {
        addFooter(doc);
        doc.addPage();
        startY = 20;
    }

    captureCharts(doc, startY);
}



  
  function addFooter(pdf) {
    pdf.setFontSize(10);
    pdf.text("Report of LOL Champs using jsPDF", 105, 290, { align: "center" });
  }
  
  function captureCharts(doc, yOffset) {
    const barChartElement = document.getElementById("barChart");
    const pieChartElement = document.getElementById("pieChart");
  
    html2canvas(barChartElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, yOffset, 100, 60); // Adjust width/height as needed
  
      html2canvas(pieChartElement, { scale: 2 }).then((canvas) => {
        const imgDataPie = canvas.toDataURL("image/png");
  
        // **Ensure Pie Chart is a Circle** ✅
        const imgWidth = 80;
        const imgHeight = 80; // Keep width & height equal for a circular image
  
        doc.addImage(imgDataPie, "PNG", 120, yOffset, imgWidth, imgHeight);
  
        addFooter(doc);
        doc.save("LoL_Champions_Report.pdf");
      });
    });
  }
  
  

  return (
    <div className={`ln ${theme}`}>
      <h1>League of Legends Champion Information</h1>
      <div>
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="heroType">Select Hero Type:</label>
        <select
          id="heroType"
          value={heroTypeFilter}
          onChange={(e) => setHeroTypeFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Tank">Tank</option>
          <option value="Assassin">Assassin</option>
          <option value="Fighter">Fighter</option>
          <option value="Mage">Mage</option>
          <option value="Marksman">Marksman</option>
          <option value="Support">Support</option>
        </select>
      </div>

      <button onClick={generateReport}>Generate PDF Report</button>

      {loading ? (
        <p>Loading champions...</p>
      ) : (
        <div>
          <h2>Filtered Champions</h2>
          {filteredChampions.length === 0 ? (
            <p>No champions match your filters.</p>
          ) : (
            <ul>
              {filteredChampions.map((champion, index) => (
                <li key={index}>
                  {champion.apiname} - {champion.difficulty} - {champion.herotype}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div id="charts-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <h2>Bar Chart: Champions by Role</h2>
        <div id="barChart" style={{ display: "flex", justifyContent: "center" }}></div>

        <h2>Pie Chart: Champions by Position</h2>
        <div id="pieChart" style={{ display: "flex", justifyContent: "center" }}></div>
      </div>
    </div>
  );
}

export default LolReport;
