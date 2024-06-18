import React, {  useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios"
const Add = () => {
  const url ="http://localhost:2000";
  const [image, setImage] = useState(null);
 const [data,setData]=useState({
  name:"",
  description:"",
  price:"",
  category:"Salad"

 })
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
const onChangeHandler=(event)=>{
const name=event.target.name;
const value=event.target.value;
setData(data=>({...data,[name]:value}))
}
const onSubmitHandler =async(event)=>{
event .preventDefault();
const formData=new FormData();
formData.append("name",data.name)
formData.append("description",data.description)
formData.append("price",Number(data.price))
formData.append("category",data.category)
formData.append("image",image)
const response = await axios.post(`${url}/api/food/add`,formData);

}
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
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
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description:</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category:</p>
            <select onChange={onChangeHandler} name="category">
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
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='Tk.20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
