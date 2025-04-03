# Shopping Cart

This is a shopping cart page example with a small API to fetch products.
The project is part of the [The Odin Project's](https://www.theodinproject.com/) Full Stack JavaScript path.

## App features

- Fetch products from an API with infinite scroll
- Add products to the cart
- Remove products from the cart
- Update the cart quantities
- Calculate the total price of the cart
- User can switch between light and dark mode

## Live Preview

- [Shopping Cart UI](https://shopping-cart-aarnif.netlify.app/)
- [Shopping Cart API](https://shopping-cart-api-uygi.onrender.com/)

## Technologies

- Node.js
- GraphQL
- PostgreSQL
- Vite + React
- Tailwind CSS
- HTML

## Icons

- [React Icons](https://react-icons.github.io/react-icons/)

## Testing application locally

First clone the repository and install the dependencies:

```
HTTPS - git clone https://github.com/aarnif/shopping-cart.git

SSH - git clone git@github.com:aarnif/shopping-cart.git

cd shopping-cart

npm install

```

After that create a .env file in the root of the above directory and replace the values of the environment variables below with your own:

```
PORT=Server port

DATABASE_URL=PostgreSQL URI

# Docker PostgreSQL URI
TEST_DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/postgres

SERVER_URL="api url"

```

Finally, here are the available npm-scripts:

```

npm run dev:server # Start the server in development mode

npm run dev:ui # Start the ui in development mode

npm run prod:server # Start the server in production mode

npm run build:ui # Build the ui

npm run prod:ui # Start the ui in production mode

npm run test:ui # Run the ui-component tests

npm run start:test:db # Start the test database (docker container with mongo and redis)

npm run test:server # Run the server tests

npm run start:test:server # Start the server in test mode for e2e tests

npm run test:e2e # Run the e2e tests

```

## License

This project is [MIT licensed](LICENSE).
