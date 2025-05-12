import { Suspense } from "react";
import LineSelector from "@/components/line-selector";
import { getAllLines } from "@/lib/muni-api";
import MuniTracker from "../components/muniTracker/muni-tracker-ssr";

export default async function Home(props: {
	searchParams: Promise<{ lines?: string }>;
}) {
	const searchParams = await props.searchParams;
	// Get all available lines for the selector
	const allLines = await getAllLines();

	// Parse the lines from URL params
	const selectedLines = searchParams.lines ? searchParams.lines.split(",") : [];

	return (
		<main className="flex min-h-screen flex-col p-4 md:p-6">
			<h1 className="text-3xl font-bold mb-6">SF Muni Tracker</h1>

			<div className="mb-6 z-10">
				<LineSelector allLines={allLines} selectedLines={selectedLines} />
			</div>

			<div className="flex-1 min-h-[500px] rounded-lg border z-0">
				<Suspense
					fallback={
						<div className="h-full w-full flex items-center justify-center relative">
							Loading map...
						</div>
					}
				>
					<MuniTracker selectedLines={selectedLines} />
				</Suspense>
			</div>
		</main>
	);
}
