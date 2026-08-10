# Grocery Store

A full-stack grocery e-commerce application built with React, Vite, Express, and MongoDB. Customers can browse products, manage a cart and wishlist, create accounts, save addresses, and place orders. Administrators can manage categories, products, and orders from the admin dashboard.

## Features

*   Product browsing by category with product detail pages
*   Customer registration, login, authentication, and logout
*   Shopping cart and wishlist
*   Address management and checkout
*   Order history
*   Admin authentication and dashboard
*   Admin CRUD operations for categories and products
*   Admin order management
*   Image uploads served by the backend
*   Sample category and product data seeding

## Tech stack

*   Frontend: React 19, React Router, Vite, Tailwind CSS, Axios
*   Backend: Node.js, Express 5, Mongoose, MongoDB
*   Authentication: JWT stored in HTTP-only cookies
*   UI: Lucide React, Motion, Swiper, React Hot Toast

## Project structure

```
.
├── backend/
│   ├── config/          MongoDB connection
│   ├── controllers/     Request handlers
│   ├── middlewares/     Authentication and upload middleware
│   ├── models/          Mongoose models
│   ├── routes/          API routes
│   ├── uploads/         Uploaded product images
│   ├── index.js         API entry point
│   ├── seed.js          Sample catalog seeder
│   └── seedAdmin.js     Admin account seeder
└── frontend/
    └── src/
        ├── components/  Reusable UI components
        ├── context/     Shared application state
        ├── pages/       Storefront and admin pages
        └── assets/      Static frontend assets
```

## Requirements

*   Node.js 18 or newer
*   npm
*   MongoDB Atlas or a local MongoDB server

## Installation

Clone the repository and install dependencies in both applications:

```
git clone <repository-url>
cd MERN-ECOMMERCE-GROCERY

cd backend
npm install

cd ../frontend
npm install
```

## Environment variables

Create `backend/.env` from `backend/.env.example`:

```
PORT=4000
MONGO_URL="your-mongodb-connection-string"
JWT_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-password"
```

Create `frontend/.env` from `frontend/.env.example`:

```
VITE_CURRENCY="$"
VITE_BASEURL="http://localhost:4000"
```

The backend accepts the frontend at `http://localhost:5173` by default. If you change the frontend or backend host, update the CORS configuration in `backend/index.js` as well.

## Seed the database

Make sure MongoDB is available, then run the catalog seeder:

```
cd backend
npm run seed
```

This clears existing categories and products before inserting the sample catalog. To create or update the administrator account defined in `backend/.env`, run:

```
npm run seed:admin
```

## Run locally

Start the API in one terminal:

```
cd backend
npm start
```

Start the Vite development server in another terminal:

```
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in a browser. The backend runs on the port configured by `PORT` (4000 in the example).

## Useful scripts

### Backend

| Command | Description |
| --- | --- |
| `npm start` | Start the API with Nodemon |
| `npm run seed` | Replace the sample catalog data |
| `npm run seed:admin` | Create or update the admin user |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Main routes

### Storefront

*   `/` — Home page
*   `/shop` — Product catalog
*   `/product/:id` — Product details
*   `/cart` — Shopping cart
*   `/wishlist` — Wishlist
*   `/checkout` — Checkout
*   `/my-orders` — Customer orders

### Admin

*   `/admin` — Admin dashboard/login
*   `/admin/products` — Product management
*   `/admin/categories` — Category management
*   `/admin/orders` — Order management
*   `/admin/add-product` — Add a product
*   `/admin/add-category` — Add a category

## API groups

The backend exposes API routes under:

```
/api/auth
/api/admin
/api/category
/api/product
/api/address
/api/order
```

## Production notes

*   Use strong, unique values for `JWT_SECRET` and `ADMIN_PASSWORD`.
*   Configure MongoDB network access and credentials for the deployment environment.
*   Update the backend CORS origin for the deployed frontend URL.
*   Set `VITE_BASEURL` to the deployed API URL before building the frontend.
*   Do not commit `.env` files or production secrets.

## License

This project currently does not declare a specific open-source license.