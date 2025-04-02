"use client";

import { useEffect, useState } from "react";

import dayjs from 'dayjs';

import { Energy } from "@models/energy";

const GREEN_ENERGY = ['BIOMASS', 'NPSHYD', 'NUCLEAR', 'PS', 'WIND'];
const FOSSIL_ENERGY = ['CCGT', 'COAL', 'OCGT', 'OIL'];
const INTERCONNECTS = ['INTELEC', 'INTEW', 'INTFR', 'INTGRNL', 'INTIFA2', 'INTIRL', 'INTNED', 'INTNEM', 'INTNSL', 'INTVKL', 'OTHER'];

const GridGreennessComponent: React.FC<{ energyData: Energy }> = ({ energyData }) => {
    // A threshold of 40% fossil fuel usage is considered "high"
    const FOSSIL_FUEL_USAGE_THRESHOLD = 40;

    const [greenPercentage, setGreenPercentage] = useState(0);
    const [fossilPercentage, setFossilPercentage] = useState(0);
    const [includeInterconnects, setIncludeInterconnects] = useState(false);

    useEffect(() => {
        if (!energyData) return;

        const generatePercentages = () => {
            // Ignore fuel types that have negative generation - assuming they are stored
            const totalGeneration = energyData.data.filter(item => {
                if (item.generation > 0) {
                    if (!includeInterconnects) {
                        return !INTERCONNECTS.includes(item.fuelType)
                    }
                    return item;
                }
            }).reduce((sum, item) => sum + item.generation, 0);
            const greenGeneration = energyData.data.filter(item => GREEN_ENERGY.includes(item.fuelType) && item.generation >= 0).reduce((sum, item) => sum + item.generation, 0);
            const fossilGeneration = energyData.data.filter(item => FOSSIL_ENERGY.includes(item.fuelType) && item.generation >= 0).reduce((sum, item) => sum + item.generation, 0);

            setGreenPercentage(Math.round((greenGeneration / totalGeneration) * 100));
            setFossilPercentage(Math.round((fossilGeneration / totalGeneration) * 100));
        }

        generatePercentages();

    }, [energyData, includeInterconnects]);

    const getStatusMessage = () => {
        if (greenPercentage > 40) return { text: "green", color: "bg-green-600" };
        return { text: "not green", color: "bg-red-600" };
    };

    const handleIncludeInterconnectsOnChange = (value: boolean) => {
        setIncludeInterconnects(value);
    }

    const status = getStatusMessage();

    return (
        <section>
            <div className="mx-auto p-6 bg-white rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Grid Greenness</h2>
                <div className="mb-6 text-gray-600">
                    {energyData.startTime && (
                        <p>Data from: {dayjs(energyData.startTime).format('DD/MM/YYYY, HH:mm')}</p>
                    )}
                </div>
            </div>

            <div className="my-8">
                <div className={`py-3 px-4 rounded-lg text-white text-center text-lg font-semibold ${status.color}`}>
                    The grid is currently {status.text} ({greenPercentage.toFixed(1)}%).
                </div>

                <div className="text-right mt-3">
                    <label htmlFor="includeInterconnects">Include Interconnects?</label>
                    <input id="includeInterconnects" type="checkbox" className="ml-2" defaultChecked={includeInterconnects} onChange={(e) => { handleIncludeInterconnectsOnChange(e.target.checked) }}></input>
                </div>

                {fossilPercentage > FOSSIL_FUEL_USAGE_THRESHOLD && (
                    <div className="my-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-700">
                        <p className=" font-semibold">High fossil fuel usage! Consider reducing consumption.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default GridGreennessComponent;