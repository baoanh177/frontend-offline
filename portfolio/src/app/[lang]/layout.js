import Header from "./components/Header";
import { getDictionary } from "./dictionaries/dictionaries";

async function RootLayout({ params, children }) {
    const { lang } = params

    const dict = await getDictionary(lang)

    return <>
        <div className="max-w-[1200px] mx-auto px-5">
            <Header dict={dict} lang={lang}/>
            <div className="bg-white bg-opacity-10 rounded-xl px-5 mt-20 mb-11">{children}</div>
        </div>
    </>
}

export default RootLayout;