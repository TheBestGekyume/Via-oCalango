import React, { createContext, useState } from 'react';

export const ItemNavContext = createContext({
    itemNavOption: null,
    setSelectedOption: () => {},
});

export const ItemNavProvider = ({ children }) => {
    const [itemNavContext, setItemNavContext] = useState('');

    return (
        <ItemNavContext.Provider value={{ itemNavContext, setItemNavContext }}>
            {children}
        </ItemNavContext.Provider>
    );
};
