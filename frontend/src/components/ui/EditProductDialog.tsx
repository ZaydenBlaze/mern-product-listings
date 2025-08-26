import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import { useProductStore } from "@/store/product";
import { toast } from "sonner";
import { type Product } from "@/lib/types";

type EditProductDialogProps = {
	product: Product;
};

const EditProductDialog = (props: EditProductDialogProps) => {
	const [formData, setFormData] = React.useState({
		name: props.product.name,
		price: props.product.price,
		image: props.product.image,
	});

	const { updateProduct } = useProductStore();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>,
		pid: string
	) {
		// update the product
		e.preventDefault();
		const { success } = await updateProduct(pid, formData);
		if (success) {
			toast.success("Product updated.");
		} else {
			toast.warning("Product not updated.");
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	}

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<SquarePen className="w-7 h-7 mr-[0.6rem] mt-[0.07rem] rounded-md text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 cursor-pointer" />
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<form onSubmit={(e) => handleSubmit(e, props.product._id)}>
						<DialogHeader>
							<DialogTitle>Edit Product</DialogTitle>
							<DialogDescription className="mb-3">
								Edit product details and click save.
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4">
							<div className="grid gap-3">
								<Label htmlFor="name-1">Name</Label>
								<Input
									id="name-1"
									value={formData.name}
									onChange={handleChange}
									name="name"
									type="text"
									placeholder="name"
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="price-1">Price</Label>
								<Input
									id="price-1"
									value={formData.price}
									onChange={handleChange}
									name="price"
									type="number"
									placeholder="price"
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="image-1">Image</Label>
								<Input
									id="image-1"
									value={formData.image}
									onChange={handleChange}
									name="image"
									type="text"
									placeholder="Image URL"
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button type="submit">Save changes</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
export default EditProductDialog;
