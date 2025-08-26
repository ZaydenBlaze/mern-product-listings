import { create } from "zustand";
import { type Product } from "@/lib/types";

type ApiResult = { success: boolean; message: string };

type ProductStore = {
	products: Product[];
	setProducts: (products: Product[]) => void;
	createProduct: (newProduct: Omit<Product, "_id">) => Promise<ApiResult>;
	fetchProducts: () => Promise<void>;
	deleteProduct: (pid: string) => Promise<ApiResult>;
	updateProduct: (
		pid: string,
		updatedProduct: Omit<Product, "_id">
	) => Promise<ApiResult>;
};

export const useProductStore = create<ProductStore>((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			return { success: false, message: "Please fill in all fields." };
		}

		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] })); // In data.data, first data is the response object. Second data is the property "data" of the response object. See backend/controllers/product.controller.js for this 2nd data.
		return { success: true, message: "Product created successfully." };
	},
	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({
			// Update the UI immediately without needing a refresh.
			products: state.products.filter((product) => product._id !== pid),
		}));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		if (
			!updatedProduct.name ||
			!updatedProduct.price ||
			!updatedProduct.image
		) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// Update the UI immediately without needing a refresh.
		set((state) => ({
			// Only with this set state line will UI be updated automatically when product is deleted
			products: state.products.map((product) =>
				product._id === pid ? data.data : product
			),
		}));
		return { success: true, message: data.message };
	},
}));
