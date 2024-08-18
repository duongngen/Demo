import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import useAuth from '../custom-hooks/useAuth';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { cartActions } from '../redux/slices/cartSlice';
import '../styles/Checkout.css';
import { db } from '../firebase.config';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [bankTransfer, setBankTransfer] = useState(false);

  const cartItems = useSelector(state => state.cart.cartItems);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const shipping = 30000;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const updateUser = async billProduct => {
    console.log(billProduct);

    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().purchaseOrders);
    await updateDoc(doc(db, 'users', currentUser.uid), {
      purchaseOrders: docSnap.data().purchaseOrders.concat(billProduct),
    });
    console.log(docSnap.data());
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_CayCanh');
      // const datas = res.data
      //   console.log(datas)
      // cartItems.forEach(cartItem => {
      //   console.log(cartItem)
      //   const datasCanPut = datas.filter(data => data._id === cartItem.id)
      //   console.log(datasCanPut)
      // })

      setProducts(res.data);
    };
    fetchApi();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      address: '',
      province: '',
      zipcode: '',
      country: '',
      bankTransfer: '',
    },

    validationSchema: Yup.object({
      username: Yup.string().required('Vui lòng nhập trường này'),
      email: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ'),
      phone: Yup.string()
        .typeError('Đây không phải là số điện thoại')
        .required('Vui lòng nhập trường này')
        .length(9, 'Số điện thoại phải đủ 10 số'),
      address: Yup.string().required('Vui lòng nhập trường này'),
      province: Yup.string().required('Vui lòng nhập trường này'),
      zipcode: Yup.string().required('Vui lòng nhập trường này').length(5, 'Mã bưu chính phải có chính xác 5 số'),
      country: Yup.string().required('Vui lòng nhập trường này'),
      bankTransfer: bankTransfer ? Yup.string().required('Vui lòng nhập trường này') : '',
    }),

    onSubmit: async values => {
      toast.success('Đặt Hàng Thành Công');
      navigate('/thanh-toan-thanh-cong');
      dispatch(cartActions.deleteAllItems());

      const { username, email, phone, address, province, zipcode, country } = values;
      const billProduct = cartItems;
      const bill = {
        username,
        email,
        phone,
        address,
        province,
        zipcode,
        country,
        totalAmount,
        totalQuantity,
        billProduct,
      };
      const url = 'https://json-cay-canh.vercel.app/json_HoaDon';
      const res = await axios.post(url, bill);
      const result = res.data;
      console.log(result);

      if (!result) {
        toast.error('Lỗi');
      } else {
        updateUser(billProduct);
      }

      cartItems.forEach(cartItem => {
        const productsCanPut = products.filter(product => product._id === cartItem.id);
        const currentPurchases = productsCanPut[0].purchases;
        const newPurchases = currentPurchases + cartItem.quantity;
        const putProducts = async () => {
          const url = `https://json-cay-canh.vercel.app/json_CayCanh/${productsCanPut[0]._id}`;
          const res = await axios.put(url, { purchases: newPurchases });
          const datas = res.data;
          console.log(datas);
        };
        putProducts();
      });
    },
  });

  return (
    <Helmet title="Thanh Toán">
      <CommonSection title="Thanh Toán" />
      <section>
        <Form onSubmit={formik.handleSubmit}>
          <Container>
            <Row>
              <Col lg="8">
                <h6 className="mb-4 fw-bold">Thông Tin Thanh Toán</h6>
                <Form className="billing__form">
                  <FormGroup className="form__group">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Họ và Tên"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      className={formik.errors.username && 'errorOutline'}
                    />
                    {formik.errors.username && <p className="errorMsg">{formik.errors.username}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Địa Chỉ Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={formik.errors.email && 'errorOutline'}
                    />
                    {formik.errors.email && <p className="errorMsg">{formik.errors.email}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      placeholder="Số Điện Thoại"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      className={formik.errors.phone && 'errorOutline'}
                    />
                    {formik.errors.phone && <p className="errorMsg">{formik.errors.phone}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Địa Chỉ"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      className={formik.errors.address && 'errorOutline'}
                    />
                    {formik.errors.address && <p className="errorMsg">{formik.errors.address}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      id="province"
                      name="province"
                      type="text"
                      placeholder="Tỉnh / Thành Phố"
                      value={formik.values.province}
                      onChange={formik.handleChange}
                      className={formik.errors.province && 'errorOutline'}
                    />
                    {formik.errors.province && <p className="errorMsg">{formik.errors.province}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      id="zipcode"
                      name="zipcode"
                      type="number"
                      placeholder="Mã Bưu Điện"
                      value={formik.values.zipcode}
                      onChange={formik.handleChange}
                      className={formik.errors.zipcode && 'errorOutline'}
                    />
                    {formik.errors.zipcode && <p className="errorMsg">{formik.errors.zipcode}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Quốc Gia"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      className={formik.errors.country && 'errorOutline'}
                    />
                    {formik.errors.country && <p className="errorMsg">{formik.errors.country}</p>}
                  </FormGroup>
                </Form>
              </Col>

              <Col>
                <div className="checkout__cart">
                  <h6>
                    Tổng Số Lượng: <span>{totalQuantity} Sản Phẩm</span>
                  </h6>
                  <h6>
                    Thành Tiền: <span>{totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ</span>
                  </h6>
                  <h6>
                    <span>Phí Vận Chuyển:</span>
                    <span>{shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ</span>
                  </h6>
                  <h4>
                    Tổng chi phí:{' '}
                    <span>{(totalAmount + shipping).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ</span>
                  </h4>
                  <button type="submit" className="buy__btn auth__btn w-100">
                    Đặt Hàng
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
      </section>
    </Helmet>
  );
};

export default Checkout;
