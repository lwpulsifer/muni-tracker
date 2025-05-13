import { NextRequest, NextResponse } from "next/server";
import { getArrivalTimes } from "@/lib/muni-api";

export async function GET(req: NextRequest) {
	const searchParams = await req.nextUrl.searchParams;
	try {
		const data = await getArrivalTimes(Number(searchParams.get("stop_id")));
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json(
			{ error: "Failed to fetch vehicle data" },
			{ status: 500 }
		);
	}
}
