import { Link } from "react-router-dom";
import { SquarePlus } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
	return (
		<div className="flex justify-between items-center p-4 mb-10">
			<Link
				to="/"
				className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-2xl sm:text-3xl font-bold uppercase"
			>
				Product Store 🛒
			</Link>
			<div className="flex">
				<Button
					asChild
					variant="outline"
					size={"icon"}
					className="w-12 h-12 mr-2 border-0 shadow-sm"
				>
					<Link to="/create">
						<SquarePlus className="!w-10 !h-10" />
					</Link>
				</Button>
				<ModeToggle />
			</div>
		</div>
	);
};
export default Navbar;
