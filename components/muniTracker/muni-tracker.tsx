"use client";

import { fetchVehicleLocations } from "@/lib/muni-client";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-rotatedmarker";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Fix Leaflet default icon issue
const defaultIcon = new Icon({
	iconUrl: "/compass-needle.svg",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

export default function MuniTracker({
	selectedLines,
}: {
	selectedLines: string[];
}) {
	const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
	const {
		data: vehicles,
		refetch,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["vehicles", ...selectedLines.sort()],
		queryFn: async () => {
			setLastUpdated(new Date(Date.now()));
			return await fetchVehicleLocations(selectedLines);
		},
		staleTime: 10_000,
	});

	// San Francisco center coordinates
	const sfCenter = { lat: 37.7749, lng: -122.4194 };

	return (
		<div className="h-full w-full relative">
			<div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-md shadow-md flex items-center space-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => refetch()}
					disabled={isLoading}
					className="flex items-center gap-1"
				>
					<RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
					Refresh
				</Button>
				{lastUpdated && (
					<span className="text-xs text-muted-foreground">
						Last updated: {lastUpdated.toLocaleTimeString()}
					</span>
				)}
			</div>

			{error && (
				<div className="absolute top-4 left-4 z-[1000] bg-destructive text-white p-2 rounded-md">
					{JSON.stringify(error)}
				</div>
			)}

			<MapContainer
				center={sfCenter}
				zoom={13}
				style={{ height: "100vh", width: "100%" }}
				className="-z-0"
				zoomControl={false}
				scrollWheelZoom={false}
				doubleClickZoom={false}
				touchZoom={false}
				boxZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{vehicles?.map((vehicle) => (
					<Marker
						key={vehicle.vehicleId}
						position={[vehicle.position.latitude, vehicle.position.longitude]}
						icon={defaultIcon}
						rotationAngle={vehicle.bearing}
					>
						<Popup>
							<div className="p-1">
								<h3 className="font-bold">
									{vehicle.routeId} - {vehicle.bearing}
								</h3>
								<p>Vehicle ID: {vehicle.vehicleId}</p>
								<p>Heading: {vehicle.bearing}°</p>
								<p>
									Last updated:{" "}
									{new Date(vehicle.timestamp).toLocaleTimeString()}
								</p>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
