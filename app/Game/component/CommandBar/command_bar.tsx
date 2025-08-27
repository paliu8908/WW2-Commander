'use client'

import Image from "next/image";
import { useState } from 'react';

export default function CommandBar() {

    const [unit, setUnit] = useState('');

    const PressRifle = () => {
        setUnit("Rifle");
    }

    const PressTank = () => {
        setUnit("Tank");
    }

    const PressRecon = () => {
        setUnit("Recon");
    }

    const PressArtillery = () => {
        setUnit("Artillery");
    }

    return (
        <div className="relative w-1/4 h-[90%] bg-[#d6ca9a] rounded-3xl flex flex-col items-center">
            <h2 className="text-2xl font-bold m-3">Scouting...</h2>
            <div className="relative w-[80%] h-[35%] animate-pulse">
                <Image src="/radar.png" alt="radar" fill className="object-contain"/>
            </div>
            <button onClick={PressRifle} className="bg-[#ffd736] p-2 m-2 rounded-lg font-bold w-[40%]">
                Rifle Platoon
            </button>
            <button onClick={PressTank} className="bg-[#ffd736] p-2 m-2 rounded-lg font-bold w-[40%]">
                Tank Platoon
            </button>
            <button onClick={PressRecon} className="bg-[#ffd736] p-2 m-2 rounded-lg font-bold w-[40%]">
                Recon Platoon
            </button>
            <button onClick={PressArtillery} className="bg-[#ffd736] p-2 m-2 rounded-lg font-bold w-[40%]">
                Artillery Platoon
            </button>
            <button className="bg-[#ffd736] p-2 m-2 rounded-lg font-bold w-[40%] text-[#ff0000]">
                DEPLOY!
            </button>

            {unit && <p className="font-bold text-lg">Unit: <span className="font-normal">{unit} Platoon</span></p>}
        </div>
    );
}