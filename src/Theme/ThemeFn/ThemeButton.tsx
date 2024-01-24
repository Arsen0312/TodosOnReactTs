import React, {useState} from 'react';
const ThemeButton = () => {
    const [theme, setTheme] = useState('white')

    const toggleTheme = () => {
        const newTheme = theme === "white" ? "dark" : "white"
        setTheme(newTheme)
    }

    return (
        <button onClick={toggleTheme}>
            {theme}
        </button>
    );
};

export default ThemeButton;