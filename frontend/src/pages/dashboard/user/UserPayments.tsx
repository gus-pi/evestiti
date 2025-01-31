import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';
import { Order } from '../../../types/types';

const UserPayments = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    data: orderData,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user.email);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No payments found.</div>;

  const orders = orderData?.orders;

  const totalPayment = orders
    .reduce((acc: number, order: Order) => acc + order.amount, 0)
    .toFixed(2);

  return (
    <div className="py-6 px-4">
      <h3 className="text-xl font-semibold mb-4">Total Payments</h3>
      <div>
        <p className="text-lg font-medium text-gray-800 mb-5">
          Total Spent: ${totalPayment ? totalPayment : 0}
        </p>
        <ul>
          {orders &&
            orders.map((item: Order, index: number) => (
              <li key={index}>
                <h5 className="font-medium text-gray-800">
                  Order #{index + 1}
                </h5>
                <div>
                  <span className="text-gray-600">
                    Order Total ${item.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex md:flex-row items-center space-x-2">
                  <span className="text-gray-600">
                    Date:{' '}
                    {new Date(item.createdAt as string).toLocaleDateString()}
                  </span>
                  <p className="text-gray-600">
                    {' '}
                    | Status:{' '}
                    <span
                      className={`ml-2 px-2 py-[2px] text-sm rounded
                    ${
                      item.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'pending'
                        ? 'bg-red-200 text-red-700'
                        : item.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-200 text-blue-700'
                    } `}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>
                <hr className="my-2" />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPayments;
