import { uiAction } from './ui-slice';
import { cartAction } from './cart-slice'
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch(
                'https://react-meals-68482-default-rtdb.firebaseio.com/cart.json'
            );
            if (!res.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await res.json();
            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(
                cartAction.replaceCart({
                    items: cartData.items || [],
                    totalQuantity:cartData.totalQuantity
                })
            );
        } catch (error) {
            dispatch(
                uiAction.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Fetching cart data failed!',
                })
              );
          }
    }
}
export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiAction.showNotification({
            status: 'pending',
            title: 'pending',
            message: 'Sending cart data!'
        }));
        const sendRequest = async () => {
            console.log(cart)
            const res = await fetch('https://react-meals-68482-default-rtdb.firebaseio.com/cart.json', {
            method: 'PUT',
            body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity
            }),
        })
        if (!res.ok) {
            throw new Error("Sending cart data failed!");
          }
        }
        try {
            await sendRequest();
            dispatch(uiAction.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            })
            );
        }
        catch (error) {
            dispatch(uiAction.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
              })
              );
         }
        } 
}
