'use client'

import { useEffect, useState } from "react";
import { Nation, Regiment } from "@/app/Common/types";

export default function Units() {
    const id = "USA";
    const [data, setData] = useState<Nation[]>([]);
    const [open, setOpen] = useState<String[]>([]);

    useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/data");
      const nations: Nation[] = await res.json();
      setData(nations);
    };
    fetchData();
  }, []);

    if (!data) return <p>Loading...</p>;

    function expand(name : String) {
      if(open.includes(name)) {
        setOpen(open.filter(item => item != name));
      } else {
        setOpen(prevSelect => ([...prevSelect, name]))
      }
    }

    const USData = data.filter(nation => nation.name === "USA")

    return (
        <section className="bg-[var(--darker-desert)] px-15 py-5 w-full">
            <h1 className="text-3xl font-bold mb-2 text-center text-black">The <span className="text-[var(--usa-blue)]">US</span> <span className="text-[var(--usa-red)]">Army</span></h1>
            <div>
                {USData.map((stat, idx) => 
                    (
                      <div key={idx} className="">
                        <h1 className="py-2 text-xl font-bold text-[var(--usa-blue)] text-center my-2">ARMOUR <span className="text-[var(--usa-red)]">COMPANIES</span></h1>
                        <ul className="grid grid-cols-3 gap-2">
                            {stat.armour.map((reg, a) => 
                                <div key={a} className="flex flex-col items-center">
                                  <button onClick={(() => expand(reg.Name))} className="p-2 border-brown border-2 bg-[var(--sand)] text-[var(--dark-brown)] font-bold cursor-pointer text-center w-full rounded-md">{reg.Name}</button>
                                  <p className={`w-[95%] bg-[var(--beach)] px-10 border-brown 
                                                overflow-hidden transition-all ease-in-out
                                                ${open.includes(reg.Name) ? "max-h-500 duration-1000 border-b-1 border-x-1" : "max-h-0 duration-0 border-0"}`}>{reg.Desc}</p>
                                </div>)}
                        </ul>
                        <h1 className="py-2 text-xl font-bold text-[var(--usa-blue)] text-center my-2">INFANTRY <span className="text-[var(--usa-red)]">COMPANIES</span></h1>
                        <ul className="grid grid-cols-3 gap-2 ">
                            {stat.infantry.map((reg, a) => 
                                <div key={a} className="flex flex-col items-center">
                                  <button onClick={(() => expand(reg.Name))} className="p-2 border-brown border-2 bg-[var(--sand)] text-[var(--dark-brown)] font-bold cursor-pointer text-center w-full rounded-md">{reg.Name}</button>
                                  <p className={`w-[95%] bg-[var(--beach)] px-10 border-brown 
                                                overflow-hidden transition-all ease-in-out
                                                ${open.includes(reg.Name) ? "max-h-500 duration-1000 border-b-1 border-x-1" : "max-h-0 duration-0 border-0"}`}>{reg.Desc}</p>
                                </div>)}
                        </ul>
                      </div>
                    ))}
            </div>
        </section>
    );
}