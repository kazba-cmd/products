import React from 'react';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Container from "@material-ui/core/Container";
import {Route, Switch} from "react-router-dom"
import Products from "./containers/Products/Products";
import NewProduct from "./containers/NewProduct/NewProduct";
import Register from "./containers/User/Register";
import Login from "./containers/User/Login";
import {useSelector} from "react-redux";
import OneProduct from './containers/OneProduct/OneProduct';

const App = () => {
    const user = useSelector(store => store.users.user);
    return (
        <>
            <header><AppToolbar user={user}/></header>
            <main>
                <Container>
                    <Switch>
                        <Route path="/" exact component={Products} />
                        <Route path="/products/new" exact component={NewProduct} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/products/:id" exact component={OneProduct} />
                    </Switch>
                </Container>
            </main>
        </>
    )
};

export default App;
