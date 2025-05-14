import { NextRequest, NextResponse } from "next/server";
import { fetchStopsForLine } from "@/lib/muni-api";

export async function GET(req: NextRequest) {
	const searchParams = await req.nextUrl.searchParams;
	try {
		const data = await fetchStopsForLine(searchParams.get("line_id") ?? "J");
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json(
			{ error: "Failed to fetch vehicle data" },
			{ status: 500 }
		);
	}
}
