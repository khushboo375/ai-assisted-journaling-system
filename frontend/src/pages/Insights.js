import { useEffect, useState } from "react";
import { getInsights } from "../services/api";
import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Insights() {

  const [data, setData] = useState(null);

  useEffect(() => {

  const fetchInsights = async () => {

    const res = await getInsights("123");

    console.log("INSIGHTS DATA:", res.data);

    setData(res.data);

  };

  fetchInsights();

}, []);

  useEffect(() => {

    const fetchInsights = async () => {

      try {

        const res = await getInsights("123");
        setData(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchInsights();

  }, []);

  if (!data) {

    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading Insights...
      </h2>
    );

  }


  const emotionCounts = {};

Object.entries(data.emotionDistribution || {}).forEach(([emotion, count]) => {

  const splitEmotions = emotion.split(",");

  splitEmotions.forEach(e => {

    const cleanEmotion = e.trim().toLowerCase();

    if (!emotionCounts[cleanEmotion]) {
      emotionCounts[cleanEmotion] = 0;
    }

    emotionCounts[cleanEmotion] += count;

  });

});

const emotionChart = {
  labels: Object.keys(emotionCounts),
  datasets: [
    {
      data: Object.values(emotionCounts),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4CAF50",
        "#9966FF",
        "#FF9F40"
      ]
    }
  ]
};


  const ambienceCounts = {
  forest: 0,
  rain: 0,
  cafe: 0
};

if (data.ambienceUsage) {

  data.ambienceUsage.forEach(a => {
    ambienceCounts[a.ambience] = a.count;
  });

}

const ambienceChart = {

  labels: ["Forest 🌲", "Rain 🌧", "Cafe ☕"],

  datasets: [
    {
      label: "Entries",

      data: [
        ambienceCounts.forest,
        ambienceCounts.rain,
        ambienceCounts.cafe
      ],

      backgroundColor: [
        "#4CAF50",
        "#2196F3",
        "#C49A6C"
      ],

      borderRadius: 8,

      barThickness: 60
    }
  ]

};

  const ambienceOptions = {

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false
    }
  },

  scales: {

    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    },

    x: {
      grid: {
        display: false
      }
    }

  }

};


  return (

    <div className="dashboard">

      <h1 className="dashboard-title">
        Your Insights
      </h1>


      <div className="dashboard-grid">

        {/* TOTAL ENTRIES */}

        <div className="card total-card">

          <h3>Total Entries</h3>

          <div className="entries-number">
            {data.totalEntries}
          </div>

        </div>


        {/* PIE CHART */}

        <div className="card chart-card">

          <h3>Mood Distribution</h3>

          <div className="chart-container">
            <Pie data={emotionChart} />
          </div>

        </div>


        {/* BAR CHART */}

        <div className="card chart-card full-width">

          <h3>Ambience Usage</h3>

          <div className="chart-container">
            <Bar data={ambienceChart} options={ambienceOptions} />
          </div>

        </div>


        {/* KEYWORDS */}

        <div className="card full-width">

          <h3>Top Keywords</h3>

          <div className="keyword-container">

            {data.recentKeywords.map((k, i) => (

              <span key={i} className="keyword-pill">
                {k}
              </span>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Insights;