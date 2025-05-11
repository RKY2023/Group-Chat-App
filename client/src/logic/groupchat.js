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
export const formatTime = (time) => {
  return new Date(time).toLocaleDateString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).toLowerCase();
};

// export const getChats = async (userId, groupId, lastMessageId) => {
//   console.log('getchat called');
//   const msgData = {
//     user: userId,
//     groupId,
//     lastMessageId: lastMessageId
//   }
//   console.log(msgData);
//   const response = await fetch(`${process.env.REACT_APP_API_URL}`+"/getThread",{
//       method: "POST",
//       body: JSON.stringify(msgData),
//       headers: {
//           'Content-Type': 'application/json'
//       }
//   });
//   const data = await response.json();
//   const tt = new Date();
//   console.log(tt.getMinutes(), tt.getSeconds());
//   if(data.threads) {
//     dispatch(chatActions.setNewChats(data.threads));
//   } else {
//     //
//   }
//   console.log('Threads =>',data.threads);
// };

