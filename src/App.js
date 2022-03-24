import Header from "./components/Layout/Header";
import React, { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [modalVisibilty, setModalVisibility] = useState(false);

  const showCartHandler = () => {
    setModalVisibility(true);
  };

  const hideCartHandler = () => {
    setModalVisibility(false);
  };

  return (
    <CartProvider>
      {modalVisibilty && <Cart onClose={hideCartHandler}></Cart>}
      <Header onShow={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
