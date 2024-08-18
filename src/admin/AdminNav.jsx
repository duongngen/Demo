import React from 'react';
import { Container, Row } from 'reactstrap';

import logo from '../assets/images/1703178.png';
import useAuth from '../custom-hooks/useAuth';
import '../styles/admin-nav.css';

import { NavLink } from 'react-router-dom';

const admin__nav = [
  {
    display: 'Bảng Điều Khiển',
    path: '/admin',
  },
  {
    display: 'Tất Cả Sản Phẩm',
    path: '/admin/all-products',
  },
  {
    display: 'Đơn Đặt Hàng',
    path: '/admin/orders',
  },
  {
    display: 'Người Dùng',
    path: '/admin/users',
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <img src={logo} alt="" />
                <div>
                  <p>Cây Cảnh</p>
                  <h1>Trúc Thanh</h1>
                </div>
              </div>

              <div className="search__box">
                <input type="text" placeholder="Search..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <img src={currentUser && currentUser.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink to={item.path} className={navClass => (navClass.isActive ? 'active__admin-menu' : '')}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
