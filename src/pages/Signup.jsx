import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ReactLoading from 'react-loading';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

import { auth } from '../firebase.config';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';

import { toast } from 'react-toastify';

import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
      file: null,
    },

    validationSchema: Yup.object({
      username: Yup.string().required('Vui lòng nhập trường này'),
      email: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ'),
      password: Yup.string().required('Vui lòng nhập trường này').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      confirmedPassword: Yup.string()
        .required('Vui lòng nhập trường này')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
      file: Yup.mixed().required('Vui lòng chọn file hình ảnh'),
    }),

    onSubmit: async values => {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

        const user = userCredential.user;
        const storageRef = ref(storage, `images/${Date.now() + values.username}`);
        const uploadTask = uploadBytesResumable(storageRef, values.file);

        uploadTask.on(
          error => {
            toast.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
              //update user profile
              await updateProfile(user, {
                displayName: values.username,
                photoURL: downloadURL,
              });

              //store user data in firestore database
              await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: values.username,
                email: values.email,
                photoURL: downloadURL,
                purchaseOrders: [],
              });
            });
          }
        );

        setLoading(false);
        toast.success('Đăng Ký Thành Công');
        navigate('/dang-nhap');
      } catch (error) {
        setLoading(false);
        toast.error('something went wrong');
      }
    },
  });

  return (
    <Helmet title="Đăng Ký">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <ReactLoading
                  className="loading__react mt-4"
                  type={'spin'}
                  color={'#1d6233'}
                  height={110}
                  width={110}
                />
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Đăng Ký</h3>
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Tên tài khoản"
                      className={formik.errors.username && 'errorOutline'}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username && <p className="errorMsg">{formik.errors.username}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Nhập email của bạn"
                      id="email"
                      name="email"
                      className={formik.errors.email && 'errorOutline'}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && <p className="errorMsg">{formik.errors.email}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                      id="password"
                      name="password"
                      className={formik.errors.password && 'errorOutline'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && <p className="errorMsg">{formik.errors.password}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Xác thực mật khẩu của bạn"
                      id="confirmedPassword"
                      name="confirmedPassword"
                      className={formik.errors.confirmedPassword && 'errorOutline'}
                      value={formik.values.confirmedPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedPassword && <p className="errorMsg">{formik.errors.confirmedPassword}</p>}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={event => {
                        formik.setFieldValue('file', event.target.files[0]);
                      }}
                    />
                    {formik.errors.file && <p className="errorMsg">{formik.errors.file}</p>}
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Tạo Tài Khoản
                  </button>
                  <p>
                    Bạn đã có tài khoản ? <Link to="/dang-nhap">Đăng Nhập</Link>
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

export default Signup;
