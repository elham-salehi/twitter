import React, {useEffect} from 'react';
import useStyles from "../home/style";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TwitList from "../home/components/TwitList";
import {getTwitsByHashTagRequest} from "../../api/api_twit";
import {toast} from "react-toastify";
import {setTwitList, useTwitDispatch, useTwitState} from "../../context/TwitContext";
import {useLocation} from 'react-router-dom';
const TwitsByHashTag = (props) => {

    const location=useLocation();
    const {twitList}= useTwitState();
    const twitDispatch= useTwitDispatch();
    useEffect( () => {
        getTwitsByHashTagRequest(props.match.params.hashtag,(isOk,data) => {
           if(!isOk)
               return toast.error(data);
                setTwitList(twitDispatch,data);
       })
    },[location]);

    const classes= useStyles();
    return (
        <div className={classes.root}>
            <Header title={props.match.params.hashtag} icon={<img src={"/images/hashtag.png"}/>}/>
            <Divider className={classes.divider}/>
            <TwitList data={twitList}/>
        </div>
    );
};

export default TwitsByHashTag;