import React from 'react';
import useStyles from "../style";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import classnames from "classnames";
import {newTwitRequest} from "../../../api/api_twit";
import {toast} from "react-toastify";
import {updateHashTagList, useTwitDispatch, useTwitState} from "../../../context/TwitContext";
import {setTwitText as setTwit} from "../../../context/TwitContext";

const NewTwit = ({updateTwits}) => {
    const inputFile=React.useRef();
    const {twitText:twit}=useTwitState();
    const twitDispatch=useTwitDispatch();
    const [imageFile,setImageFile]= React.useState();
    const [imagePath,setImagePath]= React.useState();

    const newTwitClick= () => {
        const twitText=twit;
        if(!twitText)
            return ;
        const formData= new FormData();
        formData.append("text",twitText);
        if(imageFile)
            formData.append("image",imageFile)
        newTwitRequest(formData,(isOk,data) => {
            if(!isOk)
                return toast.error(data);
            toast.success("توییت شما با موففیت ارسال شد!");
            updateTwits();
            setTwit(twitDispatch,"");
            setImagePath();
            setImageFile();
            if(twitText.include("#"))
            updateHashTagList(twitDispatch);
        })

    };
    const getImage = () => {
        if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined")
            return localStorage.getItem("image");
        return "/images/person.png";
    };
    const selectImg = () => {
        inputFile.current.click();
    }
    const onChangeImg = (e) => {
        if(e.target.files && e.target.files.length>0)
            setImageFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePath(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    const classes= useStyles();
    return (
        <div className={classes.newTwit}>
            <Grid container>
                <img src={getImage()} style={{width:60,height:60,borderRadius:'50%'}} alt={localStorage.getItem("name")}/>
                <input  className={classnames(classes.input,"editable")} placeholder={" توییت کن ..."}
                    value={twit} onChange={e => setTwit(twitDispatch,e.target.value)} />
                <input type={'file'} style={{display:'none'}} ref={inputFile} onChange={onChangeImg}/>
            </Grid>
            {imagePath &&
            <div>
                <div style={{backgroundImage:`url(${imagePath})`}} className={classes.twitImg}></div>
            </div>
            }
                <Grid container direction={"row-reverse"} style={{marginTop:16}}>
                    <Button variant={"contained"} color={"primary"}
                            className={classes.newTwitBtn} onClick={newTwitClick} >توییت</Button>
                    <IconButton className={classes.newTwitImgBtn} onClick={selectImg} onChange={onChangeImg}>
                    <img src={"images/twitpic.png"} alt={"twit"}/>
                    </IconButton>
            </Grid>
        </div>
    );
};

export default NewTwit;