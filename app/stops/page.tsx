import Stop from "@/components/stop-monitor";
import { Separator } from "@/components/ui/separator";
import RefreshWrapper from "./Refresher";

export const revalidate = 10;

const stopLabels: Record<number, string> = {
	16221: "Liberty Southbound",
	16222: "Liberty Northbound",
};

export default async function StopMonitoringPage({ searchParams }: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) 
  {
	const stopsParam = (await searchParams).ids;
	let stops: number[] = [];
	if (typeof stopsParam === "string") {
		stops = stopsParam.split(",").map(p => Number(p)).filter(p => !isNaN(p));
	}
	if (stops.length === 0) {
		stops = [16221, 16222];
	}
	return (
		<main className="size-full flex flex-col items-stretch h-screen">
			<RefreshWrapper refreshInterval={15}>
				{stops.map((s, i) => (
					<>
						<Stop stopId={s} label={stopLabels[s] ?? s} />
						{i !== stops.length - 1 ? <Separator /> : null}
					</>
				))}
			</RefreshWrapper>
		</main>
	);
}
