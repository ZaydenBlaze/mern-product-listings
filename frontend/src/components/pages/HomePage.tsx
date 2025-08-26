import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "../ui/ProductCard";
import { useProductStore } from "@/store/product";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

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
					<div className="flex items-center">
						<p className="mr-4">No products found 😢</p>
						<Button asChild>
							<Link to="/create">Create a product</Link>
						</Button>
					</div>
				)}
			</div>
		</>
	);
};
export default HomePage;
