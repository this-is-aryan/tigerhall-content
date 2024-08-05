
# Interview Project: TigerHall Content

TigerHall Content is a react native application that can be used to search TigerHall content.

## Table of Contents
- Project Requirements
- Basic Features
- Additional Features
- Installation and Usage
- Project Structure

## Project Requirements
- The search should filter the content cards using the API and the keywords filter.
- When searching, there should be a loading animation (Let us see how creative you can be).
- Any changes to search should have a 300 ms debounce.
- Pagination should be implemented. If the user reaches the end of the page, then we should fetch more content cards (Infinite Scroll).
- A readme should be provided with instructions on how to run the project.

## Basic Features
- Search Functionality is used to Filter the Cards with GraphQL API.
- When Searching, the Shimmer Loading is visible.
- Any Search has a debounce of 300ms.
- Pagination is implemented. Infinite Scroll is enabled.
- Readme.md file is updated with instructions.

## Additional Features
- In case of no data available, List Empty State is available.
- In case of Error, List Error State is available.
- In case of Error, List Retry Logic is in place. User can retry fetching the data 3 times. This limit is configurable.
- For Search Bar, clear search button is available.
- Self-describing icons are available in all necessary places.
- List Pull-to-refresh is available. On Refresh, Loading state is visible.
- Card Designs are as per the Figma designs shared by TigerHall Team.
- Code Quality Tools like eslint, prettier are integrated and ready to use.
- Different Utils like Device, Image and Code Helper are available to extend the project functionality.
- Different Design Utils like Color Palettes are separate modules for easy integration and ease of usage.
- For API related functionalities, separate module for Queries is available and ready to extend.
- For Testing, the project has Jest Library setup and has test cases written for all Major Components.
- Project follows Domain-driven Folder structure for good developer experience and intuitive design.





## Installation and Usage

This project currently includes:
- React Native
- Expo
- Expo Vector Icons
- GraphQL and ApolloClient
- TypeScript
- Eslint
- Prettier
- Jest
- And much more.

Step 1: Cloning the repository

The following repository is public and can be accessed by anyone.

```
git clone https://github.com/this-is-aryan/tigerhall-content.git
```

Step 2: Installing Dependencies and Starting Project

Once Cloning, open the project directory and run these commands:

```bash
// Install Dependencies
    npm install

// In case of any dependency error, run this command:
    npm install --legacy-peer-deps

// Open the terminal in same directory and run
    npm start


// Once this is done, you can choose the simulator or device of your choice to view the application.

```

## Project Structure

This project follows Domain-driven folder and file structure for Better Developer experience and intuitive project design.

Project's structure will look similar to this:

```
tigerhall-content
├── app
│   ├── components
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   └── app.tsx
├── App.tsx
├── README.md
└── package.json

```

### ./app directory

The inside of the src directory looks similar to the following:

```
app
│── components
│── constants
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

- **components**
  This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like ProgressBar, Loader etc.

- **constants**

  This is where app constants will live. You can add more files specific to different features.

- **screens**

    This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.


- **services**

    Any services that interface with the outside world will live here (think REST APIs, GraphQL etc.).


- **theme**

    Here lives the theme for your application, including spacing, colors, and typography.


- **utils**

    This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.


- **app.tsx**

    This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.



## Running Tests

The Project has tests written for Major Components and helper files.

To run tests, run the following command

```bash
  npm run test
```


## Authors

- [@this-is-aryan](https://github.com/this-is-aryan)


## Author's Words

Thank you for reading this file.

For any queries, please drop an email at ```pradeepdan.work@gmail.com```.

Have a nice day. Cheers!

