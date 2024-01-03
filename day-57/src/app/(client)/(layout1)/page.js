import Book from "./components/Book";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Rate from "./components/Rate";
import Services from "./components/Services";
import UuDai from "./components/UuDai";

function HomePage() {
    return <div className="px-8">
        <Hero />
        <Book />
        <UuDai/>
        <Services />
        <Rate />
        <Contact />
    </div>
}

export default HomePage;