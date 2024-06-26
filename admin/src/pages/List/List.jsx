import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
    
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
        
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response.data.success) {
                toast.success('Food item removed successfully');
                fetchList();
            } else {
                toast.error('Error removing food item');
            }
        } catch (error) {
            console.error('Error removing food item:', error);
            toast.error('Error removing food item');
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>  
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>Tk.{item.price}</p>
                        <p onClick={() => removeFood(item._id)} className='cursor remove-action'>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
