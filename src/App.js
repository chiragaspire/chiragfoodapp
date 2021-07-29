import React, { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData  } from './store/cart-actions';

let isInitial = true;
function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    dispatch(fetchCartData());
    
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
      
    
  }, [cart, dispatch]);
  

  return (
    <>
      {notification && <Notification
        message={notification.message}
        title={notification.title}
        status={notification.status}
      />}
    <Layout>
     {showCart && <Cart />} 
      <Products />
      </Layout>
      </>
  );
}

export default App;
