import Image from "next/image";
export default function Desc() {
    return (
        <section>
            <div className="w-full flex flex-col items-center py-3 gap-y-2 text-center">
                <h1 className="text-3xl font-extrabold text-black">The <span className="text-[var(--usa-blue)]">United</span> <span className="text-[var(--usa-red)]">States</span></h1> 
                <Image src="/USA.webp" alt="US flag" height={100} width={100}/>
                
                <p className="w-[40%]">After the attack on Pearl Harbour on December 7th, 1941, the American public was furious. The United States, with its massive
                    industrial capacity, entered the Second World War. While its military might be lacking in experience, its soldiers are not lacking in bravery or equipment. As
                    the first American forces join the fighting in North Africa, they shall soon show the might of the US Army.
                </p>
            </div>
        </section>
    );
}