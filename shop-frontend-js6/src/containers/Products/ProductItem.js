import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import {apiURL} from "../../config";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
});

const ProductItem = ({id, title, price, image}) => {

    const classes = useStyles();
    let cardImage = 'imageNotAvilable';
    if(image){
        cardImage = apiURL + '/uploads/' + image
    }
    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card className={classes.card}>
              <CardHeader title={title} />
              <CardMedia
                  className={classes.media}
                  title={title}
                  image={cardImage}
              />
              <CardContent>
                  <strong style={{marginLeft: '10px'}}>Price: {price} KZT</strong>
              </CardContent>
              <CardActions>
                  <IconButton component={Link} to={'/products/' + id}>
                      <ArrowForwardIcon />
                  </IconButton>
              </CardActions>
          </Card>
        </Grid>
    );
};

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string
};

export default ProductItem;