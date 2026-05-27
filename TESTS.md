# Local Setup & Testing Guide

This document provides a simple onboarding guide to help reviewers and developers set up the **AI Spend Audit** project locally for quick testing and evaluation.

## 1. Clone the Repository

```bash
git clone https://github.com/Shivam89822/Ai-spend-audit.git
cd ai-spend-audit
```

## 2. Environment Variables

Before running the backend, you need to configure your environment variables. 

1. Navigate to the `server/` directory.
2. Create a new file named `.env`.
3. Copy the contents from `server/.env.example` into `.env` and fill in your keys:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-spend-audit  # Or use your MongoDB Atlas URI
GEMINI_API_KEY=your_gemini_api_key_here             # Get this from Google AI Studio
GEMINI_MODEL=gemini-2.0-flash
```

## 3. Backend Setup

Open a new terminal window and run the following commands to start the Express backend server:

```bash
cd server
npm install
npm run dev
```
*The backend should now be running on `http://localhost:5000`.*

## 4. Frontend Setup

Open another terminal window (keep the backend running) and start the Vite frontend development server:

```bash
cd client
npm install
npm run dev
```
*The frontend should now be running on `http://localhost:5173` (or the port specified by Vite).*

## 5. Running Locally & Testing

1. Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2. You should see the **AI Spend Audit** onboarding dashboard.
3. To test the core functionality:
   - Select a primary use case (e.g., *Engineering*).
   - Adjust the account infrastructure scale (number of seats).
   - Add or modify tools in the Model Vector Stack Matrix at the bottom.
   - Click the **"Generate AI Spend Audit"** execution button.
4. **Expected Result:** The frontend will hit the local backend (`/api/audit`). The backend will run the pricing engine logic, securely fetch an executive summary from the Gemini API, store the record in MongoDB, and redirect you to a unique shareable URL containing the formatted results.

---

*Note: For deeper details on the underlying system, refer to `ARCHITECTURE.md`.*
