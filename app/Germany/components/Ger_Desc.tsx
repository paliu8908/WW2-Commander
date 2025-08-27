import Image from "next/image";
export default function Desc() {
    return (
        <section>
            <div className="w-full flex flex-col items-center py-3 gap-y-2 text-center">
                <h1 className="text-3xl font-extrabold text-[var(--ger-grey)]">Germany</h1> 
                <Image src="/Germany.svg" alt="Uk flag" height={100} width={100}/>
                
                <p className="w-[40%]">Despite the ongoing war in Eastern Europe against the USSR, Germany has deployed the Afrika Korps to support its Italian allies 
              in North Africa. Hopefully, the German forces can occupy and potentially defeat the British, denying the crucial Suez Canal supply
              line to the British Home Islands and for Germany to seize control of the vital oil in the Middle East.
                </p>
            </div>
        </section>
    );
}