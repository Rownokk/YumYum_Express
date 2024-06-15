import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

const Add = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className='add'>
      <form className='flex-col'>
        <label htmlFor="image" className="upload-text">Upload Image:</label>
        <div className="add-img-upload">
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            accept="image/*"
            hidden
            required
          />
          <label htmlFor="image" className="upload-label">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Uploaded Area" className="uploaded-image" />
            ) : (
              <img src={assets.upload_area} alt="Upload Area" className="upload-placeholder" />
            )}
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name:</p>
          <input type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description:</p>
          <textarea name="description" rows="6" placeholder="Write content here"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category:</p>
            <select name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price:</p>
            <input type="number" name="price" placeholder='Tk.20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
