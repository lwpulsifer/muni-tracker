import { StopMonitoringData } from "./stop-monitoring-types";
import { SFMTAResponse } from "./stop-types";
import type { MuniLine } from "./types";

// This would typically come from an environment variable
const API_KEY = process.env.API_KEY_511_ORG || "YOUR_API_KEY";

export async function getAllLines(): Promise<MuniLine[]> {
	const url = `https://api.511.org/transit/lines?api_key=${API_KEY}&operator_id=SF&format=json`;
	return (await (
		await fetch(url, { next: { revalidate: 1000 } })
	).json()) as MuniLine[];
}

export async function fetchVehiclePositions(selectedLines: string[] = []) {
	const url = `https://api.511.org/transit/VehicleMonitoring?api_key=${API_KEY}&agency=SF&format=json`;

	try {
		const response = await fetch(url, { next: { revalidate: 30 } });

		if (!response.ok) {
			throw new Error(
				`API request failed with status ${
					response.status
				} and body ${await response.text()}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching vehicle positions:", error);
		throw error;
	}
}

export async function getArrivalTimes(stopId: number) {
	const url = `https://api.511.org/transit/StopMonitoring?api_key=${API_KEY}&agency=SF&format=json&stopcode=${stopId}`;
	const response = await fetch(url, { next: { revalidate: 30 } });

	if (!response.ok) {
		throw new Error(
			`API request failed with status ${
				response.status
			} and body ${await response.text()}`
		);
	}

	const data = (await response.json()) as StopMonitoringData;

	return data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit.map(
		(visit) => {
			return visit.MonitoredVehicleJourney;
		}
	);
}

export async function fetchStopsForLine(lineId: string) {
	const url = `https://api.511.org/transit/stops?api_key=${API_KEY}&operator_id=SF&format=json&line_id=${lineId}`;
	const response = await fetch(url, { next: { revalidate: 30 } });
	if (!response.ok) {
		throw new Error(
			`API request failed with status ${
				response.status
			} and body ${await response.text()}`
		);
	}

	const data = (await response.json()) as SFMTAResponse;

	return data.Contents.dataObjects.ScheduledStopPoint;
}
