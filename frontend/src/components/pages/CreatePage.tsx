import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
// import { useProductStore } from "../../store/product.ts";
import { useAppDispatch } from "@/app/hooks";
import { createProduct } from "@/features/product/productSlice";

const CreatePage = () => {
	const [formData, setFormData] = React.useState({
		name: "",
		price: "",
		image: "",
	});

	// const { createProduct } = useProductStore();
	const dispatch = useAppDispatch();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!formData.name || !formData.price || !formData.image) {
			return toast.warning("Please fill in all fields.");
		}
		const formDataToSubmit = { ...formData, price: Number(formData.price) }; // Change price from String to Number before sending to the server (price is intialized as an empty string so that a new form's price field is empty)

		try {
			await dispatch(createProduct(formDataToSubmit)).unwrap(); // unwrap() throws error if the thunk was rejected
			toast.success("Product added.");
		} catch (rejectedValue) {
			const errorMessage = rejectedValue as string; // Type assertion
			toast.error("Something went wrong", {
				description: errorMessage,
			});
		}

		setFormData({
			name: "",
			price: "",
			image: "",
		});
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.id]: e.target.value,
			};
		});
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center"
			>
				<div className="grid w-full max-w-sm items-center gap-3 mb-6">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						value={formData.name}
						onChange={handleChange}
						type="text"
						placeholder="Name"
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-3 mb-6">
					<Label htmlFor="price">Price</Label>
					<Input
						id="price"
						value={formData.price}
						onChange={handleChange}
						type="number"
						placeholder="Price"
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-3 mb-8">
					<Label htmlFor="image">Image</Label>
					<Input
						id="image"
						value={formData.image}
						onChange={handleChange}
						type="text"
						placeholder="Image URL"
					/>
				</div>
				<Button type="submit">Add Product</Button>
			</form>
		</>
	);
};
export default CreatePage;
