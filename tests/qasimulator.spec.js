// tests/qasimulator.spec.js
// Playwright Test Suite for Memorized-Q-A-Simulator

const { test, expect } = require('@playwright/test');

test.describe('Memorized-Q-A-Simulator Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the simulator's URL
        await page.goto('http://localhost:5000/');
    });

    test('Should display the correct response for a known Q&A pair', async ({ page }) => {
        // Enter the Q&A prompt
        await page.fill('#promptInput', 'Q: How many legs does a cat have?\nA:');

        // Click the "Ask" button
        await page.click('text=Ask');

        // Wait for the response to appear
        const fullResponse = await page.waitForSelector('#fullRespText');
        const extractedAnswer = await page.waitForSelector('#extractedAnsText');

        // Assert the full response
        await expect(fullResponse).toHaveText(/A: 4/);

        // Assert the extracted answer
        await expect(extractedAnswer).toHaveText('Extracted answer: 4');
    });

    test('Should handle unknown Q&A prompts gracefully', async ({ page }) => {
        // Enter an unknown Q&A prompt
        await page.fill('#promptInput', 'Q: What is the capital of Italy?\nA:');

        // Click the "Ask" button
        await page.click('text=Ask');

        // Wait for the response to appear
        const fullResponse = await page.waitForSelector('#fullRespText');
        const extractedAnswer = await page.waitForSelector('#extractedAnsText');

        // Assert the full response for unknown prompt
        await expect(fullResponse).toHaveText(/unknown/i);

        // Assert the extracted answer
        await expect(extractedAnswer).toHaveText('Extracted answer: N/A');
    });

    test('Should validate prompt format', async ({ page }) => {
        // Enter an incorrectly formatted prompt
        await page.fill('#promptInput', 'How many legs does a dog have?');

        // Click the "Ask" button
        await page.click('text=Ask');

        // Expect an alert to appear
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain("Please start your prompt with 'Q:'");
            await dialog.dismiss();
        });
    });
});
