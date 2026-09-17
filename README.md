# E-Commerce API

A RESTful backend API for managing products in an online store. The API provides complete CRUD operations, pagination, sorting, product search, and category filtering.

## Features

* Create a product
* Get all products
* Get a single product by ID
* Update a product
* Delete a product
* Pagination
* Sort products by different fields
* Search products by name
* Filter products by category
* Request validation using Joi
* MongoDB database with Mongoose
* Text index on product name for search
* Centralized error handling
* Environment variable configuration
* Deployment with Render

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Joi
* dotenv
* Render

## Project Structure

```text
e-commerce-api/
├── config/
│   └── db.js
├── controllers/
│   └── product.controllers.js
├── middlewares/
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   └── product.model.js
├── routes/
│   └── product.route.js
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd e-commerce-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
```

Do not commit the `.env` file to GitHub.

### 4. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API runs locally on:

```text
http://localhost:4000
```

## API Endpoints

All product endpoints use the `/api/products` base path.

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/products`     | Create a product    |
| GET    | `/api/products`     | Get all products    |
| GET    | `/api/products/:id` | Get a product by ID |
| PUT    | `/api/products/:id` | Update a product    |
| DELETE | `/api/products/:id` | Delete a product    |

## Product Fields

A product contains:

| Field         | Type    | Required  | Description                                          |
| ------------- | ------- | --------- | ---------------------------------------------------- |
| `name`        | String  | Yes       | Product name; indexed for search                     |
| `price`       | Number  | Yes       | Product price; minimum value is 0                    |
| `description` | String  | No        | Product description                                  |
| `category`    | String  | Yes       | Product category                                     |
| `inStock`     | Boolean | No        | Whether the product is available; defaults to `true` |
| `createdAt`   | Date    | Automatic | Creation timestamp                                   |
| `updatedAt`   | Date    | Automatic | Last update timestamp                                |

## Creating a Product

**POST**

```text
/api/products
```

Example request:

```json
{
  "name": "iPhone 15",
  "price": 850000,
  "description": "Apple smartphone with advanced features",
  "category": "Electronics",
  "inStock": true
}
```

A successful request returns:

```text
201 Created
```

## Pagination

Products can be paginated using the `page` and `limit` query parameters.

Example:

```text
GET /api/products?page=2&limit=2
```

The response includes pagination information such as the current page, limit, total number of products, and total number of pages.

## Sorting

Products can be sorted using the `sort` query parameter.

Sort by price from lowest to highest:

```text
GET /api/products?sort=price
```

Sort by price from highest to lowest:

```text
GET /api/products?sort=-price
```

## Search

Products can be searched by name using either `search` or `name`.

Example:

```text
GET /api/products?search=phone
```

or:

```text
GET /api/products?name=samsung
```

Search is case-insensitive.

## Category Filtering

Products can also be filtered by category.

Example:

```text
GET /api/products?category=Electronics
```

## Combining Query Parameters

Pagination, sorting, and filtering can be combined.

Example:

```text
GET /api/products?category=Electronics&sort=price&page=1&limit=2
```

## Error Handling

The API returns appropriate HTTP status codes for different situations:

* `200 OK` — successful GET, PUT, or DELETE request
* `201 Created` — product successfully created
* `400 Bad Request` — invalid request data or product ID
* `404 Not Found` — requested product does not exist
* `500 Internal Server Error` — unexpected server error

## Live API

The deployed Render URL will be added here after deployment.

## Screenshots

### Product Search

![Product search screenshot](search%20keyword.png)

### Pagination

![Pagination screenshot](pagnation.png)

## Author

**Chioma Ikeh**

GitHub: Debbie-1709


