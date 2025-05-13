import { getArrivalTimes } from "@/lib/muni-api";
import { by, cn, groupBy } from "@/lib/utils";

export function getMinutesBetween(
	date1: Date,
	date2: Date = new Date()
): number {
	// Calculate the absolute difference in milliseconds
	const diffMs = Math.abs(date2.getTime() - date1.getTime());

	// Convert to minutes
	const diffMinutes = diffMs / (1000 * 60);

	return Math.round(diffMinutes);
}

function ArrivalTime({
	minutesAway,
	lineRef,
}: {
	minutesAway: number;
	lineRef: string;
}) {
	return (
		<div
			className={cn(
				minutesAway < 5
					? "bg-red-400"
					: minutesAway < 10
					? "bg-orange-400"
					: minutesAway < 15
					? "bg-green-400"
					: "bg-gray-100",
				"w-full p-4"
			)}
		>{`${lineRef}: ${minutesAway} minutes`}</div>
	);
}

export default async function Stop({ stopId }: { stopId: number }) {
	const arrivals = await getArrivalTimes(stopId);

	const arrivalsByDestination = groupBy(
		arrivals,
		(journey) => journey.DestinationName
	);
	return (
		<div className="size-full">
			{Object.entries(arrivalsByDestination).map(
				([destinationName, arrivals]) => (
					<div
						key={destinationName}
						className="flex flex-col items-start rounded-2xl overflow-hidden bg-gray-50"
					>
						<h3 className="font-bold bg-gray-100 size-full p-4">
							{destinationName}
						</h3>
						{arrivals
							.map((a) => ({
								...a,
								minutesAway: getMinutesBetween(
									new Date(a.MonitoredCall.ExpectedArrivalTime)
								),
							}))
							.sort(by((a) => a.minutesAway))
							.map((arrival) => (
								<ArrivalTime
									minutesAway={arrival.minutesAway}
									lineRef={arrival.LineRef}
									key={JSON.stringify(arrival)}
								/>
							))}
					</div>
				)
			)}
		</div>
	);
}
