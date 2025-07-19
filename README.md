🛒 BuyBuddy – MERN Stack eCommerce Website
BuyBuddy is a full-stack eCommerce web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to browse products, register or log in, add items to a cart, and simulate a purchase — all secured with JWT-based authentication.

🚀 Features
👤 Authentication
User Signup & Login using JWT tokens

Secure routes protected via middleware

Conditional UI rendering based on login status

Persistent session using token in localStorage

🛍️ Product Management
Product listing fetched from MongoDB backend

Users can browse available items

Product details include image, price, and description

🛒 Cart Functionality
Add to cart with quantity tracking

Cart stored uniquely per user in localStorage (cart_<userId>)

Remove items or buy items

Total price calculated and shown before purchase

💸 Purchase Flow
Once “Buy” is clicked, order details are stored

Feedback given via react-toastify toasts (instead of basic alerts)

Cart gets cleared after a successful order

🔐 Tech Stack
Frontend
React.js

Tailwind CSS

React Router DOM

React Toastify

Axios

Backend
Node.js

Express.js

MongoDB (via Mongoose)

JWT (jsonwebtoken)

🔄 Workflow
User Registration/Login

Credentials are sent to backend

JWT token is returned and stored in localStorage

Authenticated Session

Navbar dynamically changes (Login → Logout)

Routes get access to the token for secured access

Product Interaction

Products loaded from backend

Clicking "Add to Cart" stores data under cart_<userId>

Cart Actions

View all items in cart

Remove individual items

Click "Buy" → Order confirmed → Cart cleared

Toasts Instead of Alerts

Friendly UI notifications powered by react-toastify

Custom background and themes can be applied

