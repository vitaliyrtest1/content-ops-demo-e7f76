import '../css/main.css';
import React from 'react';
import { WithNinetailedProvider } from '../utils/ninetailed-helpers';
import { AnalyticsProvider } from '../components/GoogleAnalytics/context';

export default function MyApp({ Component, pageProps }) {
    React.useEffect(() => {
        const handler = (...args) => {
            console.log('objectsChanged', args);
        };
        console.log('mount!');
        window.addEventListener('stackbitObjectsChanged', handler);
        return () => {
            window.removeEventListener('stackbitObjectsChanged', handler);
        };
    }, []);
    return (
        <AnalyticsProvider>
            <WithNinetailedProvider>
                <Component {...pageProps} />
            </WithNinetailedProvider>
        </AnalyticsProvider>
    );
}
