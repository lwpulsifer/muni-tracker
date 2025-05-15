import Stop from "@/components/stop-monitor";
import RefreshWrapper from "./Refresher";
import { Separator } from "@/components/ui/separator";

export const revalidate = 15;

export default function StopMonitoringPage() {
	return (
		<main className="size-full flex flex-col items-stretch h-screen">
			<RefreshWrapper refreshInterval={15}>
				<Stop stopId={16222} label={"Liberty Northbound"} />
				<Separator className="w-full" />
				<Stop stopId={16221} label={"Liberty Southbound"} />
			</RefreshWrapper>
		</main>
	);
}
