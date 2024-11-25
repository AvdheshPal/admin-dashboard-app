# Dynamic Multi-Step Form Submission

This project demonstrates a dynamic multi-step form built using React, Redux Toolkit, and Vite for bundling. It features seamless state management, file upload capabilities, and robust error handling. The form includes loading indicators, success feedback, and retry or refill options in case of submission errors.

## Features

- **Dynamic Multi-Step Form**: Users can complete different sections of the form step by step.
- **Redux Integration**: State is managed globally using Redux Toolkit, ensuring seamless data flow across the application.
- **File Upload**: Support for uploading multiple files with a user-friendly interface.
- **Error Handling**: Displays descriptive error messages with options to retry or refill the form, ensuring smooth user experience during failures.
- **Reusable Components**: Common UI elements like buttons, loaders, and input fields are built as reusable components to maintain consistency and reduce code redundancy.
- **Dynamic Stepper Component**: A fully customizable and reusable stepper component that can be easily adapted for different forms or workflows.
- **Scalable Architecture**: Designed with scalability in mind, allowing easy integration of additional steps or features in the future.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices, ensuring a consistent experience across different screen sizes.
- **Smooth User Feedback**: Includes a loading spinner during form submission, success indicators, and error feedback for a polished user interaction.
- **API Integration**: XANO is used as the backend for API calls, offering a robust and reliable backend solution.
- **Modular Folder Structure**: A well-organized folder structure to make the codebase easy to navigate and maintain.
- **Vite Bundler**: Leverages Vite for fast builds, hot module replacement (HMR), and an improved development experience.
- **Optimized State Management**: Efficient use of Redux for handling complex form states, ensuring smooth transitions between steps.
- **Customizable Styling**: Tailwind CSS allows rapid customization of styles while maintaining a clean and maintainable codebase.


## Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: Redux Toolkit
- **UI Styling**: Tailwind CSS
- **Bundler**: Vite
- **Backend Service**: XANO (for API integration)

---

## Installation and Setup

Follow these steps to set up the project locally after cloning the repository:

### Prerequisites

- **Node.js** (version >= 14)
- **npm** or **yarn**
- Git

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AvdheshPal/admin-dashboard-app.git
   cd admin-dashboard-app
   ```

2. **Install Dependencies**

   Run the following command to install all the project dependencies:

   ```bash
   npm install
   ```

   or if using yarn:

   ```bash
   yarn install
   ```

3. **Run the Development Server**

   Start the development server with:

   ```bash
   npm run dev
   ```

   or if using yarn:

   ```bash
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

4. **Build for Production**

   To create a production build of the app, use:

   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

5. **Run Tests (Optional)**

   To run tests for your application:

   ```bash
   npm test
   ```

   or

   ```bash
   yarn test
   ```

---

## Folder Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Main form pages (BasicDetails, Address, FileUpload, FormDone)
├── Redux/               # Redux slices and store setup
├── Config/              # Service configurations (e.g., API calls to XANO)
├── App.tsx              # Main app entry point
├── index.tsx            # ReactDOM rendering
└── styles/              # Tailwind CSS configuration
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Open a pull request describing your changes.

### Open for your feedback.

## Thank you.