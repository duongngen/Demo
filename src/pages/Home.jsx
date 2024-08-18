import React from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Col, Container, Row } from 'reactstrap';

import Helmet from '../components/Helmet/Helmet';
import '../styles/home.css';
import decorateImg from '../assets/images/xbg_tit.png.pagespeed.ic.vrv94MdjpM.png';
import Services from '../services/Services';
import Clock from '../components/UI/Clock';
import CategorySection from '../components/UI/CategorySection';
import TrendingProductsSection from '../components/UI/TrendingProductsSection';
import NewProductsSection from '../components/UI/NewProductsSection';

const Home = () => {
  return (
    <Helmet title={'Trang Chủ'}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="12" md="6">
              <div className="hero__content">
                <h2>Tận hưởng không gian sống xanh</h2>
                <p>
                  Bổ sung thêm cây xanh là một cách đơn giản nhất để tạo ra sự thoải mái cho không gian sống của bạn,
                  giúp mang lại hiệu quả công việc và thư giãn mỗi khi trở về. Chúng tôi cung cấp đầy đủ các loại cây
                  như cây nội thất, cây văn phòng, cây ăn quả, hoa để trang trí cho mái ấm của bạn hay làm quà tặng khai
                  trương, tân gia.
                </p>
                <h5 whileTap={{ scale: 1.2 }}>
                  <Link to="/cua-hang">Mua Ngay</Link>
                </h5>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <TrendingProductsSection />
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="12" md="12" className="count__down-col text-center">
              <div className="clock__top-content">
                <h3 className="text-white fs-5 mb-3">Làm Đẹp Không Gian Sống Của Bạn</h3>
                <h3 className="text-white fs-5 mb-2">Ưu Đãi Có Hạn</h3>
              </div>

              <Clock />

              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn store__btn">
                <Link to="/cua-hang">Cửa hàng</Link>
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <NewProductsSection />
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-4">
              <img src={decorateImg} alt="" className="decorate__img" />
              <h2 className="section__title">Danh mục nổi bật</h2>
            </Col>
            <CategorySection />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
