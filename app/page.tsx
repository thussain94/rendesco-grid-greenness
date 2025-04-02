"use client";

import { useEffect, useState } from "react";

import GridGreenessComponent from "@components/GridGreenness";

import { EnergyData } from "@mock-data/energy";
import { Energy } from "@models/energy";

export default function HomePage() {
	const [energyData, setEnergyData] = useState<Energy>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		/* In a real application, the data would be fetched from the Elexon API
		   For this test, a delay of 1 second is added to simulate an API call 
		*/
		setTimeout(() => {
			setEnergyData(EnergyData);
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<main>
			<div className="container max-w-2xl mx-auto my-16">
				<h1 className="text-3xl font-bold text-center mb-8">Grid Greenness Monitor</h1>
				{loading ? (
					<div className="flex justify-center flex-col items-center space-y-3">
						<div className="animate-spin rounded-full h-8 w-8 border-t-3 border-b-3 border-green-600"></div>
						<p>Loading...</p>
					</div>
				) : (
					<>
						{energyData && (
							<GridGreenessComponent energyData={energyData}></GridGreenessComponent>
						)}
					</>
				)}
			</div>
		</main>
	);
}