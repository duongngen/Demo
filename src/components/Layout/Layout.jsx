import React from 'react';

import Routers from '../../Routers/Routers';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import AdminNav from '../../admin/AdminNav';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/admin') ? <AdminNav /> : <Header />}
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
