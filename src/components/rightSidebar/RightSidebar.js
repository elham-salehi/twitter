import React, {useEffect} from 'react';
import {Typography} from "@material-ui/core";
import useStyles from "./style";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import {getHashTags} from "../../api/api_twit";
import {setHashTagList, useTwitDispatch, useTwitState} from "../../context/TwitContext";


const RightSidebar = () => {
    const classes=useStyles();
    const {hashTags}=useTwitState();
    const twitDispatch=useTwitDispatch();

    useEffect( () => {
        getHashTags((isOk,data) => {
            if(!isOk)
                return alert("ناموفق!");
            setHashTagList(twitDispatch,data);
        })
    },[]);

    return (
            <div className={classes.root}>
                <Link to={"/"}>
                <Grid container direction={"row"} alignItems={"center"}>
                 <Grid item>
                     <img src={"/images/logo.png"} alt={"twitter"}/>
                 </Grid>
                    <Grid item>
                        <Typography className={classes.logoType}>
                            توییتر فارسی
                        </Typography>
                    </Grid>
                </Grid>
                </Link>
                <Typography className={classes.hashTagTitle}>
                    داغ ترین هشتگ ها
                </Typography>
                <Grid container direction={"column"} alignItems={"center"}>
                    {
                        hashTags.map(item=> <ButtonBase className={classes.hashTagParent}>
                            <Link to={"/hashtags/"+item.text} style={{width : "100%"}}>
                                <Grid item container>
                                    <img src={"/images/hashtag.png"} alt={"hashtag"}/>
                                    <Typography className={classes.hashtag}>
                                        {item.text}
                                    </Typography>
                                </Grid>
                            </Link>
                            </ButtonBase>
                        )

                    }

                </Grid>
            </div>
    );
};

export default RightSidebar;