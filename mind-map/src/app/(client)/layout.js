import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderInfo from "../components/HeaderInfo";

function DefaultLayout({ children }) {
    return <>
        <Header>
            <HeaderInfo/>
        </Header>
        <main className="px-20 py-24 min-h-[calc(100vh)]">
            { children }
        </main>
        <Footer />
    </>
}

export default DefaultLayout;