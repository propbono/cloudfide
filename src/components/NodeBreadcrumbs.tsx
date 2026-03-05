import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
	pathParts: string[];
};

export function NodeBreadcrumbs({ pathParts }: Props) {
	return (
		<nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
			<Link
				to="/tree"
				className="flex items-center hover:text-indigo-600 transition-colors"
			>
				<Home className="w-4 h-4" />
			</Link>

			{pathParts.map((part, index) => {
				const isLast = index === pathParts.length - 1;
				const path = pathParts.slice(0, index + 1).join("/");

				return (
					<div key={path} className="flex items-center">
						<ChevronRight className="w-4 h-4 mx-1 flex-shrink-0 text-gray-400" />
						{isLast ? (
							<span className="font-medium text-gray-900">{part}</span>
						) : (
							<Link
								to={`/tree/${path}`}
								className="hover:text-indigo-600 transition-colors"
							>
								{part}
							</Link>
						)}
					</div>
				);
			})}
		</nav>
	);
}
