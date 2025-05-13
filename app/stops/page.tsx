import Stop from "@/components/stop-monitor";
import RefreshWrapper from "./Refresher";

export const revalidate = 15;

export default function StopMonitoringPage() {
	return (
		<main className="size-full grid place-items-center p-12">
			<RefreshWrapper refreshInterval={15}>
				<Stop stopId={16221} />
				<Stop stopId={16222} />
			</RefreshWrapper>
		</main>
	);
}
