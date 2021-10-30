import React from 'react';
import Grid from "@material-ui/core/Grid";
import {IconButton} from "@material-ui/core";
import useStyles from "../style";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite"
import {likeTwit, setTwitText, useTwitDispatch} from "../../../context/TwitContext";
import {likeTwitRequest} from "../../../api/api_twit";
import {toast} from "react-toastify";

const Twit = ({data}) => {
    const twitDispatch = useTwitDispatch(), renderTwit = (text) => {
        return {__html: text.replace(/#\S+/g, "<a href='tags/$&' style='color:cornflowerblue'>$&</a>")};

    }, getImage = () => {
        if (data.user.image)
            return data.user.image;
        else return "/images/person.png";
    }, handleLike = () => {
        likeTwitRequest(data._id,(isOk,data) => {
            if(!isOk)
                return toast.error(data);
           likeTwit(twitDispatch,data._id);
        });

    }, retwitClick = () => {
        setTwitText(twitDispatch, data.text);

    }, classes = useStyles();
    return (
        <div className={classes.twitItem}>
            <Grid container>
                    <img src={getImage()} style={{height:60,width:60,borderRadius:'50%'}} alt={data.user.name}/>
                <Grid item container direction={"column"} style={{flex: 1,marginRight: '1rem'}}>
                    <Grid item container>
                        <Typography className={classes.twitItemName}>{data.user.name}</Typography>
                        <Typography className={classes.twitItemId}>{data.user.id}</Typography>
                    </Grid>
                    <Typography dangerouslySetInnerHTML={renderTwit(data.text)} className={classes.twitText} component={"p"}></Typography>
                    {data.image &&
                    <div>
                        <div style={{backgroundImage:`url(${data.image})`}} className={classes.twitImg}></div>
                    </div>
                    }
                </Grid>
            </Grid>
                <Grid container direction={"row-reverse"} style={{marginTop:16}} alignItems={"center"}>
                    <IconButton className={classes.newTwitImgBtn} onClick={retwitClick}>
                        <img src={"/images/retwit.png"} alt={"retwit"}/>
                    </IconButton>
                    <IconButton  className={classes.newTwitImgBtn} onClick={handleLike}>
                        <FavoriteIcon/>
                    </IconButton>
                    <Typography className={classes.likeCount}>
                        {data.likes}
                    </Typography>
                </Grid>
        </div>
    );
};

export default Twit;