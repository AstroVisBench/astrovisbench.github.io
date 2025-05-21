import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { MultiSelect } from 'primereact/multiselect';
// import 'primereact/resources/themes/saga-purple/theme.css';  // Theme
// import 'primereact/resources/primereact.min.css';                // Core CSS
// import 'primeicons/primeicons.css';   
//import './styles.css'                           // Icons

import LeaderboardTable from './LeaderboardTable.jsx';
// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [models, setmodels] = useState([]);
  const [selectedmodels, setSelectedmodels] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  
  const [sorting, setSorting] = useState([]);

  const defaultMets = [
    'Processing No Error %',
    'Visualization No Error %',
    'CorrectV %',
  ]
  // Fetch data on mount
  useEffect(() => {
    fetch('/leaderboard.json')
      .then(res => res.json())
      .then((json) => {
        setData(json);
        const uniquemodels = Array.from(new Set(json.map(item => item.Model)));
        const modelOptions = uniquemodels.map(subj => ({ label: subj, value: subj }));
        const uniqueMetrics = Array.from(new Set(Object.keys(json[0]).filter(item => item != "Model")));
        const metricOptions = uniqueMetrics.map(subj => ({ label: subj, value: subj }));
        //console.log(Object.keys(json).filter(item => item != "Model"));
        const defaultMetSelect = uniqueMetrics.filter(item => defaultMets.includes(item));
        setmodels(modelOptions);
        setSelectedmodels(uniquemodels); // Select all by default
        setMetrics(metricOptions);
        setSelectedMetrics(defaultMetSelect);
      });
  }, []);


  // Filter data for selected models
  const filteredData = data.filter(item => selectedmodels.includes(item.Model));

  const dataset_colors = {
    "Processing No Error %": 'rgba(59, 130, 246, 0.6)',
    "VIscore": 'rgba(165, 59, 246, 0.6)',
    "Visualization No Error %": 'rgba(17, 227, 246, 0.6)',
    "VisFail %": 'rgba(231, 187, 216, 0.6)',
    "CorrectV %": 'rgba(24, 242, 122, 0.6)',
    "MiE %": 'rgba(236, 71, 145, 0.6)',
    "MaE %": 'rgba(235, 10, 134, 0.6)',
  }

  const dataset_prep = selectedMetrics.map(item => {
    return {
        label: item.replaceAll('_', ' '),
        data: filteredData.map(item2 => item2[item]),
        backgroundColor: dataset_colors[item],
     }
  });

  // Prepare chart data
  const chartData = {
    labels: filteredData.map(item => item.Model),
    datasets: dataset_prep,   
  };

  return (
    <div className="space-y-6 pt-7">
      {/* model Filters */}

      <div className="flex w-full justify-center pt-7">
        <h1 className="text-4xl">
            <b>Leaderboard</b>
        </h1>
      </div>

      {/* Bar Chart */}
      <div className='flex w-full justify-center'>
        <div className="h-80">
            <Bar
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } }
            }}
            className="w-full h-full" 
            style={{ width: '100%', height: '100%' }}
            />
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex w-full justify-center">
            <p>
                Models
            </p>
        </div>
        <div className="flex w-full justify-center">
            <p>
                Metrics
            </p>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex w-full overflow-hidden justify-center">
        <MultiSelect
            value={selectedmodels}
            options={models}
            onChange={(e) => setSelectedmodels(e.value)}
            optionLabel="label"
            placeholder="Select models"
            maxSelectedLabels={10}
            display="chip"
            className="text-sm p-1 md:w-20rem"
            style={{width: '90%'}}
        />
        </div>

        <div className="flex w-full overflow-hidden justify-center">
        <MultiSelect
            value={selectedMetrics}
            options={metrics}
            onChange={(e) => setSelectedMetrics(e.value)}
            optionLabel="label"
            placeholder="Select Metrics"
            maxSelectedLabels={10}
            display="chip"
            className="text-sm p-1 md:w-20rem"

            style={{width: '90%'}}
        />
        </div>
      </div>

      <div className="overflow-x-auto pt-4">
        <LeaderboardTable
          data={filteredData}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>

    </div>
  );
}