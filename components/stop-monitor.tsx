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
				minutesAway < 2
					? "opacity-75"
					: minutesAway < 5
					? "bg-red-700 text-white font-bold"
					: minutesAway < 10
					? "bg-green-700 text-white font-bold"
					: "bg-background",
				"w-full p-8 flex justify-stretch text-5xl text-primary"
			)}
		>{`${lineRef}: ${minutesAway} minute(s)`}</div>
	);
}

export default async function Stop({
	stopId,
	label,
}: {
	stopId: number;
	label: string;
}) {
	const arrivals = await getArrivalTimes(stopId);

	const arrivalsByDestination = groupBy(
		arrivals,
		(journey) => journey.DestinationName
	);
	return (
		<div className="size-full flex grow w-full">
			{Object.entries(arrivalsByDestination).map(
				([destinationName, arrivals]) => (
					<div
						key={destinationName}
						className="flex flex-col items-start overflow-hidden bg-background w-full"
					>
						<div className="font-bold bg-background p-4 w-full text-primary text-5xl">
							<span className="font-bold">{label}</span>
						</div>
						{arrivals
							.map((a) => ({
								...a,
								minutesAway: getMinutesBetween(
									new Date(a.MonitoredCall.ExpectedArrivalTime)
								),
							}))
							.sort(by((a) => a.minutesAway))
							.slice(0, 2)
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
