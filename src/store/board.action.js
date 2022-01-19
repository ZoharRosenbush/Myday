import { boardService } from "../services/board.service.js";



export function loadBoard(boardId) {
    console.log('boardId:', boardId);
    
  return async (dispatch) => {
    try {
        const board = await boardService.getById(boardId);
        console.log('board:',board );
        dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log("cannot find board:", err);
      throw err;
    }
  };
}

// export function loadToys() {
//   return async (dispatch) => {
//     try {
//       const toys = await toyService.query();
//       const action = { type: "SET_TOYS", toys: toys };
//       dispatch(action);
//     } catch (err) {
//       console.log("cannot find toys", err);
//       throw err;
//     }
//   };
// }
// export function removeBoard(boardId) {
//   return async (dispatch) => {
//     try {
//       // const removedToy =
//       await toyService.remove(toyId);
//       dispatch({ type: "REMOVE_TOY", toyId: toyId });
//       // dispatch({
//       //   type: "SET_MSG",
//       //   msg: { txt: "toy Removed", type: "success" },
//       // });
//     } catch (err) {
//       console.log("Cannot remove toy", err);
//     }
//   };
// }

// export function toggleToy(toy) {
//   return async (dispatch) => {
//     const toyToSave = { ...toy, isDone: !toy.isDone };
//     try {
//       const savedToy = await toyService.save(toyToSave);

//       dispatch({ type: "UPDATE_TODO", toy: savedToy });
//       // dispatch({
//       //   type: "SET_MSG",
//       //   msg: { txt: "toy Update", type: "success" },
//       // });
//     } catch (err) {
//       console.log("err:", err);

//       // dispatch({
//       //   type: "SET_MSG",
//       //   msg: { txt: "toy did not Update", type: "danger" },
//       // });
//     }
//   };
// }

// export function setFilter(currFilterBy) {
//   return (dispatch) => {
//     dispatch({ type: "SET_FILTER", currFilterBy: currFilterBy });
//   };
// }

// export function updateFilter(currFilterBy) {
//   return async (dispatch) => {
//     try {
//       const toys = await toyService.query(currFilterBy);
//       const action = { type: "SET_TOYS", toys };
//       dispatch(action);
//     } catch (err) {
//       console.log("Cannot updae filter", err);
//     }
//   };
// }

// export function addToy(toy) {
//   return async (dispatch)  =>{
//     try{
//       const savedToy = await toyService.save({ ...toy })
//       const action = { type: "ADD_TOY", toy: savedToy };
//       dispatch(action);
//     }
//         // dispatch({
//         //   type: "SET_MSG",
//         //   msg: { txt: "toy added", type: "success" },
//         // });

//   catch(err) {
//     console.log('Cannot add toy', err);
//         // showErrorMsg("Cannot add toy");
//       }
//   };
// }

// export function closeMsg ()  {
//   return (dispatch) => {
// dispatch({ type: 'SET_MSG', msg: null })
//   }
// }
