import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../../store/actions/productsActions';
import {apiURL} from "../../config";
import { Fragment } from 'react';


const OneProduct = () => {
    const dispatch = useDispatch();
    const productId = useParams();
    const product = useSelector(state => state.products.product);
    let cardImage = 'imageNotAvailable';
    if(product.image){
        cardImage = apiURL + '/uploads/' + product.image
    }
    useEffect(() => {
        dispatch(fetchOneProduct(productId.id));
    }, [dispatch])
    return (
        <Fragment>
        <div>
            <b>Product:</b> {product.title}
        </div>
        <div>
            <img width='200px' src={cardImage} alt='pic of product'/>
        </div>
        <div>
            <b>Price:</b> {product.price}
        </div>
            {product.boss ? <>
            <div>
            <b>Author: </b>{product.boss.displayName}
        </div>
        <div>
            <b>Telephone: </b>{product.boss.phoneNumber}
        </div></>: null}
        
        </Fragment>
    )
}

export default OneProduct;