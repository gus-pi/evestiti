import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import { Stats } from '../../../../types/types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import UserStats from './UserStats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDashMain = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: stats, isLoading } = useGetUserStatsQuery(user?.email);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!stats) {
    return <div className="text-center text-gray-500">No data available.</div>;
  }

  const safeStats: Stats = stats ?? {
    totalPayments: 0,
    totalReviews: 0,
    totalPurchasedProducts: 0,
  };
  const data = {
    labels: ['Total Payments', 'Total Reviews', 'Total Purchased Products'],
    datasets: [
      {
        label: 'User Stats',
        data: [
          safeStats.totalPayments,
          safeStats.totalReviews * 100,
          safeStats.totalPurchasedProducts * 100,
        ],
        backgrondColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <p>Hello, {user?.username}! welcome to your dashboard.</p>
      </div>
      <UserStats stats={stats} />
      <div className="mb-6">
        {/* @ts-ignore */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserDashMain;
