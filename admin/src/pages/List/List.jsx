import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
    const url = 'http://localhost:2000';
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);

            console.log(response.data);
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
                        {/* Ensure correct image path */}
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>Tk.{item.price}</p>
                        <p>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;