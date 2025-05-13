"use client";

// app/transit/RefreshWrapper.tsx
import { useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface RefreshWrapperProps {
	children: ReactNode;
	refreshInterval: number; // in seconds
}

export default function RefreshWrapper({
	children,
	refreshInterval,
}: RefreshWrapperProps) {
	const router = useRouter();
	const [timeUntilRefresh, setTimeUntilRefresh] = useState(refreshInterval);

	// Create a memoized refresh function to avoid recreating it on each render
	const refreshData = useCallback(() => {
		router.refresh();
		setTimeUntilRefresh(refreshInterval);
	}, [refreshInterval, router]);

	useEffect(() => {
		// Set up the refresh timer
		const timer = setInterval(() => {
			setTimeUntilRefresh((prev) => {
				if (prev <= 1) {
					// Use setTimeout to avoid updating during render
					setTimeout(() => refreshData(), 0);
					return refreshInterval;
				}
				return prev - 1;
			});
		}, 1000); // Update counter every second

		// Clean up on unmount
		return () => clearInterval(timer);
	}, [refreshInterval, refreshData]);

	return (
		<>
			{children}
			<div className="text-sm text-gray-500 flex items-center justify-center gap-2 w-full grow p-4">
				<div>Auto-refreshing in {timeUntilRefresh}</div>
				<button
					onClick={refreshData}
					className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
				>
					Refresh Now
				</button>
			</div>
		</>
	);
}
