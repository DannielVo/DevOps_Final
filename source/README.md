# Product Management Application (Express + MongoDB with In-Memory Fallback)

## 1. Overview

This project is a sample **Product Management Web Application** built using **Node.js** and **Express**, following the **MVC (Model–View–Controller)** architecture.

The application uses **MongoDB (via Mongoose)** as the primary data source. If the server fails to connect to MongoDB during startup (within a 3-second timeout), it will automatically fall back to an **in-memory datastore**, ensuring that the application remains operational.

This project serves as the **foundation for the DevOps Final Project** in the course _Software Deployment, Operations and Maintenance_.

---

## 2. Key Features

- Full **RESTful API** for product management (CRUD operations)
- Server-side rendered UI using **EJS** and **Bootstrap**
- Automatic fallback from **MongoDB → in-memory datastore**
- Product image upload using `multipart/form-data`
- Uploaded images stored in `public/uploads/`
- Automatic deletion of old images when updating or deleting products
- JSON responses include:
  - `hostname` (server identifier)
  - `source` (mongodb or in-memory)
- Automatic seeding of sample product data when MongoDB is empty

---

## 3. Project Structure

```bash
source/
│
├── main.js         # Application entry point
├── models/         # Mongoose schemas
├── controllers/    # Request/response handling logic
├── routes/         # API and UI routes
├── services/       # Data source abstraction layer
├── views/          # EJS templates (UI)
├── public/         # Static files (CSS, JS, uploads)
└── .env            # Environment variables
```

---

## 4. Requirements

- Node.js (version 16 or higher)
- npm (Node Package Manager)
- MongoDB (local or remote instance)

---

## 5. Environment Configuration

Create a `.env` file in the root directory:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/products_db
```

If authentication is required, update the MongoDB URI accordingly.

---

## 6. Installation & Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the application

#### Production mode

```bash
npm start
```

#### Development mode (with nodemon)

```bash
npm run dev
```

### 3. Access the application

Open your browser and navigate to:

```bash
http://localhost:3000
```

---

## 7. API Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /products     | Get all products           |
| GET    | /products/:id | Get product by ID          |
| POST   | /products     | Create a new product       |
| PUT    | /products/:id | Replace a product          |
| PATCH  | /products/:id | Update a product partially |
| DELETE | /products/:id | Delete a product           |

---

## 8. System Behavior

The application attempts to connect to MongoDB on startup with a 3-second timeout

If the connection fails, it switches to in-memory mode

When MongoDB is available and empty, the system automatically seeds sample products

Uploaded images are stored in:

```bash
public/uploads/
```

When updating or deleting a product, old image files are automatically removed if applicable

---

## 9. Limitations & Recommendations

- Storing images on the local server is suitable for development only

- For production environments, it is recommended to use cloud storage such as:
  - Amazon S3

  - Cloudinary

- Additional improvements could include:
  - File size limits for uploads

  - MIME type validation (e.g., image/\*)

  - Authentication and authorization##

---

## 10. Notes

- The application logs indicate whether the current data source is:
  - mongodb

  - in-memory

- You can install nodemon globally for development:

```bash
npm install -g nodemon
```
