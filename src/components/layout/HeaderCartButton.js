import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../cart/CartIcon";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnPop, setBtnPop] = useState(false);
  const ctxCart = useContext(CartContext);
  const numOfCartItems = ctxCart.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const { items } = ctxCart;

  const btnClasses = `${classes.button} ${btnPop ? classes.bump : ""}`;

  useEffect(() => {
    if (ctxCart.items.length === 0) return;
    else {
      setBtnPop(true);
    }
    const timer = setTimeout(() => {
      setBtnPop(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
