import React from "react";


type ILocaleContext = {
    locale: string,
    setLocale:any
}

const defaultValue: ILocaleContext = {
    locale: 'en',
    setLocale: 'any',
}

export default React.createContext(defaultValue);