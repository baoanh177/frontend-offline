import "server-only"

const dictionaries = {
    en: () => import("./en.json").then((module) => module.default),
    vi: () => import("./vi.json").then((module) => module.default)
}

export const getDictionary = async (locale) => {
    if(locale != 'vi' && locale != 'en') {
        console.log(locale)
        return dictionaries.vi()
    }else {
        return dictionaries[locale]()
    }
}
