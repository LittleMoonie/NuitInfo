import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import CookieClicker from './Components/CookieClicker/CookieClicker';
import Recaptcha from './Components/ReCaptcha/Recaptcha'; // Import the Recaptcha component

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        function AppWithCookieAndRecaptcha() {
            const [siteLocked, setSiteLocked] = useState(false); // Manages CookieClicker state
            const [recaptchaSolved, setRecaptchaSolved] = useState(false); // Manages Recaptcha state

            const handleRecaptchaSolve = () => {
                setRecaptchaSolved(true); // Mark Recaptcha as solved
            };

            const handleCookieUnlock = () => {
                setSiteLocked(false); // Unlock site after CookieClicker
            };

            useEffect(() => {
                // Trigger the CookieClicker if Recaptcha is solved
                if (recaptchaSolved) {
                    const timer = setTimeout(() => {
                        setSiteLocked(true);
                    }, 1000); // Delay to lock the site with CookieClicker after Recaptcha is solved

                    return () => clearTimeout(timer);
                }
            }, [recaptchaSolved]);

            return (
                <>
                    {/* Recaptcha */}
                    {!recaptchaSolved && <Recaptcha onSolve={handleRecaptchaSolve} />}

                    {/* CookieClicker */}
                    {recaptchaSolved && siteLocked && <CookieClicker onUnlock={handleCookieUnlock} />}

                    {/* Main Content */}
                    <div className={`main-content ${siteLocked || !recaptchaSolved ? 'blurred' : ''}`}>
                        <App {...props} />
                    </div>
                </>
            );
        }

        root.render(<AppWithCookieAndRecaptcha />);
    },
    progress: {
        color: '#4B5563',
    },
});
