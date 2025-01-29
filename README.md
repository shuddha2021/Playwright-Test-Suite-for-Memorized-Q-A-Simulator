# Playwright Test Suite for Memorized-Q-A-Simulator

## Overview
This repository contains an automated end-to-end testing framework for the Memorized-Q-A-Simulator project, implemented using Playwright. The test suite ensures that the simulator functions correctly by automating user interactions and verifying expected outcomes.

## Prerequisites
* Node.js (v14 or later)
* npm (Node Package Manager)
* The Memorized-Q-A-Simulator must be running locally. By default, it runs on http://localhost:5000/.

## Installation

### Clone the Repository
```bash
git clone https://github.com/shuddha2021/Memorized-Q-A-Simulator.git
cd Memorized-Q-A-Simulator
```

### Navigate to the Tests Directory
```bash
cd tests
```

### Install Dependencies
```bash
npm install
```

### Install Playwright Browsers
```bash
npx playwright install
```

## Running the Tests

### Start the Simulator
Ensure that the Memorized-Q-A-Simulator is running locally. If not, navigate to the project directory and start the server:

```bash
python app.py
```

The simulator should be accessible at http://localhost:5000/.

### Execute the Test Suite
In a new terminal window, navigate to the tests directory and run:

```bash
npx playwright test
```

This command will execute all tests across Chromium, Firefox, and WebKit browsers.

## Test Structure
* `playwright.config.js`: Configuration file defining test settings, browser projects, timeouts, and retries.
* `tests/qasimulator.spec.js`: Contains the actual test cases for the simulator.

### Test Cases

#### Known Q&A Pair Test
* Purpose: Verify that the simulator returns the correct response for a known Q&A pair.
* Steps:
  * Enter a predefined question about the number of legs a cat has.
  * Assert that the simulator returns "4" as the answer.

#### Unknown Q&A Prompt Test
* Purpose: Ensure the simulator handles unknown prompts gracefully.
* Steps:
  * Enter an unknown question about the capital of Italy.
  * Assert that the simulator returns an "unknown" message.

#### Prompt Format Validation Test
* Purpose: Confirm that the simulator validates the prompt format correctly.
* Steps:
  * Enter a question without the required "Q:" prefix.
  * Assert that an alert message prompts the user to start with "Q:".

## Adding New Tests

### Create a New Test File
Create a new `.spec.js` file within the tests directory, e.g., `additional_tests.spec.js`.

### Write Test Cases
Utilize Playwright's testing APIs to define new scenarios.

```javascript
const { test, expect } = require('@playwright/test');

test('New Test Case Description', async ({ page }) => {
    // Define test steps and assertions here
});
```

### Run the Tests
Execute the test suite to include the new test cases:

```bash
npx playwright test
```

## CI Integration
Integrate the Playwright test suite into your Continuous Integration (CI) pipeline to ensure that all tests pass with every commit. Here's a sample GitHub Actions workflow:

```yaml
# .github/workflows/playwright.yml

name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - name: Install Dependencies
      run: |
        npm install
        npx playwright install
    - name: Start Simulator
      run: |
        python app.py &
        sleep 5
    - name: Run Playwright Tests
      run: |
        npx playwright test
```

## Troubleshooting
* **Simulator Not Running**: Ensure that the Memorized-Q-A-Simulator is active on http://localhost:5000/ before running the tests.
* **Port Conflicts**: If port 5000 is in use, modify the simulator's configuration and update the test URLs accordingly.
* **Browser Launch Issues**: Verify that Playwright browsers are installed correctly using `npx playwright install`.

## Conclusion
This Playwright test suite provides a robust framework for ensuring the reliability and performance of the Memorized-Q-A-Simulator. By automating key user interactions and validating responses, it helps maintain high-quality standards and facilitates seamless development workflows.

Feel free to contribute to this repository by adding new tests or improving existing ones to further enhance the simulator's reliability.
