# Image processor

This API has the functionality to generate images in multiple resolutions from an original image. 


# Wrokflow

Each interaction with the API by sending a valid image or URL, generates a task. These tasks can be consulted,
obtaining information about their status and the images generated.


# Installation

1. Clone the repository `https://github.com/hedico/image_processor.git`
2. Install dependencies with `npm install`
3. Create a new file named `.env` in the root of the project and copy the content from `.env.example` into it


# Usage

- Run the server
  ```bash
  npm start

- Run the development server
  ```bash
  npm run start:dev

- Build
  ```bash
  npm run build

- Refresh dependencies
  ```bash
  npm run refresh:dependencies

- Lint
  ```bash
  npm run lint

- Build containers
  ```bash
  npm run build:environment

- Refresh containers
  ```bash
  npm run refresh:environment

- Remove containers
  ```bash
  npm run remove:environment


# Comments


- The decision to use Axios as a library to launch HTTP requests has been that it offers error handling, while for example Fetch, native of Nodejs does not have it.
