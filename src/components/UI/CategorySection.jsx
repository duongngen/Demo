import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import categoryData from '../../assets/data/categoryData';
import '../../styles/categorySection.css';

const CategorySection = () => {
  return (
    <Container>
      <Row>
        {categoryData.map((item, i) => (
          <Col lg="3" className="mb-4" key={i}>
            <div className="popular__category-info">
              <img src={item.image} alt="" />
              <p>{item.title}</p>
              <button className="buy__btn store__btn">
                <Link to="/cua-hang" state={{ valueCategory: item.value }}>
                  Chi Tiết
                </Link>
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategorySection;
