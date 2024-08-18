import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { useFormik } from 'formik';
// import * as Yup from "yup"

import '../styles/login.css';

const Login = () => {
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    // validationSchema: Yup.object({
    //   email: Yup.string().required("Email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email address"),
    //   password: Yup.string().required("Password is required").min(6,"Password must be 6 characters"),
    // }),

    onSubmit: async values => {
      setLoading(true);

      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

        const user = userCredential.user;

        console.log(user.email);
        setLoading(false);
        if (user.email === 'admin@gmail.com') {
          toast.success('Đăng nhập thành công');
          navigate('/admin');
        } else {
          toast.success('Đăng nhập thành công');
          navigate('/trang-chu');
        }
      } catch (error) {
        setLoading(false);
        toast.error('Đăng nhập thất bại');
        setErrEmail('Địa chỉ email không chính xác');
        setErrPassword('Mật khẩu không chính xác');
      }
    },
  });

  return (
    <Helmet title="Đăng Nhập">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <ReactLoading className="loading__react mt-4" type={'spin'} color={'#1d6233'} height={80} width={80} />
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Đăng Nhập</h3>
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Nhập email"
                      className={errEmail && 'errorOutline'}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {errEmail && <p className="errorMsg">{errEmail}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Nhập mật khẩu"
                      className={errPassword && 'errorOutline'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {errPassword && <p className="errorMsg">{errPassword}</p>}
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Đăng nhập
                  </button>
                  <p>
                    Bạn chưa có tài khoản ? <Link to="/dang-ky">Tạo tài khoản</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
