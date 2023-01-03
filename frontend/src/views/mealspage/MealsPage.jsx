import React, { useContext } from "react";
import { MyContext } from "../../App";
import ReactStars from "react-rating-stars-component";
import DeregisterUser from "../../components/DeregisterUser";
import { useNavigate } from 'react-router-dom';
import UserData from "../../components/UserData";
import TotalOrder from "../../components/TotalOrder";
import TotalOrderPerCustomer from "../../components/TotalOrderPerCustomer";
import "./mealsPage.scss";

const MealsPage = () => {
  const { meals, user, cart, setCart, isLoggedIn, deleteUserAccount, isAdmin, token } = useContext(MyContext);
  const navigate = useNavigate();
 
  const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    
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
        setCart([...cart, { ...meal, quantity: 1 }]);
      }
    }
    
  };

  return (
    <div>
      <div>
      {isAdmin && <DeregisterUser token={token} userId={user.id} deleteUserAccount={deleteUserAccount} />}
        {isAdmin && <UserData token={token} userId={user.id} />}
        {isAdmin && <TotalOrder token={token} userId={user.id} />}
        {isAdmin && <TotalOrderPerCustomer token={token} userId={user.id} />} 
      </div>
      {/* <div>
        <h2>Welcome {user && user.info.firstName}</h2>
      </div>
      <h2>Meals page</h2>  */}
      <p>Select 3 meals and proceed to cart for checkout</p>
      <div className="meals-container">
        {meals.map((meal) => {
          return (
            <div key={meal._id} className="meal">
              <img src={meal.img} width="300" alt="" />
              <h2>{meal.mealName}</h2>
              <p>{meal.description}</p>
              <h3>
                <strong>€ {meal.price}</strong>
              </h3>
              <ReactStars
                count={5}
                value={meal.rating}
                size={24}
                isHalf={true}
                activeColor="green"
              />
              <div>
                <button onClick={() => addToCart(meal)}>Add To Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsPage;
