# Pokemon App

Pokémon App is a web application that allows users to browse a paginated list of Pokémon from the PokéAPI and view detailed information about each one, including their name, image, and abilities. It features navigation buttons for browsing between Pokémon and preserves the last viewed page when returning to the main list. The application follows the **MVVM architecture** to ensure a clear separation of concerns and is designed following **SOLID principles** and **best design patterns** for maintainable, scalable, and clean code. Made by Pablo Vélez.

Deployment Demo: [Pokemon App Demo](https://pokemon-app-velez.vercel.app/)

## Stack

| Tool         | Purpose                                           |
| ------------ | ------------------------------------------------- |
| React        | A JavaScript library for building user interfaces |
| React Query  | Data synchronization & caching library for React  |
| Zustand      | Minimalist state management                       |
| TypeScript   | Static typing for JavaScript                      |
| Vite         | Build tool and development server                 |
| Vitest & RTL | Unit and component testing framework              |

## Features

:white_check_mark: Faster build with Vite

:white_check_mark: State management using Zustand

:white_check_mark: Data fetching & caching using React Query and Axios

:white_check_mark: TypeScript for static typing

:white_check_mark: Pre-configured with ESLint and Prettier for code linting and formatting

:white_check_mark: Unit and component testing with Vitest and React Testing Library

## Getting Started

### Clone the repository

```
git clone https://github.com/vintagegnome/react-query-zustand-ts-vite-boilerplate.git
cd react-query-zustand-ts-vite-boilerplate
```

### Installing Dependencies

```
npm install
```

### Running Locally

To run the project locally, simply execute:

```
npm run dev
```

## Project Structure

Here's a basic overview of the significant folders in the boilerplate:

```
├── public
└── src
  ├── components
  ├── config
  ├── constants
  ├── models
  ├── routes
  ├── viewModels
  ├── store
  └── views
```

| Folder        | Description                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`src/`**    | Contains the main source code for the application.                                                                                                            |
| `components`  | Reusable React components, each handling a specific piece of the UI.                                                                                          |
| `viewModels`  | Where the custom React hooks reside so they encapsulate logic and behaviors which can be reused across different components.                                  |
| `utils`       | Miscellaneous utility functions, helpers, and other standalone pieces of logic.                                                                               |
| `views`       | Components representing full pages in the application, typically corresponding to routes.                                                                     |
| `routes`      | Configuration and components related to routing in the application.                                                                                           |
| `models`      | Functions or classes that handle tasks like API calls, data processing, or other "service"-like tasks.                                                        |
| `store`       | Zustand st ores for state management, holding                                                                                                                 |
| **`public/`** | Contains static assets like images, fonts, and the entry HTML file. Assets in this directory are served directly and are not processed by bundlers like Vite. |

## Features

| Tool/Library | Description                                                 |
| ------------ | ----------------------------------------------------------- |
| React Query  | Helps in fetching, caching, and updating asynchronous data. |
| Zustand      | For simple and scalable state management.                   |
| TypeScript   | For type-safe code and scalability.                         |
| Vite         | For faster builds and a smoother developer experience.      |

## License

[MIT](https://choosealicense.com/licenses/mit/)
