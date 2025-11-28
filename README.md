# Anitab

Anitab is a comprehensive "New Tab" replacement for your browser, built with React, TypeScript, and Vite. It serves as a personal dashboard to boost your productivity, featuring widgets for managing tasks, taking notes, bookmarking sites, and a Pomodoro timer.

## Features

*   **Customizable Dashboard**: Drag and drop widgets to arrange them exactly how you like.
*   **Todo List**: Keep track of your daily tasks with a simple and effective todo list. Tasks are categorized into "Today" and "Older".
*   **Notes**: Quickly jot down thoughts and ideas. Notes are collapsible for a clean look.
*   **Bookmarks**: Save your favorite websites for quick access. Favicons are automatically fetched.
*   **Pomodoro Timer**: Stay focused with a built-in Pomodoro timer. Customize work and break intervals.
*   **Personalization**: Set your username, greeting, and choose between default or custom background images.
*   **Local Storage**: All your data is saved locally in your browser, ensuring privacy and persistence.

## Technologies Used

*   **React**: UI Library
*   **TypeScript**: Static Typing
*   **Vite**: Build Tool
*   **Redux Toolkit**: State Management
*   **React Grid Layout**: Draggable and Resizable Grid System
*   **Material UI**: Component Library
*   **Moment.js**: Date and Time Manipulation
*   **Sass**: CSS Preprocessor

## Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/anitab.git
    cd anitab
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running Development Server

To start the development server with hot module replacement:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Linting

To run the linter:

```bash
npm run lint
# or
yarn lint
```

## Usage

1.  **Dashboard**: Upon opening, you will see the default layout.
2.  **Widgets**:
    *   **Drag**: Click and hold the header of any widget to move it around.
    *   **Toggle**: Go to Settings -> Widgets to show or hide specific widgets.
3.  **Settings**:
    *   Click on your avatar in the top right corner to access "My account" or "Settings".
    *   **My Profile**: Update your username, greeting, and background image.
    *   **Pomodoro**: Configure work and break durations.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
