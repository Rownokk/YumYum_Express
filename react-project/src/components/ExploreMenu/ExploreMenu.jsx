
import './ExploreMenu.css'

import { menu_list } from '../../assets/assets'
        

        const ExploreMenu = ({category, setCategory}) => {
    console.log('category:', category); // Debugging line
    console.log('setCategory:', setCategory); // Debugging line
  return (
    <div className='explore-menu'id='explore-menu'>
        <h1>Explore Our Menu</h1>
         <p className='explore-menu-text'>Welcome to the heart of YumYum_Express, where every meal is a delightful journey. Our menu is designed to cater to all tastes and preferences, offering a diverse selection of dishes that will tantalize your taste buds and satisfy your cravings. Whether you're in the mood for a quick snack or a gourmet feast, we've got something for everyone.
</p>
         <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key ={index} className='explore-menu-list-item'>
                   <img className={category===item.menu_name?"active":""}src={item.menu_image} alt="item_name" />
                   <p>{item.menu_name}</p>
                    </div>
                  
                )
            })}
         </div>
         <hr/>
    </div>
  )
}

export default ExploreMenu