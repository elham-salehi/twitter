import React, {useEffect, useState} from 'react';
import useStyles from "../home/style";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TwitList from "../home/components/TwitList";
import PersonIcon from "@material-ui/icons/Person"
import {getTwitsByUserRequest} from "../../api/api_twit";
import {useLocation} from 'react-router-dom';
import {Typography} from "@material-ui/core";

const TwitsByUser = (props) => {
    const location=useLocation();
    const classes= useStyles();

    const [twits,setTwits]=useState([]);
    useEffect( () => {
        getTwitsByUserRequest(props.match.params.id,(isOk,data) => {
            if(!isOk)
                return alert(data.message)
            else setTwits(data);
        })
    },[location]);

    return (
        <div className={classes.root}>
            <Header title={props.match.params.name} icon={<PersonIcon/>}/>
            <Divider className={classes.divider}/>
            {twits.length === 0 &&
            <Typography>این کاربر تا به حال توییت نکرده است!</Typography>
            }
            <TwitList data={twits}/>
        </div>
    );
};

export default TwitsByUser;