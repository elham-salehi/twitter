import React from "react";
import {getHashTags} from "../api/api_twit";

var TwitStateContext = React.createContext();
var TwitDispatchContext = React.createContext();


function twitReducer(state, action) {
  switch (action.type) {
    case "SET_TWIT_TEXT":
      return {...state, twitText: action.payload};
    case "SET_TWIT_LIST":
      return {...state, twitList: action.payload};
    case "SET_HASHTAG_LIST":
      return {...state, hashTags: action.payload};
    case "LIKE_TWIT":
          const twitId= action.payload;
         const foundIndex= state.twitList.findIndex(item=>item._id===twitId);
          if(foundIndex===-1)
              return state;
          return {...state, twitList:[...state.twitList.slice(0,foundIndex),{...state.twitList[foundIndex],likes: state.twitList[foundIndex].likes+1},...state.twitList.slice(foundIndex+1)]};
          return {...state, twitText:action.payload}
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TwitProvider({children}) {
  var [state, dispatch] = React.useReducer(twitReducer, {
      twitText: '',
      twitList: [],
      hashTags: []
  });
  return (
    <TwitStateContext.Provider value={state}>
      <TwitDispatchContext.Provider value={dispatch}>
        {children}
      </TwitDispatchContext.Provider>
    </TwitStateContext.Provider>
  );
}

function useTwitState() {
  var context = React.useContext(TwitStateContext);
  if (context === undefined) {
    throw new Error("useTwitState must be used within a TwitProvider");
  }
  return context;
}

function useTwitDispatch() {
  var context = React.useContext(TwitDispatchContext);
  if (context === undefined) {
    throw new Error("useTwitDispatch must be used within a TwitProvider");
  }
  return context;
}

export {TwitProvider, useTwitState, useTwitDispatch, setTwitText,likeTwit,setTwitList, setHashTagList, updateHashTagList};

// ###########################################################
function setTwitText(dispatch,twitText) {
    dispatch({
        type: "SET_TWIT_TEXT",
        payload: twitText
    });
}
function likeTwit(dispatch,id) {
    dispatch({
        type: "LIKE_TWIT",
        payload: id
    });
}
function setTwitList(dispatch,list) {
    dispatch({
        type: "SET_TWIT_LIST",
        payload: list
    });
}
function setHashTagList(dispatch,list) {
    dispatch({
        type: "SET_HASHTAG_LIST",
        payload: list
    });
}
function updateHashTagList(dispatch,list) {
    getHashTags((isOk,data)=> {
        if(isOk){
            dispatch({
                type: "SET_HASHTAG_LIST",
                payload: data
            });
        }
    })
}




