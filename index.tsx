import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("MusePost: Initializing core system...");

const rootElement = document.getElementById('root');
if (rootElement) {
    try {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
        console.log("MusePost: Render successful.");
    } catch (error) {
        console.error("MusePost: Render failed.", error);
    }
} else {
    console.error("MusePost: Root element not found.");
}