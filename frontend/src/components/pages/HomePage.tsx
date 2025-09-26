import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductCard from "../ui/ProductCard";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchProducts, createProduct } from "@/features/product/productSlice";

const dummyProducts = [
	{
		name: "Laptop",
		price: 1199,
		image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
	},
	{
		name: "Wireless Earphones",
		price: 99,
		image: "https://images.unsplash.com/photo-1655804446276-7699884b469b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJwaG9uZXN8ZW58MHx8MHx8fDA%3D",
	},
	{
		name: "Tablet",
		price: 499.99,
		image: "https://images.unsplash.com/photo-1604399852419-f67ee7d5f2ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHRhYmxldHxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		name: "Smart Watch",
		price: 299,
		image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		name: "Phone",
		price: 499.99,
		image: "https://plus.unsplash.com/premium_photo-1681233751666-612c7bc77485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D",
	},
];

const HomePage = () => {
	const products = useAppSelector((state) => state.products.products);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	async function handleClickForDummyData() {
		try {
			await Promise.all(
				dummyProducts.map(
					(product) => dispatch(createProduct(product)).unwrap() // unwrap() throws error if the thunk was rejected
				)
			);
			toast.success("Dummy products added.");
		} catch (rejectedValue) {
			const errorMessage = rejectedValue as string; // Type assertion
			toast.error("Something went wrong", {
				description: errorMessage,
			});
		}
	}
	// MongoDB automatically provides an _id for every document you insert into a collection.
	const productCards = products.map((product) => (
		<ProductCard key={product._id} product={product} />
	));

	return (
		<>
			<div className="flex flex-col items-center">
				<p className="mb-10 text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">
					Current Products 🚀
				</p>
				{productCards.length !== 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20 pb-20">
						{productCards}
					</div>
				) : (
					<div className="flex flex-col items-center">
						<p className="mb-8">No products found 😢</p>
						<Button asChild>
							<Link to="/create">Create a product</Link>
						</Button>
						<p className="mb-1">or</p>
						<Button onClick={handleClickForDummyData}>
							Populate with dummy products
						</Button>
					</div>
				)}
			</div>
		</>
	);
};
export default HomePage;
