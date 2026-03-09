# Full Stack E-Commerce Web Application

This is a **Full Stack E-Commerce Web Application** built using **React (Vite) for the frontend** and **Django REST Framework for the backend**.

The application allows users to browse products, view product details, and place orders. The backend provides REST APIs, and the frontend consumes these APIs to display data.

---

# Tech Stack

## Frontend

* ReactJS
* Vite
* Bootstrap
* Axios

## Backend

* Django
* Django REST Framework
* SQLite Database
* JWT Authentication

---

# Project Structure

```
ecommerce-fullstack
│
├── backendEcommerce
│   ├── backendEcommerce
│   ├── base
│   ├── manage.py
│
└── ecommerceFrontend
    ├── src
    ├── public
    ├── package.json
    └── vite.config.js
```

---

# Prerequisites (Windows)

Make sure the following software is installed:

* Python (3.10 or above)
* Node.js (18 or above)
* Git

Check installed versions:

```
python --version
node -v
npm -v
git --version
```

---

# Clone the Repository

```
git clone https://github.com/1css/eCommerce-website.git
cd eCommerce-website
```

---

# Backend Setup (Django)

Go to the backend folder:

```
cd backendEcommerce
```

Create a virtual environment:

```
python -m venv venv
```

Activate the virtual environment (Windows):

```
venv\Scripts\activate
```

Install required packages:

```
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
```

Apply database migrations:

```
python manage.py migrate
```

Run the backend server:

```
python manage.py runserver
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

# Frontend Setup (React + Vite)

Open another terminal and go to the frontend folder:

```
cd ecommerceFrontend
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the `ecommerceFrontend` folder.

Example:

```
VITE_API_URL=http://127.0.0.1:8000
```

---

# Features

* User registration and login
* Product listing
* Product details page
* Add to cart
* Order placement
* REST API integration
* Responsive user interface

---

# Author

Harshith C S
Full Stack Developer
