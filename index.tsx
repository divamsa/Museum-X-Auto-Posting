import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("🏛️ MusePost: System Core Booting...");

const startApp = () => {
    const container = document.getElementById('root');
    if (!container) return;

    try {
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
        console.log("🏛️ MusePost: Ready.");
    } catch (error) {
        console.error("🏛️ MusePost: Critical Boot Failure", error);
    }
};

// DOMが準備できてから実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}