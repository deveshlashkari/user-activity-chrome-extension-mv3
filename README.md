# Chrome Extension Project

This project is a Chrome extension that tracks user activity on tabs. It logs key presses, tab creation, activation, and updates.

## Features

- Tracks key presses and stores them in an array.
- Logs when a tab is created or activated.
- Checks the current tab when it's updated.

## Code Overview

The main script file is `background.js`. Here's a brief overview of its structure:

- Variables: The script uses several global variables to keep track of the state, such as the current tab ID, the number of screenshots taken, and the keys pressed.

- Event Listeners: The script listens for various events from the Chrome runtime and tabs. These include messages from other scripts, tab creation, activation, and updates.

- Functions: The script includes several functions to handle these events. For example, `checkTab()` queries the current tab.

## Getting Started

To get started with this project, clone the repository and load the extension into your Chrome browser.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.
