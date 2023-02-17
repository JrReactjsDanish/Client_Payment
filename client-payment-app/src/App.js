import React, { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function App() {
  const publishableKey =
    'pk_test_51Mc5pVHKD8d0WgyIsuvpD7o9cu7IEJku4DUiuyxyjdilkkuHT6Z8GTKzp82I9uHHgQsiXR5bFRS7Stci3PwcDXJF00VI4k0xf7';

    const [product] = useState({
      product: "Game",
      name: "Spiderman: Miles Morales",
      price: 100,
    });
  const priceForStripe = product.price * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
        console.log("response", response)
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h2>Client Payment App</h2>
      <p>
        <span style={{fontWeight: 700}}>Product </span>
        {product.product}
      </p>
      <p>
        <span style={{fontWeight: 700}}>Product name </span>
        {product.name}
      </p>
      <p>
        <span style={{fontWeight: 700}}>Price </span>${product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default App;
