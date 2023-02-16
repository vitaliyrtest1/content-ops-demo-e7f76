const { initContent } = require('./src/utils/init-content');

let shouldInitContent = true; // next.config.js may be loaded multiple times

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    webpack: (config) => {
        config.watchOptions.ignored.push('**/content/pages/**');
        config.watchOptions.ignored.push('**/.sourcebit-nextjs-cache.json');
        return config;
    }
};

module.exports = async () => {
    if (shouldInitContent) {
        // If content source is external, write styling config to file before Tailwind config loads
        await initContent();
        shouldInitContent = false;
    }
    return nextConfig;
};
