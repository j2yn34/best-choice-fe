import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VoteGraph = ({
  ACount,
  BCount,
}: {
  ACount: number;
  BCount: number;
}): JSX.Element => {
  const totalVotes = ACount + BCount;
  const optionAPercent =
    totalVotes === 0 ? 0 : Math.round((ACount / totalVotes) * 100);
  const optionBPercent =
    totalVotes === 0 ? 0 : Math.round((BCount / totalVotes) * 100);

  const data = {
    labels: ["A", "B"],
    datasets: [
      {
        axis: "y",
        fill: false,
        data: [ACount, BCount],
        backgroundColor: ["#fecaca", "#B2D3F8"],
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
      maxBarThickness: 40,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="relative w-full max-h-[180px] pl-6">
      <Bar data={data} options={config.options as never} />
      <span className="absolute top-[18%] left-0 text-red-dark font-semibold">
        A
      </span>
      <span className="absolute top-[68%] left-0 text-blue-dark font-semibold">
        B
      </span>
      <div className="absolute top-[38%] text-sm">
        <span>{optionAPercent}% </span>
        <span>({ACount}명)</span>
      </div>
      <div className="absolute top-[88%] text-sm">
        <span>{optionBPercent}% </span>
        <span>({BCount}명)</span>
      </div>
    </div>
  );
};

export default VoteGraph;
