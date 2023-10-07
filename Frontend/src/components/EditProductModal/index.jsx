/** @format */

import React, { useState } from 'react';
import './index.css';
import { AiFillCloseCircle, AiOutlineSave } from 'react-icons/ai';
import Camera from '../../assets/camera.svg';
import { upload_Image } from '../../Api/cloudImage';
import { toast } from 'react-toastify';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';

const EditProductModal = ({
  products,
  editProductId,
  editProduct,
  setEditProduct,
  handleEditProduct,
  setShowEditModal,
  setImageUrl,
  imageUrl,
  // setImageResponse,
  // imageResponse,
}) => {
  console.warn(products);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // Check the file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      toast.error('Please select a valid JPG or PNG image.');
      event.target.value = null; // Reset the input field
      setSelectedImage(null);
      return;
    }
    dispatch(setFetching(true));
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setShowInput(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'imageridedost');
    data.append('cloud_name', 'dlrgh9gam');
    try {
      let response = await upload_Image(data);
      // setImageResponse(response.status);
      const imageUrl = response?.data?.secure_url; // Capture imageUrl here
      setImageUrl(imageUrl);
      dispatch(setFetching(false)); // Set the state variable
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Profile Image Upload failed');
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span
            className="cancle-modal"
            onClick={() => setShowEditModal(false)}
          >
            <AiFillCloseCircle fontSize={40} />
          </span>
          <h2 className="welcome">Edit Product</h2>
          <div className="change-pic" style={{ width: '100%', padding: '0px' }}>
            <div className="Picture">
              <div className="icon-box">
                {selectedImage ? (
                  <img
                    className="profile-image"
                    src={selectedImage}
                    alt="Profile Picture"
                  />
                ) : (
                  <>
                    <img
                      className={`${
                        editProduct?.productimage ? 'profile-image' : 'camera'
                      }`}
                      src={`${
                        editProduct?.productimage
                          ? editProduct?.productimage
                          : Camera
                      }`}
                    />
                    <h5>Edit picture</h5>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{
                    display: showInput || selectedImage ? 'block' : '',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-field">
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              // value={products.name}
              defaultValue={editProduct.name || products.name}
              onChange={(e) => {
                setEditProduct({ ...editProduct, name: e.target.value });
              }}
              placeholder="Name"
            />
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              // value={products.price}
              defaultValue={editProduct.price || products.price}
              onChange={(e) => {
                setEditProduct({ ...editProduct, price: e.target.value });
              }}
              placeholder="Price"
            />
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              // value={products.rating}
              defaultValue={editProduct.rating || products.rating}
              onChange={(e) =>
                setEditProduct({ ...editProduct, rating: e.target.value })
              }
              placeholder="Product rating"
            />
            <input
              type="text"
              style={{ height: '66px', marginBottom: '15px' }}
              // value={products.rating}
              defaultValue={editProduct.description || products.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
              placeholder="Product description"
            />
            {/* {imageResponse === 200 ? (
              <button
                className="save-button"
                onClick={() =>
                  handleEditProduct(
                    editProductId,
                    imageUrl ? imageUrl : editProduct?.productimage,
                  )
                }
              >
                Save
              </button>
            ) : null} */}
            <button
              className="save-button"
              onClick={() =>
                handleEditProduct(
                  editProductId,
                  imageUrl ? imageUrl : editProduct?.productimage,
                )
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
