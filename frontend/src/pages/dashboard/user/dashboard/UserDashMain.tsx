import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import { Stats } from '../../../../types/types';

const UserDashMain = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  if (!isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!stats || stats === undefined) {
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
          safeStats.totalReviews,
          safeStats.totalPurchasedProducts,
        ],
        backgrondColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWdith: 1,
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
          label: function (tooltopItem: any) {
            if (tooltopItem.label === 'Total Payments') {
              return `Total Payments: ${tooltopItem.raw.toFixed(2)}`;
            }
            return `${tooltopItem.label}:${tooltopItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return <div>UserDashMain</div>;
};

export default UserDashMain;
