import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import ReactLoading from 'react-loading';
import '../styles/dashboard.css';

import useGetData from '../custom-hooks/useGetData';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalBill = bills.reduce((total, bill) => total + bill.totalAmount, 0);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_CayCanh');
      setProducts(res.data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_HoaDon');
      setBills(res.data);
      setLoading(false);
    };
    fetchApi();
  }, []);
  const { data: users } = useGetData('users');

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="lg-3">
              <div className="revenue__box">
                <h5>Doanh Thu</h5>
                <span>
                  {loading ? <h4>Loading...</h4> : `${totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ`}
                </span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="order__box">
                <h5>Số Đơn Đặt Hàng</h5>
                <span>{bills.length === 0 ? <h4>Loading.....</h4> : bills.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="products__box">
                <h5>Sản Phẩm</h5>
                <span>{products.length === 0 ? <h4>Loading.....</h4> : products.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="users__box">
                <h5>Số Người Dùng</h5>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
