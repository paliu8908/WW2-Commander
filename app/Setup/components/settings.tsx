import Image from "next/image";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Nation, Regiment } from "@/app/Common/types";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useAppContext } from "@/app/context/GameContext";
import { useRouter } from "next/navigation";


export default function Settings() {
    const { setGamePrompt } = useAppContext();
    const router = useRouter();

    const handleNext = (text : string) => {
        setGamePrompt(text);
        router.push("/Game")
    }

    const factions = ["UK", "Germany", "USA", "Italy"]
    type playerOptions = "Player" | "Computer";
    const weatherTypes = ["Clear Skies", "Rain", "Cloudy", "Highly Windy" ];
    const timeTypes = ["Morning", "Afternoon", "Evening", "Night"];
    const terrainTypes = ["Urban", "Desert", "Coastal Plains", "Coastal Mountains", "Rocky Plateaus"];

    type RegOptionsProps = {
        player: playerOptions;
        className: string;
    };

    const [pnations, setpnations] = useState({"Player": {"nation": "UK", "regiment" : "Crusier Tank Squadron"}, "Computer" : {"nation": "UK", "regiment" : "Crusier Tank Squadron"}})
    const [show, setShow] = useState<string[]>([]);
    const [data, setData] = useState<Nation[]>([]);
    const [weather, setWeather] = useState<string>("Clear");
    const [time, setTime] = useState<string>("Morning");
    const [terrain, setTerrain] = useState<string>("Desert");

    useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/data");
      const nations: Nation[] = await res.json();
      setData(nations);
    };
    fetchData();
  }, []);

    function flag(nation: string) {
        if(nation === "UK") {
            return "/uk.png"
        } else if(nation === "Germany") {
            return "/Germany.svg"
        } else if(nation === "USA") {
            return "/USA.webp"
        } else {
            return "/italy.png"
        }
    }

    function firstReg(nation : Nation[]) {
        return ( nation[0].armour[0].Name);
    }

    function set(val : string, rm: string) {
        if(rm === "Player" && pnations["Player"].nation != val) {
            setpnations({
                ...pnations,
                "Player": {"nation" : val, "regiment" : firstReg(data.filter(i => i.name === val))}
            })
        } else if(rm === "Computer" && pnations["Computer"].nation != val) {
            setpnations({
                ...pnations,
                "Computer": {"nation" : val, "regiment" : firstReg(data.filter(i => i.name === val))}
            })
        }

        setShow(show.filter(i => i != rm));
    }

    function modifyShow(change : string) {
        if(show.includes(change)) {
            setShow(show.filter(i => i != change))
        } else {
            setShow([...show, change])
        }
    }

    function modifyReg(player : string, reg : string) {
        if(player === "Player" && pnations["Player"].regiment != reg) {
            setpnations({
                ...pnations,
                "Player": {"nation" : pnations.Player.nation, "regiment" : reg}
            })
        } else if(player === "Computer" && pnations["Computer"].regiment != reg) {
            setpnations({
                ...pnations,
                "Computer": {"nation" : pnations.Computer.nation, "regiment" : reg}
            })
        }

        setShow(show.filter(i => i != player + "Reg"));
        
    }

    function getDesc(nation: string, reg: string) {

        const regs : Regiment[] = [];
        const passed = [];

        data.filter(i => i.name === nation).map((n, key) => (
            regs.push(...n.armour)
        ))

        passed.push(...regs.filter(r => r.Name === reg))

        if(passed.length > 0) {
            return passed[0].Desc;
        } else {
            data.filter(i => i.name === nation).map((n, key) => (
                regs.push(...n.infantry)
            ))

            passed.push(...regs.filter(r => r.Name === reg))

            if(passed.length > 0) {
                return passed[0].Desc;

            } else {
                return;
            }
        }

    }

    const RegOptions: React.FC<RegOptionsProps> = ({ player, className}) => {
        const reg : Regiment[] = [];

        data.filter(i => i.name === pnations[player].nation).map((n, key) => (
            reg.push(...n.armour)
        ))

        data.filter(i => i.name === pnations[player].nation).map((n, key) => (
            reg.push(...n.infantry)
        ))

        return (
            <div className={"absolute h-full flex flex-col ml-3 mt-14 z-20 w-[60%]" + className}>
                {reg.map((val, key) => 
                    <button onClick={() => modifyReg(player, val.Name)} key={key} 
                            className="cursor-pointer relative py-1 border border-1 border-[var(--brown)] bg-[var(--beach)]">{val.Name}</button>)}
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[var(--darker-desert)] w-full flex flex-col items-center gap-y-3 py-5">
            <h1 className="text-3xl font-bold text-[var(--dark-brown)] text-center py-2">SIMULATION SETTINGS</h1>
            <div className="flex  ml-20">
                <div className="w-[60%] h-[30%] flex flex-col gap-y-3">
                    <div className="w-full flex flex-col gap-y-3">
                        <div className="relative w-full bg-[var(--beach)] px-10 py-2 flex items-center rounded-sm border-2 border-[var(--brown)] gap-x-10">
                            <p className="w-[12%]">PLAYER</p>
                            <div className="w-[12%] h-full flex items-center">
                                <p>Nation:</p>
                                <div className="relative h-full">
                                    <button onClick={() => modifyShow("Player")} className="cursor-pointer relative h-5 w-15 flex justify-center items-center mt-1">
                                        <Image src={flag(pnations.Player.nation)} alt={pnations.Player.nation} fill className="object-contain"/>
                                    </button>
                                    {show.includes("Player") && 
                                    <div className="left-0 absolute h-full flex flex-col mt-1 z-20">
                                        {factions.map((val, idx) => (
                                            <button key={idx} onClick={(()=> set(val, "Player"))} className="cursor-pointer relative py-1 border border-1 border-[var(--brown)] bg-[var(--beach)]">
                                                <div className="relative w-15 h-5 rounded-lg flex">
                                                    <Image src={flag(val)} alt={val} fill className="object-contain"/>
                                                </div>    
                                            </button>
                                        ))}
                                    </div>}
                                </div>
                            </div>
                            <div className="w-[76%] relative flex items-center gap-x-4">
                                <p className="w-[10%]">Company:</p>
                                <div className="flex items-center h-full w-full justify-left">
                                    <button onClick={() => modifyShow("PlayerReg")} className="cursor-pointer relative h-5 flex text-left justify-left items-center w-full">
                                        <p className="w-[70%] text-center">{pnations.Player.regiment} </p>
                                        <MdOutlineKeyboardArrowDown className="w-[5%]"/>
                                    </button>
                                    {show.includes("PlayerReg") && <RegOptions className="" player="Player"/>}
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full bg-[var(--beach)] px-10 py-2 flex items-center rounded-sm border-2 border-[var(--brown)] gap-x-10">
                            <p className="w-[12%]">COMPUTER</p>
                            <div className="w-[12%] h-full flex items-center">
                                <p>Nation:</p>
                                <div className="relative h-full">
                                    <button onClick={() => modifyShow("Computer")} className="cursor-pointer relative h-5 w-15 flex justify-center items-center mt-1">
                                        <Image src={flag(pnations["Computer"].nation)} alt={pnations["Computer"].nation} fill className="object-contain"/>
                                    </button>
                                    {show.includes("Computer") && <div className="left-0 absolute h-full flex flex-col mt-1 z-20">
                                        {factions.map((val, idx) => (
                                            <button key={idx} onClick={(()=> set(val, "Computer"))} className="cursor-pointer relative py-1 border border-1 border-[var(--brown)] bg-[var(--beach)]">
                                                <div className="relative w-15 h-5 rounded-lg flex">
                                                    <Image src={flag(val)} alt={val} fill className="object-contain"/>
                                                </div>    
                                            </button>
                                        ))}
                                    </div>}
                                </div>
                            </div>
                            <div className="w-[76%] relative flex items-center gap-x-4">
                                <p className="w-[10%]">Company:</p>
                                <div className="flex items-center h-full w-full justify-left">
                                    <button onClick={() => modifyShow("ComputerReg")} className="cursor-pointer relative h-5 flex text-left justify-left items-center w-full">
                                        <p className="w-[70%] text-center">{pnations.Computer.regiment} </p>
                                        <MdOutlineKeyboardArrowDown className="w-[5%]"/>
                                    </button>
                                    {show.includes("ComputerReg") && <RegOptions className="" player="Computer"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[70%]">
                        <div className="border border-1 border-[var(--brown)] h-full w-full p-3 flex flex-col items-center">
                            <h2 className="text-xl font-bold text-[var(--brown)]">Briefing</h2>
                            {time}, North Africa, 1942. The armies of {pnations.Player.nation} and {pnations.Computer.nation} meet in 
                            the {terrain.toLowerCase()} with their guns ready. The weather is {weather.toLowerCase()}. Currently,  
                            a {pnations.Player.regiment} has engaged a {pnations.Computer.regiment} in battle. 

                            <br />
                            <br />

                            {getDesc(pnations.Player.nation, pnations.Player.regiment)}

                            <br />
                            <br />

                            {getDesc(pnations.Computer.nation, pnations.Computer.regiment)}
                        </div>
                    </div>
                </div>
                <div className="w-[40%] px-30">
                    <div className="py-3 bg-[var(--beach)] border border-[var(--brown)] flex flex-col items-center gap-y-4">
                        
                        <h2 className="text-xl text-[var(--dark-brown)] font-bold ">Battlefield Settings</h2>
                        <div className="flex w-full justify-center text-center">
                            <b className="w-1/2">Terrain:</b>
                            <div className="relative flex w-1/2">
                                <button onClick={() => modifyShow("terrain")} className="relative cursor-pointer ml-1">
                                    {terrain}
                                </button>
                                
                                {(show.includes("terrain") && 
                                
                                    ( <div className="mt-6 absolute flex flex-col">
                                    {terrainTypes.map((val, idx) =>
                                    (
                                        <button key={idx} onClick={() => { modifyShow("terrain"); setTerrain(val) }} 
                                            className="z-20 p-1 border border-1 border-[var(--brown)] bg-[var(--beach)] rounded-xs cursor-pointer">
                                            {val}
                                        </button>
                                    )
                                    )} </div>))}
                                
                            </div>
                        </div>
                        <div className="flex w-full justify-center text-center">
                            <b className="w-1/2">Time of Day:</b>
                            <div className="relative flex w-1/2">
                                <button onClick={() => modifyShow("time")} className="relative cursor-pointer ml-1">
                                    {time}
                                </button>
                                
                                {(show.includes("time") && 
                                
                                    ( <div className="mt-6 absolute flex flex-col">
                                    {timeTypes.map((val, idx) =>
                                    (
                                        <button key={idx} onClick={() => { modifyShow("time"); setTime(val) }} 
                                            className="z-10 p-1 border border-1 border-[var(--brown)] bg-[var(--beach)] rounded-xs cursor-pointer">
                                            {val}
                                        </button>
                                    )
                                    )} </div>))}
                                
                            </div>
                        </div>
                        <div className="flex w-full justify-center text-center">
                            <b className="w-1/2">Weather:</b>
                            <div className="relative flex w-1/2">
                                <button onClick={() => modifyShow("weather")} className="relative cursor-pointer ml-1">
                                    {weather}
                                </button>
                                
                                {(show.includes("weather") && 
                                
                                    ( <div className="mt-6 absolute flex flex-col">
                                    {weatherTypes.map((val, idx) =>
                                    (
                                        <button key={idx} onClick={() => { modifyShow("weather"); setWeather(val) }} 
                                            className="z-5 p-1 border border-1 border-[var(--brown)] bg-[var(--beach)] rounded-xs cursor-pointer">
                                            {val}
                                        </button>
                                    )
                                    )} </div>))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <button onClick={() => handleNext(
                `Let's simulate a battle of the Second World War. The setting is ${time}, North Africa, 1942. I will control the forces of ${pnations.Player.nation} and you will control the army of ${pnations.Computer.nation}.
The battle takes place at ${terrain.toLowerCase()}. The weather is ${weather.toLowerCase()}. Currently,  
I have ${pnations.Player.regiment} at my command and you have ${pnations.Computer.regiment}. 
${getDesc(pnations.Player.nation, pnations.Player.regiment)}
${getDesc(pnations.Computer.nation, pnations.Computer.regiment)}. You shall give the orders first, and I will issue orders after. Both of us will take turns. Keep response short and only outline the movements of your forces. Be specific on list the number of units moving where. Produce only plain text. Instead of describing your orders describe the movement from third person.`
            )} className="cursor-pointer bg-[var(--sand)] p-2 border border-2 border-[var(--brown)] rounded-sm font-bold">Begin Simulation</button>
        </section>
    );
}