import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';

import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import axios from "axios";

const AddProduct = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(enterProductImg);
  const navigate = useNavigate();

  const addProduct = async e => {
    e.preventDefault();
    setLoading(true);

    // ========== add product to the firebase database ==========
    try {
      const docRef = await collection(db, 'products');

      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
          toast.error('images not uploaded!');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success('product successfully added!');
      navigate('/admin/all-products');
    } catch (err) {
      setLoading(false);
      toast.error('product not added!');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="14">
            <h4 className="mb-5">Thêm cây cảnh</h4>
            {loading ? (
              <h4 className="py-5">Loading.......</h4>
            ) : (
              <>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Tên cây</span>
                    <input
                      type="text"
                      placeholder="Cây..."
                      value={enterTitle}
                      onChange={e => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Mô tả tóm tắt</span>
                    <input
                      type="text"
                      placeholder="Mô tả tóm tắt......"
                      value={enterShortDesc}
                      onChange={e => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Mô tả</span>
                    <input
                      type="text"
                      placeholder="Mô tả....."
                      value={enterDescription}
                      onChange={e => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Giá</span>
                      <input
                        type="number"
                        placeholder="VNĐ"
                        value={enterPrice}
                        onChange={e => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group w-50">
                      <span>Loại cây cảnh</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={e => setEnterCategory(e.target.value)}
                        required
                      >
                        <option>Chọn loại cây cảnh</option>
                        <option value="chair">Cây cảnh thủy sinh</option>
                        <option value="sofa">Cây Cảnh Để Bàn</option>
                        <option value="mobile">Sen đá, xương rồng</option>
                        <option value="watch">Cây cảnh nội thất</option>
                        <option value="wireless">Cây bonsai</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group">
                      <span>Hình ảnh sản phẩm</span>
                      <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} required />
                    </FormGroup>
                  </div>

                  <button className="buy__btn" type="submit">
                    Xác nhận thêm
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProduct;
