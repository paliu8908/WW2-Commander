import CommandBar from "./CommandBar/command_bar";
import CmdConsole from "./console";

export default function Body() {
    return (
        <section className="h-screen bg-[#dbdbc8] p-12 flex">
            <CmdConsole />
        </section>

    );
}