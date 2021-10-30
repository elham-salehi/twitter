import React from 'react';
import Layout from "./layout/Layout";
import {BrowserRouter, Route, Switch,Redirect} from "react-router-dom";
import Home from "../pages/home/Home";
import Page404 from "../pages/page404/Page404";
import TwitsByHashTag from "../pages/twitsByHashTag/TwitsByHashTag";
import TwitsByUser from "../pages/twitsByUser/TwitsByUser";
import AuthPage from "../pages/auth/AuthPage";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {TwitProvider} from "../context/TwitContext";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <PublicRoute path={"/login"} component={AuthPage}/>
                    <PrivateRoute path={"/"} render={()=>
                        <TwitProvider>
                            <Layout>
                                <Switch>
                                    <Route exact path={"/"} component={Home}/>
                                    <Route exact path={"/hashtags/:hashtag"} component={TwitsByHashTag}/>
                                    <Route exact path={"/users/:id/:name"} component={TwitsByUser}/>
                                    <Route  component={Page404}></Route>
                                </Switch>
                            </Layout>
                        </TwitProvider>
                 }/>
                </Switch>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
};
const isLogin = () => !!localStorage.getItem("x-auth-token");

const PublicRoute = ({component,...props}) => {
    return <Route {...props} render={(props) => {

        if(isLogin()) {
            return <Redirect to={"/"}/>

        }
        else {
             return React.createElement(component,props);
        }

    }}/>
};
const  PrivateRoute = ({render,...props}) => {
    return <Route {...props} render={(props) => {
        if(isLogin())
            return render(props);
        else return <Redirect to={"/login"}/>
    }}/>
    };


export default App;