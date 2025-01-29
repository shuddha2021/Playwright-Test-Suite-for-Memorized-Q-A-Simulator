// playwright.config.js
// Playwright Test Configuration

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    timeout: 30000,
    retries: 2,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'WebKit',
            use: { browserName: 'webkit' },
        },
    ],
};

module.exports = config;
