// import { uiActions } from "./ui-slice";
// import { cartActions } from "./cartReducer";

// // import { useDispatch } from 'react-redux';

// // const dispatch = useDispatch();

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         status: "fetching",
//         title: "fetching ...",
//         message: "fetching cart data",
//       })
//     );
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://atomic-matrix-193707-default-rtdb.firebaseio.com/cart.json"
//       );
//       if (!response.ok) {
//         throw new Error("Could not fetch data");
//       }
//       const data = await response.json();
//       dispatch(cartActions.setCart({
//         items: data.items || [],
//         totalItems: data.totalItems || 0,
//       }));

//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "fetching cart data successful",
//         })
//       );
//     };
//     try {
//       fetchData();
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "failed",
//           title: "fetching failed!",
//           message: "fetching cart data failed.",
//         })
//       );
//     }
//   };
// };

// export const sendCartData = (cart) => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         status: "pending",
//         title: "sending...",
//         message: "Sending cart data!",
//       })
//     );

//     const sendRequest = async () => {
//       const response = await fetch(
//         "https://atomic-matrix-193707-default-rtdb.firebaseio.com/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify({
//             items: cart.items,
//             totalItems: cart.totalItems,
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Sending cart data failed.");
//       }
//       const data = await response.json();
//     };

//     try {
//       await sendRequest();
//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "Sent cart data succesfully!",
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "Error!",
//           message: "Sending cart data failed!",
//         })
//       );
//     }
//   };
// };
