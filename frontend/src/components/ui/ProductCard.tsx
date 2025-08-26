import { useProductStore } from "@/store/product";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import EditProductDialog from "./EditProductDialog";

const ProductCard = (props) => {
	const { deleteProduct } = useProductStore();

	async function handleDeleteProduct(pid) {
		const { success, message } = await deleteProduct(pid);
		if (success) {
			// Toaster component does not need to be in the same component where you call toast() because Toaster is globally listening for toast events.
			// The Toaster just needs to be rendered somewhere higher up in the component tree (or at least somewhere that remains mounted).
			// Once it is mounted, any toast() call anywhere in the React tree can trigger it.
			toast.success("Product deleted.");
		} else {
			toast.error("Product not deleted.", {
				description: message,
			});
		}
	}

	return (
		<>
			<div className="overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card">
				<img
					className="h-48 w-full object-cover"
					src={props.product.image}
					alt=""
				/>
				<div className="flex flex-col p-4">
					<p className="mb-4 text-xl font-bold">
						{props.product.name}
					</p>
					<p className="mb-3 font-bold">${props.product.price}</p>
					<div className="flex w-50">
						<EditProductDialog {...props} />
						<Trash2
							onClick={() =>
								handleDeleteProduct(props.product._id)
							}
							className="w-7 h-7 rounded-md text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default ProductCard;
