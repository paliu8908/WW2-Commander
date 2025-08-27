import Image from "next/image";
export default function Desc() {
    return (
        <section>
            <div className="w-full flex flex-col items-center py-3 gap-y-2 text-center">
                <h1 className="text-3xl font-extrabold text-black">The <span className="text-[var(--ita-green)]">Kingdom</span> of <span className="text-[var(--ita-red)]">Italy</span></h1> 
                <Image src="/italy.png" alt="Italian flag" height={100} width={100}/>
                
                <p className="w-[40%]">
                    The Italians, with their own ambitions for a Mediterranean Empire, have campaigned against the British
                    in North Africa. Despite their inferior equipment and training, the Italian Army persists in their fight
                    to seize Egypt and Britain's other colonies. 
                </p>
            </div>
        </section>
    );
}