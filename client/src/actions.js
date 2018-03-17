export const UPDATE_PRICE = "UPDATE_PRICE";


export const updatePrice = (ticker, price) => ({ type: UPDATE_PRICE, ticker, price });
