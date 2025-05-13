"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import type { MuniLine } from "@/lib/types";

export default function LineSelector({
	allLines,
	selectedLines,
}: {
	allLines: MuniLine[];
	selectedLines: string[];
}) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string[]>(selectedLines);
	const router = useRouter();
	const pathname = usePathname();

	// Update URL when selection changes
	useEffect(() => {
		const params = new URLSearchParams();
		if (selected.length > 0) {
			params.set("lines", selected.join(","));
		}

		const queryString = params.toString();
		const url = pathname + (queryString ? `?${queryString}` : "");

		router.push(url);
	}, [selected, pathname, router]);

	const toggleLine = (lineId: string) => {
		setSelected((prev) =>
			prev.includes(lineId)
				? prev.filter((id) => id !== lineId)
				: [...prev, lineId]
		);
	};

	const clearSelection = () => {
		setSelected([]);
	};

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-wrap gap-2 items-center">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="justify-between"
						>
							Select Muni Lines
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0" align="start">
						<Command>
							<CommandInput placeholder="Search Muni lines..." />
							<CommandList>
								<CommandEmpty>No lines found.</CommandEmpty>
								<CommandGroup>
									{allLines.map((line) => (
										<CommandItem
											key={line.Id}
											value={line.Id}
											onSelect={() => toggleLine(line.Id)}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													selected.includes(line.Id)
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{line.Id} - {line.Name}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>

				{selected.length > 0 && (
					<Button variant="ghost" size="sm" onClick={clearSelection}>
						Clear
					</Button>
				)}
			</div>

			<div className="flex flex-wrap gap-2">
				{selected.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No lines selected. Showing all available vehicles.
					</p>
				) : (
					selected.map((lineId) => {
						const line = allLines.find((l) => l.Id === lineId);
						return (
							<Badge
								key={lineId}
								variant="outline"
								className="flex items-center gap-1"
							>
								{line ? `${line.Id} - ${line.Name}` : lineId}
								<button
									className="ml-1 rounded-full hover:bg-muted p-0.5"
									onClick={() => toggleLine(lineId)}
								>
									<span className="sr-only">Remove</span>
									<svg
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-3 w-3"
									>
										<path
											d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
								</button>
							</Badge>
						);
					})
				)}
			</div>
		</div>
	);
}
