import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import decorateImg from '../../assets/images/xbg_tit.png.pagespeed.ic.vrv94MdjpM.png';
import ProductsList from '../../components/UI/ProductsList';
import axios from 'axios';

const NewProductsSection = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_CayCanh');
      setProducts(res.data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const sortNewProducts = products.sort((a, b) => a.dateAdded - b.dateAdded);
    setNewProducts(sortNewProducts.slice(products.length - 4).reverse());
  }, [products]);

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center mb-4">
          <img src={decorateImg} alt="" className="decorate__img" />
          <h2 className="section__title">Cây cảnh mới</h2>
        </Col>

        {loading ? (
          <ReactLoading className="loading__react" type={'spin'} color={'#1d6233'} height={80} width={80} />
        ) : (
          <ProductsList data={newProducts} />
        )}
      </Row>
    </Container>
  );
};

export default NewProductsSection;
