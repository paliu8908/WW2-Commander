import Header from "../Common/Header";
import Desc from "./components/UK_Desc";
import Units from "./components/Units";
import Footer from "../Common/Footer";

export default function Page() {
    return (
        <div className="bg-[#dbdbc8]">
            <Header />
            <Desc/>
            <Units />
            <Footer />
        </div>
    );
}