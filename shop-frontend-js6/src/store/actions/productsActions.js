import axiosApi from "../../axiosApi";

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const FETCH_ONEPRODUCT_SUCCESS = 'FETCH_ONEPRODUCT_SUCCESS';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_PRODUCTS_BY_CATEGORY = 'FETCH_PRODUCTS_BY_CATEGORY';

export const fetchProductsSuccess = products => {
    return {type: FETCH_PRODUCTS_SUCCESS, products}
};

export const fetchProductsByCategory = id => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/products/categories/'+id);
            dispatch(fetchProductsSuccess(response.data));
        } catch(e) {
            console.error(e);
        }
    }
}

export const fetchOneProductSuccess = product => {
    return {type: FETCH_ONEPRODUCT_SUCCESS, product}
};

export const fetchCategorySuccess = category => {
    return {type: FETCH_CATEGORY_SUCCESS, value:category}
};

export const fetchCategory = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/categories');
            dispatch(fetchCategorySuccess(response.data));
        } catch(e) {
            console.error(e);
        }
    }
}

export const fetchProducts = () => {
  return async dispatch => {
      try {
          const response = await axiosApi.get('/products');
          dispatch(fetchProductsSuccess(response.data));
      } catch(e) {
          console.error(e);
      }
  }
};

export const fetchOneProduct = id => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/products/'+id);
            dispatch(fetchOneProductSuccess(response.data));
        } catch(e) {
            console.error(e);
        }
    }
}

export const createProductSuccess = () => ({ type: CREATE_PRODUCT_SUCCESS });
export const createProduct = productData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {"Authorization": token};
        await axiosApi.post('/products', productData, {headers});
        dispatch(createProductSuccess());
    }
}