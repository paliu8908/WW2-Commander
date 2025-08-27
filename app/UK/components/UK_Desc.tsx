import Image from "next/image";
export default function Desc() {
    return (
        <section>
            <div className="w-full flex flex-col items-center py-3 gap-y-2 text-center">
                <h1 className="text-3xl font-extrabold text-black">The <span className="text-[var(--uk-blue)]">United</span> <span className="text-[var(--uk-red)]">Kingdom</span></h1> 
                <Image src="/UK.png" alt="Uk flag" height={100} width={100}/>
                
                <p className="w-[40%]">With the fall of France, Britain stands alone. The 8th Army, situated in Egypt, now
                    fights against the Italian Royal Army and the German Afrika Corps to secure the Suez Canal - Britain's 
                    crucial supply line from India to the Home Islands. 
                </p>
            </div>
        </section>
    );
}