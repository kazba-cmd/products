import {CREATE_PRODUCT_SUCCESS, FETCH_CATEGORY_SUCCESS, FETCH_ONEPRODUCT_SUCCESS, FETCH_PRODUCTS_SUCCESS} from "../actions/productsActions";

const initialState = {
    products: [],
    product: {},
    category: []
};

const productsReducer = (state = initialState, action) => {
  switch(action.type){
      case FETCH_PRODUCTS_SUCCESS:
          return {...state, products: action.products}
        case FETCH_ONEPRODUCT_SUCCESS:
            return {...state, product: action.product}
        case CREATE_PRODUCT_SUCCESS:
            return {...state}
        case FETCH_CATEGORY_SUCCESS:
            return {...state, category: action.value}
      default:
          return state;
  }
};

export default productsReducer;