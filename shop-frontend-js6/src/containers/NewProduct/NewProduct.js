import React from 'react';
import ProductAddForm from "../../components/ProductAddForm/ProductAddForm";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {createProduct} from "../../store/actions/productsActions";
import { Fragment } from 'react';

const NewProduct = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const onProductFormSubmit = async productData => {
        await dispatch(createProduct(productData));
        setTimeout(()=> {
            props.history.push('/');
        }, 2000);
    };
    return (
        <>
            {user ? <Fragment>
                <Typography variant="h4">New product</Typography>
            <ProductAddForm onSubmit={onProductFormSubmit}/>
            </Fragment>      
              : <div>No login. Please sign in</div>}

        </>
    );
};

export default NewProduct;