import { NextResponse } from "next/server";
import { fetchVehiclePositions } from "@/lib/muni-api";

export async function GET() {
	try {
		const data = await fetchVehiclePositions();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json(
			{ error: "Failed to fetch vehicle data" },
			{ status: 500 }
		);
	}
}
