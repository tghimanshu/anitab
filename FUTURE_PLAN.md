# Future Plan: Phase 2 Enhancements

This document outlines the roadmap for the next phase of development for Anitab. Phase 1 focused on establishing the core functionality and architecture. Phase 2 aims to enhance user experience, add more robust features, and improve code quality.

## 1. Cloud Sync & Authentication
*   **Goal**: Allow users to access their dashboard and data across multiple devices.
*   **Tasks**:
    *   Implement user authentication (e.g., Firebase Auth, Auth0).
    *   Migrate data storage from `localStorage` to a cloud database (e.g., Firestore, MongoDB).
    *   Implement data synchronization logic.

## 2. Advanced Widget System
*   **Goal**: Provide more variety and customization in widgets.
*   **Tasks**:
    *   **Weather Widget**: Display current weather and forecast based on location.
    *   **Calendar Widget**: Integrate with Google Calendar or Outlook to show upcoming events.
    *   **Quote of the Day**: Display an inspirational quote daily.
    *   **News Feed**: Allow users to subscribe to RSS feeds or news sources.
    *   **Widget Resizing**: Allow users to resize widgets dynamically (currently fixed sizes in some aspects).

## 3. Enhanced Pomodoro Timer
*   **Goal**: Make the Pomodoro timer more feature-rich.
*   **Tasks**:
    *   **Statistics**: Track time spent on tasks and visualize productivity over time.
    *   **Task Integration**: Link Pomodoro sessions to specific tasks in the Todo list.
    *   **Sound Customization**: Allow users to choose different alarm sounds.

## 4. Theming and UI Improvements
*   **Goal**: Give users more control over the look and feel.
*   **Tasks**:
    *   **Dark/Light Mode**: Full system-wide dark mode support (already partially supported by MUI, but needs polish).
    *   **Color Themes**: Allow users to pick primary and secondary accent colors.
    *   **Animations**: Add smooth transitions when moving widgets or opening modals.

## 5. Codebase Improvements
*   **Goal**: Maintain a healthy and scalable codebase.
*   **Tasks**:
    *   **Unit Testing**: Implement comprehensive unit tests for Redux slices and utility functions (Jest, React Testing Library).
    *   **E2E Testing**: Add end-to-end tests using Cypress or Playwright.
    *   **CI/CD**: Set up a Continuous Integration/Continuous Deployment pipeline (GitHub Actions).
    *   **Accessibility (a11y)**: Audit and improve accessibility to ensure the app is usable by everyone.

## 6. Browser Extension
*   **Goal**: Package the application as a proper browser extension (Chrome, Firefox, Edge).
*   **Tasks**:
    *   Configure `manifest.json` for extension deployment.
    *   Implement "New Tab" override functionality natively.
    *   Publish to Chrome Web Store and Firefox Add-ons.
