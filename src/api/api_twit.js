 import { getAxiosInstanceApi } from "./api";


export const getAllTwits= (callback) => {
    getAxiosInstanceApi().post("/getAllTweet")
        .then(response => {
            const data = response.data;
            callback(true,data);
        }).catch(error => {
        console.log(error);
        callback(false,error);
    })
};
 export const getTwitsByHashTagRequest= (hashTag,callback) => {
     getAxiosInstanceApi().post("/getAllTweet",{hashTag})
         .then(response => {
             const data = response.data;
             callback(true,data);
         }).catch(error => {
         console.log(error);
         callback(false,error);
     })
 };
 export const getTwitsByUserRequest= (user,callback) => {
     getAxiosInstanceApi().post("/getAllTweet",{user})
         .then(response => {
             const data = response.data;
             callback(true,data);
         }).catch(error => {
         console.log(error);
         callback(false,error);
     })
 };

export const getHashTags= (callback) => {
    getAxiosInstanceApi().get("getAllHashTags")
        .then(response =>{
            const data= response.data;
            callback(true,data);
        }).catch(error =>{
        console.log(error);
        callback(false,error)
    })

};
export const getUsers= (callback) => {
    getAxiosInstanceApi().get("getAllUser")
        .then(response =>{
            const data= response.data;
            callback(true,data);
        }).catch(error =>{
        console.log(error);
        callback(false,error)
    })

};
export const newTwitRequest= (data,callback) => {
    getAxiosInstanceApi().post("newTweet",data)
        .then(response => {
            const data = response.data;
            callback(true,data);
        }).catch(error => {
        console.log(error);
        callback(false,error);
    })

};
 export const likeTwitRequest= (id,callback) => {
     getAxiosInstanceApi().get("likeTweet/"+id)
         .then(response => {
             const data = response.data;
             callback(true,data);
         }).catch(error => {
         console.log(error);
         callback(false,error);
     })

 };