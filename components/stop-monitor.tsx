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
				? "hidden"
				: minutesAway < 5
					? "bg-red-400"
					: minutesAway < 10
					? "bg-green-400"
					: "bg-white",
				"w-full p-4 flex grow items-center text-3xl text-gray-700"
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
		<div className="size-full flex grow">
			{Object.entries(arrivalsByDestination).map(
				([destinationName, arrivals]) => (
					<div
						key={destinationName}
						className="flex flex-col items-start overflow-hidden bg-gray-50 grow"
					>
						<div className="font-bold bg-gray-100 p-4 w-full text-black text-3xl">
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
