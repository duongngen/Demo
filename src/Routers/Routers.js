import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';

import ProtectedRoute from '../Routers/ProtectedRoute';

import AddProduct from '../admin/AddProduct';
import AllProducts from '../admin/AllProducts';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';
import Orders from '../admin/Orders';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="trang-chu" />} />
      <Route path="trang-chu" element={<Home />} />
      <Route path="cua-hang" element={<Shop />} />
      <Route path="cua-hang/:id" element={<ProductDetails />} />
      <Route path="gio-hang" element={<Cart />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="thanh-toan" element={<Checkout />} />
        <Route path="thanh-toan-thanh-cong" element={<CheckoutSuccess />} />
        <Route path="admin" element={<Dashboard />} />
        <Route path="admin/all-products" element={<AllProducts />} />
        <Route path="admin/orders" element={<Orders />} />
        <Route path="admin/add-product" element={<AddProduct />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* <Route path='checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>}/> */}
      <Route path="dang-nhap" element={<Login />} />
      <Route path="dang-ky" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
