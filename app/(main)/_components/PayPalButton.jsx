import { useEffect, useRef } from "react";

const PayPalButton = () => {
  const paypalRef = useRef(null);

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        style: {
          layout: "horizontal",
          size: "responsive", // Ensures auto resizing
          shape: "rect",
          color: "gold",
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: "1.00" } }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        },
      }).render(paypalRef.current);
    }
  }, []);

  return <div ref={paypalRef} className="flex justify-center w-full max-w-[200px] md:max-w-[250px]"></div>;
};

export default PayPalButton;
