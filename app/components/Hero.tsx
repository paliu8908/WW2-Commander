import Image from "next/image";
import Link from "next/link";

export default function Hero() {

    return (
        <section className="relative h-[85vh] w-full">
            <Image src="/panzer-panzer3.gif" alt="Panzer 3 GIF" fill/>
            <div className="absolute h-full">
                <div className="h-full backdrop-blur-sm bg-black/50 text-[var(--desert-yellow)] px-10 pt-20 max-w-xl">
                    <p className="text-2xl md:text-3xl xl:text-4xl font-extrabold tracking-tight mb-6 text-[var(--desert-orange)]">
                        NORTH AFRICA COMMANDER
                    </p>
                    <p className="text-base md:text-lg">
                    Lead the forces of the Americans, British, Germans, or Italians in the North Africa Campaign. Test your
                    skills and show if you have what it takes to be victorious.
                    </p>

                    <Link href="/Setup">
                        <button className="mt-10 py-2 px-10 bg-[var(--desert-yellow)] border-4 border-[var(--desert-orange)] cursor-pointer rounded-md text-[var(--brown)] font-bold">
                            PLAY NOW
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}