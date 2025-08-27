import Image from "next/image";

export default function Header() {
    return (
        <header className="flex h-[100px] sticky top-0 z-50 items-center bg-[var(--desert-yellow)] shadow-sm">
            <div className="w-1/2 h-full flex items-center">
                <a href="\"><h1 className="px-[20px] font-[1000] text-[var(--brown)] text-4xl">North Africa Commander</h1></a>

            </div>
            <div className="w-1/2 h-full flex flex-row items-center justify-end">
                <a href="/USA" className="relative w-[15%]  h-[50%]">   
                    <Image src="/USA.webp" alt="USA Flag" fill className="object-contain"/>
                </a>
                <a href="/Germany" className="relative w-[15%] h-[50%]">   
                    <Image src="/Germany.svg" alt="German Flag" fill className="object-contain"/>
                </a>
                <a href="/UK" className="relative w-[15%]  h-[50%]">   
                    <Image src="/UK.png" alt="UK Flag" fill className="object-contain"/>
                </a>
                <a href="/Italy" className="relative w-[15%] h-[50%]">   
                    <Image src="/Italy.png" alt="Italy Flag" fill className="object-contain"/>
                </a>

            </div>
        </header>
        
    );
}