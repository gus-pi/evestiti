import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import CategoryPage from '../pages/category/CategoryPage';
import Search from '../pages/search/Search';
import ShopPage from '../pages/shop/ShopPage';
import SingleProduct from '../pages/shop/productDetails/SingleProduct';
import Login from '../component/Login';
import Register from '../component/Register';
import PaymentSuccess from '../component/PaymentSuccess';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import UserDashMain from '../pages/dashboard/user/dashboard/UserDashMain';
import UserOrders from '../pages/dashboard/user/UserOrders';
import UserPayments from '../pages/dashboard/user/UserPayments';
import UserReviews from '../pages/dashboard/user/UserReviews';
import UserProfile from '../pages/dashboard/user/UserProfile';
import AdminDashMain from '../pages/dashboard/admin/dashboard/AdminDashMain';
import AddProduct from '../pages/dashboard/admin/addProduct/AddProduct';
import ManageProduct from '../pages/dashboard/admin/manageProduct/ManageProduct';
import UpdateProduct from '../pages/dashboard/admin/manageProduct/UpdateProduct';
import ManageUsers from '../pages/dashboard/admin/users/ManageUsers';
import ManageOrders from '../pages/dashboard/admin/manageOrders/ManageOrders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <div>About page</div> },
      { path: '/categories/:categoryName', element: <CategoryPage /> },
      { path: '/search', element: <Search /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/shop/:id', element: <SingleProduct /> },
      { path: '/success', element: <PaymentSuccess /> },
      { path: '/cancel', element: <div>Payment Cancelled</div> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  //dashboard stats routes
  {
    path: '/dashboard',
    element: (
      <PrivateRoute role="">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //user routes
      { path: '', element: <UserDashMain /> },
      { path: 'orders', element: <UserOrders /> },
      { path: 'payments', element: <UserPayments /> },
      { path: 'reviews', element: <UserReviews /> },
      { path: 'profile', element: <UserProfile /> },

      //admin routes (only accessible by admins) TODO:private route using role field
      {
        path: 'admin',
        element: (
          <PrivateRoute role="admin">
            <AdminDashMain />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-product',
        element: (
          <PrivateRoute role="admin">
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <PrivateRoute role="admin">
            <ManageProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'update-product/:id',
        element: (
          <PrivateRoute role="admin">
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute role="admin">
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute role="admin">
            <ManageOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
