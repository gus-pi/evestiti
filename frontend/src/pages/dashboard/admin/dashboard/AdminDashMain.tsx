import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import AdminStatsCharts from './AdminStatsCharts';

const AdminDashMain = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: stats, error, isLoading } = useGetAdminStatsQuery({});

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return;
  <div className="text-center text-gray-500">Error loading stats.</div>;
  if (!stats)
    return <div className="text-center text-gray-500">No data available.</div>;

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500">
          Hi {user.username}, Welcome to the admin dashboard.
        </p>
        <AdminStats stats={stats} />
        <AdminStatsCharts stats={stats} />
      </div>
    </div>
  );
};

export default AdminDashMain;
