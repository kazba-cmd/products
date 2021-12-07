import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategory, fetchProducts, fetchProductsByCategory} from "../../store/actions/productsActions";
import ProductItem from "./ProductItem";
import { Fragment } from 'react';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const category = useSelector(state => state.products.category);

    useEffect(()=> {
        dispatch(fetchProducts());
        dispatch(fetchCategory());
    }, [dispatch])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid>
                <Button onClick={()=>dispatch(fetchProducts())}>
                    <Typography variant='h5'>All items</Typography>
                </Button>
                    {category.map((category,index) => {
                        return (
                            <Button onClick={()=>dispatch(fetchProductsByCategory(category._id))} key={index}>
                                <Typography variant='h5'>{category.title}</Typography>
                            </Button>
                        )
                    })}
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2}>
           <Grid item container direction="row" justify="space-between" alignItems="center">
               <Grid item>
                   <Typography variant="h4">
                       Products
                   </Typography>
               </Grid>
               <Grid item>
                   <Button color="primary" component={Link} to={"/products/new"}>Add product</Button>
               </Grid>
           </Grid>
           <Grid item container direction="row" spacing={1} >
               {products.map(product => (
                    <ProductItem
                        key={product._id}
                        id={product._id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                    />
               ))}
           </Grid>
       </Grid>
        </Fragment>
       
    );
};

export default Products;