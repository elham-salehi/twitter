import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Button} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import {toast} from "react-toastify";
import {loginApi, registerApi} from "../../api/apiAuth";


const LOGIN_TAB_VALUE= 1;
const REG_TAB_VALUE= 2;

const AuthPage = () => {
    const classes= useStyles();
    const [tab,setTab]= useState(LOGIN_TAB_VALUE);

    //login state
    const [usernameLogin,setUsernameLogin]=useState();
    const [passwordLogin,setPasswordLogin]=useState();

    //register state
    const [fullNameRegister,setFullNameRegister]=useState();
    const [usernameRegister,setUsernameRegister]=useState();
    const [passwordRegister,setPasswordRegister]=useState();
    const [confPasswordRegister,setConfPasswordRegister]=useState();

    const handleChangeTab =(e,newValue) => {
        setTab(newValue);
    };
    const validateLogin=(user) => {
        if(!user.username)
            return "نام کاربری را وارد کنید!"
        if(!user.password)
            return "رمز عبور را وارد کنید!"
    };
    const validateRegister=(user) => {
        if(!user.username)
            return "نام کاربری را وارد کنید!"
        if(!user.name)
            return "نام خود را وارد کنید!"
        if(!user.password)
            return "رمز عبور را وارد کنید!"
        if(user.password!==user.confPasswordRegister)
            return "رمزها باید مشابه باشند!!"
    };

    const handleRegister = () => {
        const user= {
            name: fullNameRegister,
            username: usernameRegister,
            password: passwordRegister,
            confPasswordRegister: confPasswordRegister,
        };
        const error = validateRegister(user);
        if(error)
            return toast.warn(error);
        user.confPasswordRegister=undefined;
        registerApi(user,(isOk,data) =>{
            if(!isOk)
                return toast.error(data);
            toast.success("شما با موفقیت ثبت نام شدید!");
            localStorage.setItem("name",data.name);
            localStorage.setItem("image",data.image);
            localStorage.setItem("username",data.username);
            localStorage.setItem("x-auth-token",data["x-auth-token"]);
            window.location.reload();
        })
    };
    const handleLogin =() => {
        const user= {
            username : usernameLogin,
            password : passwordLogin
        };
        const error=validateLogin(user);
        if(error)
            return toast.warn(error);
        loginApi(user,(isOk,data) =>{
                if(!isOk)
                    return toast.error(data);
                toast.success("شما با موفقیت وارد شدید!");
                localStorage.setItem("name",data.name);
                localStorage.setItem("image",data.image);
                localStorage.setItem("username",data.username);
                localStorage.setItem("x-auth-token",data["x-auth-token"]);
                window.location.reload();
            })
    }
    return (
        <Paper className={classes.container}>
            <Typography className={classes.headerText}>به توییتر فارسی خوش آمدید!</Typography>
            <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChangeTab}
            aria-label="disabled tabs example"
            >
                <Tab label="ورود" value={LOGIN_TAB_VALUE} className={classes.tab}></Tab>
                <Tab label="ثبت نام" value={REG_TAB_VALUE} className={classes.tab}></Tab>
            </Tabs>
            {tab===LOGIN_TAB_VALUE &&
            <div className={classes.containerInput}>
                <Typography>نام کاربری</Typography>
                <Input className={"uni_m_b_small"}
                value={usernameLogin} onChange={e => setUsernameLogin(e.target.value)}></Input>
                <Typography>رمز عبور</Typography>
                <Input className={"uni_m_b_small"}
                       value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)}></Input>
                <Button variant={"contained"} color={"primary"} onClick={handleLogin}>ورود</Button>

            </div>
            }
            {tab===REG_TAB_VALUE &&
            <div className={classes.containerInput}>
                <Typography>نام کامل</Typography>
                <Input className={"uni_m_b_small"}
                    value={fullNameRegister} onChange={e => setFullNameRegister(e.target.value)}></Input>
                <Typography>نام کاربری</Typography>
                <Input className={"uni_m_b_small"}
                       value={usernameRegister} onChange={e => setUsernameRegister(e.target.value)}></Input>
                <Typography>رمز عبور</Typography>
                <Input className={"uni_m_b_small"}
                       value={passwordRegister} onChange={e => setPasswordRegister(e.target.value)}></Input>
                <Typography>تکرار رمز عبور</Typography>
                <Input className={"uni_m_b_small"}
                       value={confPasswordRegister} onChange={e => setConfPasswordRegister(e.target.value)}></Input>
                <Button variant={"contained"} color={"primary"} onClick={handleRegister}>ثبت نام</Button>
            </div>
            }
        </Paper>
    );
};

export default AuthPage;