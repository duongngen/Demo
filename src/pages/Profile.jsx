import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import useAuth from '../custom-hooks/useAuth';
import userIcon from '../assets/images/user-icon.png';
import '../styles/profile.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { motion } from 'framer-motion';
import ReactLoading from 'react-loading';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
    const docUser = async () => {
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      setPurchases(docSnap.data().purchaseOrders);
      setLoading(false);
    };
    docUser();
  }, [currentUser]);

  // xóa cây cảnh
  const deletePurchase = async id => {
    const newPurchase = purchases.filter(purchase => purchase.id !== id);
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    setPurchases((docSnap.data().purchaseOrders = newPurchase));
    await updateDoc(doc(db, 'users', currentUser.uid), {
      purchaseOrders: (docSnap.data().purchaseOrders = newPurchase),
    });
  };

  return (
    <Helmet title={currentUser.displayName}>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="profile__bg">
                <div className="profile__user">
                  <span className="img__profile">
                    <img src={currentUser ? currentUser.photoURL : userIcon} alt="" />
                  </span>
                  <span className="name__user">{currentUser.displayName}</span>
                </div>
              </div>
            </Col>

            <Col lg="12" className="mt-6">
              <h3>Cây cảnh đã mua:</h3>
              {loading ? (
                <ReactLoading className="loading__react" type={'spin'} color={'#1d6233'} height={100} width={100} />
              ) : (
                <table className="table mt-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Ảnh</th>
                      <th>Tên Sản Phẩm</th>
                      <th>Số Lượng</th>
                      <th>Đơn GIá</th>
                      <th>Tổng GIá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <img src={purchase.imgUrl} alt="" />
                        </td>
                        <td>{purchase.productName}</td>
                        <td>{purchase.quantity}</td>
                        <td>{purchase.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        <td>{(purchase.price * purchase.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        <td>
                          <motion.i
                            whileTap={{ scale: 1.2 }}
                            className="ri-delete-bin-line"
                            onClick={() => deletePurchase(purchase.id)}
                          ></motion.i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
