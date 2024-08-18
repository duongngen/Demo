import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReactLoading from 'react-loading';
import '../styles/order.css';
import { toast } from 'react-toastify';

const Orders = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_HoaDon');
      setBills(res.data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  const printBill = async id => {
    const url = `https://json-cay-canh.vercel.app/json_HoaDon/${id}`;
    const res = await axios.delete(url);
    const result = res.data;
    if (!result) {
      toast.error('Lỗi');
    } else {
      toast.success('Xác nhận đã giao thành công');
      window.location.reload();
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Hóa Đơn</h4>
          </Col>

          {loading ? (
            <ReactLoading className="loading__react" type={'spin'} color={'#1d6233'} height={100} width={100} />
          ) : (
            <Col lg="12">
              {bills.map((bill, i) => (
                <Row key={i} className="bill__container">
                  <Col lg="6">
                    <div>
                      Họ và Tên: <span>{bill.username}</span>
                    </div>
                    <div>
                      Email: <span>{bill.email}</span>
                    </div>
                    <div>
                      Địa chỉ: <span>{bill.address}</span>
                    </div>
                    <div>
                      Quốc gia: <span>{bill.country}</span>
                    </div>
                  </Col>

                  <Col lg="6">
                    <div>
                      Mã sản phẩm: <span>{bill._id}</span>
                    </div>
                    <div>
                      Số điện thoại: <span>{bill.phone}</span>
                    </div>
                    <div>
                      Tỉnh thành: <span>{bill.province}</span>
                    </div>
                    <div>
                      Mã bưu điện: <span>{bill.zipcode}</span>
                    </div>
                  </Col>

                  <Col lg="12" className="pt-1">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên Sản Phẩm</th>
                          <th>Số Lượng</th>
                          <th>Đơn GIá</th>
                          <th>Tổng GIá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bill.billProduct.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                            <td>{(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>

                  <Col lg="9">
                    <h6>Shipping: 30,000 VNĐ</h6>
                    <h5>
                      Tổng Cộng: {(bill.totalAmount + 30000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ
                    </h5>
                  </Col>

                  <Col lg="3">
                    <button onClick={() => printBill(bill._id)} className="btn btn-success">
                      Xác Nhận Đã Giao
                    </button>
                  </Col>
                </Row>
              ))}
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
