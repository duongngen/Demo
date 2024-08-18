import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/productCard.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { favoriteActions } from '../../redux/slices/favoriteSlice';

const ProductCard = ({ item }) => {
  const lovesProduct = useSelector(state => state.favorite.favoriteItems);
  const toggleLoved = lovesProduct.find(itemLove => itemLove.id === item._id);
  const dispatch = useDispatch();

  function addToCart() {
    dispatch(
      cartActions.addItem({
        id: item._id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.productImg[0].imgUrl,
        quantity: 1,
      })
    );
    toast.success('Sản phẩm đã được thêm vào giỏ hàng');
  }

  const addToFavorite = () => {
    if (!toggleLoved) {
      dispatch(
        favoriteActions.addFavoriteItem({
          id: item._id,
          productName: item.productName,
          category: item.category,
          imgUrl: item.productImg[0].imgUrl,
          price: item.price,
        })
      );
      toast.success('Sản phẩm đã được thêm vào mục yêu thích');
    } else {
      dispatch(favoriteActions.deleteLoveItem(item._id));
    }
  };

  return (
    <Col lg="3" md="4" className="mb-4">
      <div className="product__item">
        <div className="product__img">
          <Link to={`/cua-hang/${item._id}`}>
            <motion.img whileHover={{ scale: 1.1 }} src={item.productImg[0].imgUrl} alt="" />
          </Link>
        </div>
        <div className="p-1 product__info">
          <h3 className="product__name">
            <Link to={`/cua-hang/${item._id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ</span>

          <div className="product__iconWrap">
            <motion.span whileTap={{ scale: 1.2 }} className="product__favorite" onClick={addToFavorite}>
              {toggleLoved ? (
                <i style={{ color: '#d61212' }} className="ri-heart-fill"></i>
              ) : (
                <i className="ri-heart-line"></i>
              )}
            </motion.span>
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
              <i className="ri-add-line"></i>
            </motion.span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
