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
    element: <DashboardLayout />,
    children: [
      //user routes
      { path: '', element: <div>User Dashboard</div> },
      { path: 'orders', element: <div>User Orders</div> },
      { path: 'payments', element: <div>User Payments</div> },
      { path: 'profile', element: <div>User Profile</div> },
      { path: 'reviews', element: <div>User Reviews</div> },

      //admin routes (only accessible by admins) TODO:private route using role field
      { path: 'admin', element: <div>Admin Main</div> },
      { path: 'add-new-post', element: <div>New Product</div> },
      { path: 'manage-products', element: <div>Manage Products`</div> },
      { path: 'update-product/:id', element: <div>Update Product</div> },
      { path: 'users', element: <div>All Users</div> },
      { path: 'manage-orders', element: <div>Manage Orders</div> },
    ],
  },
]);

export default router;
