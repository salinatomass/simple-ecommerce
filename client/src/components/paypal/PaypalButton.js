import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { useCart } from "../../context/providers/CartContext";
import toast from "react-hot-toast";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PaypalComponent() {
  const history = useHistory();
  const { clearCart } = useCart();

  const createOrder = (data, actions) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const items = cart.items.map((item) => {
      return {
        unit_amount: {
          currency_code: "USD",
          value: item.price,
        },
        quantity: item.quantity,
        name: item.name,
      };
    });

    return actions.order.create({
      purchase_units: [
        {
          description: "Some Hardware Products",
          amount: {
            value: cart.totalPrice,
            currency_code: "USD",
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cart.totalPrice,
              },
            },
          },
          items,
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    await actions.order.capture();
    clearCart();
    history.push("/");
    toast.success("Successful payment", { position: "bottom-right" });
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={{
        color: "blue",
        label: "checkout",
        layout: "vertical",
        shape: "rect",
      }}
    />
  );
}

export default PaypalComponent;
