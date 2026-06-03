# Let Him Cook 🍳

A modern, full-stack, Reddit-inspired culinary community platform designed for seamless recipe sharing, authenticated user interactions, and decentralized recipe discovery. Built with a unified JavaScript ecosystem using the MERN stack.

🌐 **Live Demo:** [https://let-him-cook-mauve.vercel.app](https://let-him-cook-mauve.vercel.app)

---

## 🚀 Key Features
* **Reddit-Style Feed:** High-contrast, minimalist UI built for clean scannability.
* **Stateless Authentication:** Secure user registration and login powered by JSON Web Tokens (JWT) and persistent browser sessions.
* **Dynamic Content Creation:** Interactive form architecture for posting, formatting, and viewing custom recipes without refreshing the page.
* **Cloud-Native Architecture:** Fully decoupled frontend and backend deployments maximizing global availability and reliability.

---

## 🛠️ Tech Stack & Technologies Used

### Frontend (Client-Tier)
* **React.js (v18+):** For building a component-driven Single Page Application (SPA).
* **Vite:** Lightning-fast Next-Generation build tool providing sub-second Hot Module Replacement (HMR).
* **React Router Dom:** Handles dynamic client-side routing across components.
* **Axios:** Promise-based HTTP client used to seamlessly communicate with the server backend.

### Backend (Logic-Tier)
* **Node.js:** Asynchronous, event-driven JavaScript runtime engine.
* **Express.js:** Minimalist, high-performance routing framework for building out the RESTful API endpoints.
* **Bcrypt.js:** Secure 12-salt-round cryptographic password hashing to protect user credentials.

### Database (Data-Tier)
* **MongoDB Atlas:** Cloud-hosted, document-oriented NoSQL database perfect for flexible, BSON-based recipe structures.
* **Mongoose:** Object Data Modeling (ODM) library used to enforce strict data schemas on top of MongoDB.

---

## 🔄 System Data Flow (Architecture)

1. **Client Action:** The user interacts with the React UI (e.g., clicks "Publish Recipe").
2. **State Capture & Transport:** Local input states are collected and transported securely via an encrypted `Axios` payload alongside a stored `JWT` token.
3. **API Routing & Security Middleware:** The `Express.js` server receives the REST request, triggers middleware to decode/verify the token, and handles route validation.
4. **Data Persistence:** The controller logic uses `Mongoose` schemas to write the new document securely to the `MongoDB Atlas` cluster.
5. **UI Synchronization:** A success response (`201 Created`) returns as a JSON object, prompting React to instantly re-render the recipe feed.

---

## ⚙️ How to Run Locally

### 1. Clone the repository
```bash
git clone [https://github.com/4o4founder/Let-Him-Cook.git](https://github.com/4o4founder/Let-Him-Cook.git)
cd Let-Him-Cook
