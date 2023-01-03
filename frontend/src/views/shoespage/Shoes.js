import React, { useContext } from "react";
import { MyContext } from "../../App";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';
import "./Shoes.scss";

const Shoes = () => {
    const { shoes, user, cart, setCart, isLoggedIn} = useContext(MyContext);
    const navigate = useNavigate();

    const addToCart = (shoe) => {
        let item = cart.find((elem) => elem._id === shoe._id);
        
        if(!isLoggedIn) {
          alert("Please login");
          navigate("/login")
        } else {
          if (item) {
            item.quantity += 1;
            setCart([...cart]);
          } else {if ((cart.length +1) > 3 ){
            alert('Reached Maximum Quantity of Meals')
            return 
          }
            setCart([...cart, { ...shoe, quantity: 1 }]);
          }
        }
        
      };
  return (
    <div>
    <p>Welcome {user && user.info.firstName} to pickup your shoes</p>
    <div className="shoes-container">
    {shoes.map((shoe) => {
      return (
        <div key={shoe._id} className="shoes">
          <img src={shoe.img} width="300" alt="" />
          <h2>{shoe.shoeName}</h2>
          <p>{shoe.description}</p>
          <h3>
            <strong>€ {shoe.price}</strong>
          </h3>
          <ReactStars
            count={5}
            value={shoe.rating}
            size={24}
            isHalf={true}
            activeColor="green"
          />
          <div>
            <button onClick={() => addToCart(shoe)}>Add To Cart</button>
          </div>
        </div>
      );
    })}
  </div>
    </div>
  )
}

export default Shoes;
