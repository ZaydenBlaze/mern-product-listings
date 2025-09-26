import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type Product } from "@/lib/types";

/* Guide: https://redux.js.org/usage/writing-logic-thunks#using-createasyncthunk */
export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (_, thunkAPI) => {
		try {
			const res = await fetch("/api/products");
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const { data: products } = await res.json(); // rename data while destructuring
			return products;
		} catch (error) {
			console.error("Error in fetchProducts:", (error as Error).message);
			return thunkAPI.rejectWithValue("Unable to fetch products"); // value passed here ends up in action.payload
		}
	}
);

export const createProduct = createAsyncThunk(
	"products/createProduct",
	async (newProduct: Omit<Product, "_id">, thunkAPI) => {
		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`); // TODO add text error msg?? security violation?
			}
			const { data: createdProduct } = await res.json(); // rename while destructuring
			return createdProduct;
		} catch (error) {
			console.error("Error in createProduct:", (error as Error).message);
			return thunkAPI.rejectWithValue("Unable to create product");
		}
	}
);

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (pid: string, thunkAPI) => {
		try {
			const res = await fetch(`/api/products/${pid}`, {
				method: "DELETE",
			});
			if (!res.ok) {
				const { message } = await res.json();
				throw new Error(
					`HTTP error! status: ${res.status}, message: ${message}`
				);
			}

			return pid;
		} catch (error) {
			console.error("Error in deleteProduct:", (error as Error).message);
			return thunkAPI.rejectWithValue("Unable to delete product");
		}
	}
);

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async (updatedProduct: Product, thunkAPI) => {
		try {
			const res = await fetch(`/api/products/${updatedProduct._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProduct),
			});
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`); // TODO add text error msg?? security violation?
			}
			return updatedProduct;
		} catch (error) {
			console.error("Error in updateProduct:", (error as Error).message);
			return thunkAPI.rejectWithValue("Unable to update product");
		}
	}
);

type TInitialState = {
	products: Product[];
};

const initialState: TInitialState = {
	products: [],
};

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.products = action.payload;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.products = state.products.filter(
					(product) => product._id !== action.payload
				);
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.products = state.products.map((product) => {
					return product._id === action.payload._id
						? action.payload
						: product;
				});
			});
	},
});

export default productSlice.reducer;
