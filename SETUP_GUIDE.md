# Glams Beauty - Homework 2 Setup Guide

This document provides instructions for setting up and running the Glams Beauty AdonisJS application.

## Project Structure

The project follows AdonisJS best practices with the following key directories:

```
glams-beauty2/
├── app/
│   ├── controllers/         # Request handlers
│   │   ├── home_controller.ts
│   │   ├── products_controller.ts
│   │   ├── wishlist_controller.ts
│   │   ├── seller_products_controller.ts
│   │   └── seller_wishlist_controller.ts
│   └── models/              # Database models
│       ├── user.ts
│       ├── product.ts
│       └── wishlist.ts
├── database/
│   ├── migrations/          # Database schema
│   │   ├── create_users_table.ts
│   │   ├── create_products_table.ts
│   │   └── create_wishlists_table.ts
│   └── seeders/             # Sample data
│       └── product_seeder.ts
├── resources/
│   ├── css/                 # Stylesheets
│   │   ├── styles-index.css
│   │   ├── styles-product.css
│   │   ├── styles-detail.css
│   │   └── styles-seller.css
│   └── views/               # Edge templates
│       ├── components/
│       │   └── layout/
│       │       └── app.edge
│       ├── pages/
│       │   ├── home.edge
│       │   ├── product.edge
│       │   ├── detail.edge
│       │   ├── wishlist.edge
│       │   ├── about.edge
│       │   ├── contact.edge
│       │   ├── cart.edge
│       │   └── seller/
│       │       ├── dashboard.edge
│       │       ├── add_product.edge
│       │       ├── edit_product.edge
│       │       └── wishlist_viewer.edge
│       └── partials/
│           ├── header.edge
│           └── footer.edge
└── start/
    └── routes.ts            # Application routes
```

## Features Implemented

### User (Customer) Features:
1. **Home Page** - `/` - Displays branding, tagline, and top 3 best-selling products
2. **Products Page** - `/products` - Browse all products with category filtering (Face, Eyes, Lips)
3. **Product Detail Page** - `/products/:id` - View detailed product information
4. **Wishlist Page** - `/wishlist` - View and manage saved items
5. **About Page** - `/about` - Information about Glams Beauty
6. **Contact Page** - `/contact` - Contact information

### Seller (Admin) Features:
1. **Seller Dashboard** - `/seller/dashboard` - List all products with edit/delete actions
2. **Add Product** - `/seller/products/create` - Form to add new products
3. **Edit Product** - `/seller/products/:id/edit` - Update existing products
4. **Wishlist Viewer** - `/seller/wishlists` - View all user wishlists

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` (if not already done):

```bash
cp .env.example .env
```

### 3. Run Migrations

Create the database tables:

```bash
node ace migration:run
```

### 4. Seed the Database

Populate the database with sample products:

```bash
node ace db:seed
```

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3333`

## Routes Overview

### User Routes:
- `GET /` - Home page
- `GET /products` - Products listing (supports `?category=Face|Eyes|Lips`)
- `GET /products/:id` - Product detail
- `GET /wishlist` - User's wishlist
- `POST /wishlist` - Add product to wishlist
- `DELETE /wishlist/:id` - Remove from wishlist
- `GET /about` - About page
- `GET /contact` - Contact page
- `GET /cart` - Shopping cart

### Seller Routes:
- `GET /seller/dashboard` - Product management dashboard
- `GET /seller/products/create` - Add product form
- `POST /seller/products` - Store new product
- `GET /seller/products/:id/edit` - Edit product form
- `PUT /seller/products/:id` - Update product
- `DELETE /seller/products/:id` - Delete product
- `GET /seller/wishlists` - View all user wishlists

## Database Models

### Product Model
- `id` - Primary key
- `name` - Product name
- `price` - Product price (decimal)
- `description` - Product description
- `image` - Image URL/path
- `category` - Product category (Face, Eyes, Lips)
- `sold` - Number of units sold
- `created_at` / `updated_at` - Timestamps

### Wishlist Model
- `id` - Primary key
- `user_id` - Foreign key to users
- `product_id` - Foreign key to products
- `created_at` / `updated_at` - Timestamps

### User Model (pre-existing)
- `id` - Primary key
- `full_name` - User's full name
- `email` - User's email (unique)
- `password` - Hashed password
- `created_at` / `updated_at` - Timestamps

## Design Notes

- **Layout**: All pages use `layout/app.edge` as the base template
- **Styling**: Pure CSS (no Tailwind) - each page has its own stylesheet
- **Database**: SQLite (configured in `config/database.ts`)
- **Theme**: Glams Beauty theme with gold accent color (#D4AF37)
- **Navigation**: Header includes links to both user and seller sections

## Additional Commands

### Create a new migration:
```bash
node ace make:migration <migration_name>
```

### Create a new model:
```bash
node ace make:model <model_name>
```

### Create a new controller:
```bash
node ace make:controller <controller_name>
```

### Rollback migrations:
```bash
node ace migration:rollback
```

### Fresh database (rollback and re-run all migrations):
```bash
node ace migration:fresh
```

## Notes

- The wishlist functionality uses a default `user_id = 1` since full authentication is not implemented
- Image paths should be relative to the public directory (e.g., `resources/assets/product.jpg`)
- Product categories are: Face, Eyes, Lips
- The seller dashboard is accessible to all users (authentication would be added in production)

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed: `npm install`
2. Ensure migrations have run: `node ace migration:run`
3. Check if the development server is running: `npm run dev`
4. Verify the `.env` file is configured correctly
5. Check the console for any error messages

## Future Enhancements

- User authentication and authorization
- Shopping cart functionality with checkout
- Product search functionality
- Image upload for products
- Order management
- User profile pages
- Product reviews and ratings
