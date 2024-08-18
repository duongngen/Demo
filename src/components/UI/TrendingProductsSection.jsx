import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import decorateImg from '../../assets/images/xbg_tit.png.pagespeed.ic.vrv94MdjpM.png';
import ProductsList from '../../components/UI/ProductsList';
import axios from 'axios';

const TrendingProductsSection = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_CayCanh');
      setProducts(res.data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const sortTrendingProducts = products.sort((a, b) => a.purchases - b.purchases);
    setTrendingProducts(sortTrendingProducts.slice(sortTrendingProducts.length - 4).reverse());
  }, [products]);

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center mb-4">
          <img src={decorateImg} alt="" className="decorate__img" />
          <h2 className="section__title">Cây cảnh bán chạy</h2>
        </Col>

        {loading ? (
          <ReactLoading className="loading__react" type={'spin'} color={'#1d6233'} height={80} width={80} />
        ) : (
          <ProductsList data={trendingProducts} />
        )}
      </Row>
    </Container>
  );
};

export default TrendingProductsSection;
