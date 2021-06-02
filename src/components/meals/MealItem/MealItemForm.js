import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../ui/Input";
const MealItemForm = (props) => {
  const [amountValid, setAmountValid] = useState(true);
  const amountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const inputAmount = amountRef.current.value;
    const inputNumber = +inputAmount;

    if (inputAmount.trim().length === 0 || inputNumber < 1 || inputNumber > 5) {
      setAmountValid(false);
      return;
    }

    props.onAddToCart(inputNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {!amountValid && <p>Please enter an amount between 1 and 5</p>}
    </form>
  );
};
export default MealItemForm;
