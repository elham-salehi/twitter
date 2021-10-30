import React, {useEffect, useRef, useState} from 'react';
import useStyles from "./style";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link} from "react-router-dom";
import {getUsers} from "../../api/api_twit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {uploadUserPhoto} from "../../api/apiAuth";
import {toast} from "react-toastify";


const Twitter = ({name,id,img}) =>{
    const classes=useStyles();
    const getImage = () => {
        if(img)
            return img;
        return "/images/person.png";
    }
    return <ButtonBase><Grid container className={classes.twitterParent}>
        <img src={getImage()} className={classes.twitterImg} alt={name}/>
        <Grid item container direction={"column"} style={{width:"max-content"}} alignItems={"flex-start"}  className={classes.twitterNameParent}>
            <Typography className={classes.profName}>{name}</Typography>
            <Typography className={classes.profId}>{id}</Typography>
        </Grid>
    </Grid>
    </ButtonBase>
}
const LeftSidebar = () => {

    const classes=useStyles();
    const [users,setUsers]=useState([]);
    const [imageFile,setImageFile]=useState();
    const [imagePath,setImagePath]=useState();
    const  [anchorMenu,setAnchorMenu]=useState(null);
    const inputRef = useRef();

    useEffect( () => {
       getUsers((isOk,data) => {
           if(!isOk)
               return toast.error("ناموفق!");
           setUsers(data);
       })
    },[]);
    const handleToggleMenu= (e) => {
        if (anchorMenu)
            setAnchorMenu(null);
        else
            setAnchorMenu(e.currentTarget);
    };
    const handleAvatarChange = (e) => {
        if(e.target.files && e.target.files.length >0){

           setImageFile(e.target.files[0])
            const reader = new FileReader();
           reader.onload = (e) => {
                setImagePath(e.target.result);
           };
           reader.readAsDataURL(e.target.files[0]);
           const formData = new FormData();
           formData.append("image",e.target.files[0]);
           uploadUserPhoto(formData,(isOk,data)=>{
               if(!isOk)
                   return toast.error(data);
               toast.success("عکس شما با موفقیت آپلود شد!");
               localStorage.setItem("image",data.imagePath);
            })
        }
    }
    const getImage = () => {
        if(imagePath)
            return imagePath;
        if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined")
            return localStorage.getItem("image");
        return "/images/user-profiles.png";
    }
    return (
        <div className={classes.root}>
            <Grid container direction={"row-reverse"} onClick={handleToggleMenu}>
                <img src={getImage()} style={{width:50,height:50,borderRadius:'50%'}} alt={localStorage.getItem("name")}/>
                <Grid item container direction={"column"}  className={classes.profText}>
               <Typography className={classes.profName}>{localStorage.getItem("name")}</Typography>
               <Typography className={classes.profId}>{localStorage.getItem("username")}</Typography>
                </Grid>
                <input ref={inputRef} type={'file'} style={{display: 'none'}} onChange={handleAvatarChange}/>
            </Grid>
            <Grid container direction={"column"} className={classes.twitterRoot}>
                <Typography className={classes.twitterTitle}>
                    بهترین خبرنگاران
                </Typography>
                <Divider/>
                {
                    users.map((item,index) => {
                        return (<Link to={`/users/${item._id}/${item.name}`} style={{width: "100%"}}>
                        <Twitter name={item.name} id={item.username} img={item.image}/>
                            {index !== users.length - 1 &&
                            <Divider/>
                            }
                        </Link>)
                    })
                }

            </Grid>
            <Menu open={Boolean(anchorMenu)} onClose={() => setAnchorMenu(null)} anchorEl={anchorMenu}>
                <MenuItem onClick={() => {
                   inputRef.current.click();
                }}>ویرایش عکس پروفایل</MenuItem>
                <MenuItem onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}>خروج</MenuItem>
            </Menu>
        </div>
    );
};
export default LeftSidebar;