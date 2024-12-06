import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React, {useEffect, useState} from 'react';
import Recaptcha from './Components/ReCaptcha/Recaptcha';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import theme from './Theme/theme';

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

        function AppWithConditionalRecaptcha() {
            const [showRecaptcha, setShowRecaptcha] = useState(false);

            useEffect(() => {
                const recaptchaSolved = localStorage.getItem('recaptchaSolved');
                if (!recaptchaSolved) {
                    setShowRecaptcha(true);
                }
            }, []);

            if (showRecaptcha) {
                return <Recaptcha onSolve={() => setShowRecaptcha(false)} />;
            }

            return <AppWithConditionalRecaptcha />;
        }

        root.render(
            <ThemeProvider theme={theme}>

                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
