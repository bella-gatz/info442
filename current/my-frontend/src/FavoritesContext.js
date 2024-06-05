import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const handleFavoriteToggle = (item) => {
        setFavorites(prevFavorites => 
            prevFavorites.some(fav => fav.id === item.id)
                ? prevFavorites.filter(fav => fav.id !== item.id)
                : [...prevFavorites, item]
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, handleFavoriteToggle }}>
            {children}
        </FavoritesContext.Provider>
    );
};
