import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { cartActions } from '../redux/slices/cartSlice';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const navigate = useNavigate();
  const payProducts = () => {
    if (totalAmount === 0) {
      toast.warning('Không có sản phẩm, hãy quay lại trang cửa hàng!');
    } else {
      navigate('/thanh-toan');
    }
  };
  return (
    <Helmet title="Giỏ Hàng">
      <CommonSection title="Giỏ Hàng" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">Chưa có sản phẩm nào trong giỏ hàng</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Hình Ảnh</th>
                      <th>Tên Cây</th>
                      <th>Giá</th>
                      <th>Số Lượng</th>
                      <th>Hủy</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Tổng Tiền:
                  <span className="fs-4 fw-bold">
                    {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ
                  </span>
                </h6>
              </div>

              <p className="fs-6 mt-2">Thuế và phí vận chuyển sẽ được tính khi tiến hành thanh toán</p>
              <div>
                <button className="buy__btn btn__checkOut checkOut" onClick={() => payProducts()}>
                  Thanh Toán
                </button>
                <button className="buy__btn btn__checkOut mt-3">
                  <Link className="checkOut" to="/cua-hang">
                    Quay Lại Cửa Hàng
                  </Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const minusProduct = () => {
    dispatch(cartActions.minusQty(item.id));
  };

  const addProduct = () => {
    dispatch(cartActions.addQty(item.id));
  };

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
      <td>
        <div className="cart-qty">
          <span onClick={minusProduct}>
            <i className="ri-checkbox-indeterminate-line minus"></i>
          </span>
          {item.quantity}
          <span onClick={addProduct}>
            <i className="ri-add-box-line plus"></i>
          </span>
        </div>
      </td>
      <td>
        <motion.i whileTap={{ scale: 1.2 }} onClick={deleteProduct} className="ri-delete-bin-line"></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
