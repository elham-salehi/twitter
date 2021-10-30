import React, {useEffect} from 'react';
import useStyles from "./style";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import NewTwit from "./components/NewTwit";
import TwitList from "./components/TwitList";
import HomeIcon from '@material-ui/icons/Home'
import {getAllTwits} from "../../api/api_twit";
import {setTwitList, useTwitDispatch, useTwitState} from "../../context/TwitContext";

const Home = () => {
    const classes= useStyles();
    const twitDispatch=useTwitDispatch();
    const {twitList: twits}=useTwitState();
    //const [twits,setTwits]=useState([]);
    useEffect( () => {
      updateTwits();
    },[]);
    const updateTwits = () => {
        getAllTwits((isOk,data) => {
            if(!isOk)
                return alert(data.message);
            setTwitList(twitDispatch,data);
        })
    }
    return (
        <div className={classes.root}>
           <Header title={"خانه"} icon={<HomeIcon/>}/>
           <Divider className={classes.divider}/>
           <NewTwit updateTwits={updateTwits}/>
           <TwitList data={twits}/>
        </div>
    );
};

export default Home;