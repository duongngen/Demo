import React, { useState, useRef, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { GlassMagnifier } from 'react-image-magnifiers';

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_CayCanh');
      setProducts(res.data);
    };
    fetchApi();
  }, []);

  const product = products.length > 0 && products.find(item => item._id === id);
  const [qty, setQty] = useState(1);

  const [tab, setTab] = useState('desc');
  const dispatch = useDispatch();

  const {
    productImg,
    productName,
    price,
    description,
    category,
    size,
    intro,
    characteristics,
    meaning,
    uses,
    productCare,
  } = product;

  const relatedProducts = products.filter(item => item.category === category);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imgUrl: productImg[0].imgUrl,
        productName,
        price,
        quantity: qty,
      })
    );
    toast.success('Product added successfully');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const reduceQty = () => {
    if (qty === 1) {
      setQty(1);
    } else {
      setQty(qty - 1);
    }
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  // settings slick slider
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Helmet title={product && productName}>
      <CommonSection title={product && productName} />

      <section className="pt-0">
        <Container>
          <Row className="mt-5">
            <Col lg="4">
              <Slider {...settings} asNavFor={nav2} ref={slider1}>
                {product &&
                  productImg.map((item, i) => (
                    <GlassMagnifier imageSrc={item.imgUrl} imageAlt="Example" zoomFactor={5} magnifierSize="35%" />
                  ))}
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={slider2}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                className="slider__wrap"
              >
                {product && productImg.map((item, i) => <img key={i} src={item.imgUrl} alt="" />)}
              </Slider>
            </Col>
            <Col lg="8">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-5">
                <span className="product__price">
                  {product && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ
                </span>
                <span>Loại: {category}</span>
              </div>
              {size && <h6 className="mt-2"> Kích thước: {size}</h6>}
              <p className="mt-3">{product && description}</p>
              <p className="mt-3">Lưu ý: Giá sản phẩm đã bao gồm chậu.</p>

              <div className="quantity">
                <span>Số Lượng:</span>
                <span className="product__qty">
                  <button onClick={() => reduceQty()}>
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => increaseQty()}>
                    <i className="ri-add-line"></i>
                  </button>
                </span>
              </div>

              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn mt-24px" onClick={addToCart}>
                Thêm Vào Giỏ
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h4 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>
                  Chi Tiết Sản Phẩm
                </h4>
              </div>

              <ul className="tab__content mt-4 ">
                <h6>Giới Thiệu {productName}</h6>
                {product && intro.map((item, i) => <li key={i}>{item.introText}</li>)}
              </ul>

              <ul className="tab__content mt-4 ">
                <h6>Đặc điểm</h6>
                {product && characteristics.map((item, i) => <li key={i}>{item.characteristicsText}</li>)}
              </ul>

              <ul className="tab__content mt-4 ">
                <h6>Ý nghĩa phong thuỷ</h6>
                {product && meaning.map((item, i) => <li key={i}>{item.meaningText}</li>)}
              </ul>

              <ul className="tab__content mt-4 ">
                <h6>Công dụng</h6>
                {product && uses.map((item, i) => <li key={i}>{item.usesText}</li>)}
              </ul>

              <ul className="tab__content mt-4 ">
                <h6>Cách chăm sóc</h6>
                {product && productCare.map((item, i) => <li key={i}>{item.productCareText}</li>)}
              </ul>
            </Col>

            <Col lg="12" className="mb-1">
              <h2 className="related__title">Cây Cảnh Cùng Loại</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
