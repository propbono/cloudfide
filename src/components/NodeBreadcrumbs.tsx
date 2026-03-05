import { ChevronRight } from "lucide-react";

type Props = {
	pathParts: string[];
};

export function NodeBreadcrumbs({ pathParts }: Props) {
	return (
		<nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
			{pathParts.map((part, index) => (
				<div
					key={pathParts.slice(0, index + 1).join("/")}
					className="flex items-center"
				>
					{index > 0 && <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />}
					<span
						className={
							index === pathParts.length - 1 ? "font-medium text-gray-900" : ""
						}
					>
						{part}
					</span>
				</div>
			))}
		</nav>
	);
}
