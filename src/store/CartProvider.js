import CartContext from "./cart-context";
import { useReducer } from "react";

const CART_ACTIONS = {
  add: "INSERT_ITEM",
  remove: "REMOVE_ITEM",
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  let updatedTotalAmount;
  let cartItemIndex;
  let cartItem;
  let updatedItem;

  switch (action.type) {
    case CART_ACTIONS.add:
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      cartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      cartItem = state.items[cartItemIndex];

      if (cartItem) {
        updatedItem = {
          ...cartItem,
          amount: cartItem?.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[cartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case CART_ACTIONS.remove:
      cartItemIndex = state.items.findIndex((item) => item.id === action.id);
      cartItem = state.items[cartItemIndex];
      updatedTotalAmount = state.totalAmount - cartItem.price;

      if (cartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item !== action.id);
      } else {
        updatedItem = { ...cartItem, amount: cartItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[cartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: CART_ACTIONS.add, item: item });
  };
  const removeItemFromCart = (id) => {
    dispatchCart({ type: CART_ACTIONS.remove, id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
