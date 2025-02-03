// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

export const getTime = () => {
  return new Date()
  .toLocaleDateString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  .toLocaleLowerCase();
}

// export const getChats = async (userId, groupId, lastMessageId) => {
//   const msgData = {
//     user: userId,
//     groupId,
//     lastMessageId: lastMessageId
//   }
//   const response = await fetch("http://localhost:5000/getThread",{
//       method: "POST",
//       body: JSON.stringify(msgData),
//       headers: {
//           'Content-Type': 'application/json'
//       }
//   });
//   const data = await response.json();
//   const tt = new Date();
//   if(data.threads) {
//     dispatch(chatActions.setNewChats(data.threads));
//   } else {
//     //
//   }
// };

