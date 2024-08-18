import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
// import { db } from "../firebase.config"
// import { doc, deleteDoc } from "firebase/firestore"

import { toast } from 'react-toastify';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://json-cay-canh.vercel.app/json_CayCanh');
      setProducts(res.data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  const deleteProduct = async id => {
    const url = `https://json-cay-canh.vercel.app/json_CayCanh/${id}`;
    const res = await axios.delete(url);
    const result = res.data;
    if (result !== 'Delete successfully!') {
      toast.error('Lỗi');
    } else {
      toast.success('Xóa sản phẩm thành công');
      window.location.reload();
    }
  };

  return (
    <section>
      <Container>
        <Row>
          {loading ? (
            <ReactLoading className="loading__react" type={'spin'} color={'#1d6233'} height={100} width={100} />
          ) : (
            <Col lg="12">
              <Link to="/admin/add-product">
                <button type="button" class="btn btn-success">
                  Thêm sản phẩm
                </button>
              </Link>

              <table className="table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Danh Mục</th>
                    <th>Giá</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(item => (
                    <tr key={item._id}>
                      <td>
                        <img src={item.productImg[0].imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                      <td>
                        <button type="button" class="btn btn-info">
                          Sửa
                        </button>
                        |
                        <button
                          onClick={() => {
                            deleteProduct(item._id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
