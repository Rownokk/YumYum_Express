import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

// Sample data for food items
const foodItems = [
    { id: 1, name: "Salad", description: "Fresh and healthy salad", price: "$5.99", calories: "150 kcal", ingredients: "Lettuce, Tomato, Cucumber" },
    { id: 2, name: "Rolls", description: "Delicious rolls", price: "$6.99", calories: "300 kcal", ingredients: "Chicken, Veggies, Spices" },
    { id: 3, name: "Desserts", description: "Sweet and tasty desserts", price: "$4.99", calories: "400 kcal", ingredients: "Sugar, Milk, Flour" },
    { id: 4, name: "Sandwich", description: "Tasty and quick sandwich", price: "$5.99", calories: "350 kcal", ingredients: "Bread, Cheese, Ham" },
    { id: 5, name: "Cake", description: "Soft and delicious cake", price: "$7.99", calories: "500 kcal", ingredients: "Flour, Sugar, Eggs" },
    { id: 6, name: "Pure Veg", description: "Healthy and nutritious vegetables", price: "$3.99", calories: "200 kcal", ingredients: "Assorted Vegetables" },
    { id: 7, name: "Pasta", description: "Classic Italian pasta", price: "$6.99", calories: "400 kcal", ingredients: "Pasta, Tomato Sauce, Cheese" }
];

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [showSearch, setShowSearch] = useState(false); // State to toggle search input visibility
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredItems, setFilteredItems] = useState([]); // State for filtered food items

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredItems(foodItems.filter(item => item.name.toLowerCase().includes(query)).slice(0, 8));
    };

    return (
        <div className='navbar'>
            <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" className="search-icon" onClick={() => setShowSearch(!showSearch)} />
                {showSearch && (
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for food..."
                            className="navbar-search-input"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {filteredItems.length > 0 && (
                            <div className="search-results">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Calories</th>
                                            <th>Ingredients</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.price}</td>
                                                <td>{item.calories}</td>
                                                <td>{item.ingredients}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
}

export default Navbar;