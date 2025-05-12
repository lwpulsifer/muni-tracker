"use client";
import dynamic from "next/dynamic";

const MuniTracker = dynamic(() => import("./muni-tracker"), {
	ssr: false,
});

export default MuniTracker;
