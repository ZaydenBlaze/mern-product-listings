import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/product/productSlice";

const store = configureStore({
	reducer: { products: productsReducer },
});

export default store;
/* Below from https://react-redux.js.org/using-react-redux/usage-with-typescript */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
