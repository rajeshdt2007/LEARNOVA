# LEARNOVA - Faculty-Student Learning Analytics Platform

LEARNOVA is an institutional learning analytics platform designed for higher education institutions to bridge faculty insights with student academic achievement.

## Architecture & Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Python 3.11+ / FastAPI, Pydantic Settings, Uvicorn
- **Database & Auth**: Supabase PostgreSQL & Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Render Blueprint (`render.yaml`) & GitHub

---

## Project Structure

```text
LEARNOVA/
├── .gitignore
├── README.md
├── render.yaml                      # Render Blueprint deployment definition
├── backend/                         # FastAPI Python service
│   ├── .env.example
│   ├── .env
│   ├── requirements.txt
│   └── app/
│       ├── main.py                  # App entry point, CORS & middleware
│       ├── core/
│       │   ├── config.py            # Typed settings via Pydantic
│       │   └── supabase.py          # Backend Supabase client integration
│       ├── api/v1/
│       │   ├── api.py               # Aggregated API router
│       │   └── endpoints/
│       │       └── health.py        # System health & telemetry endpoint
│       └── schemas/
│           └── health.py            # Health request/response schemas
└── frontend/                        # React + Vite + TypeScript application
    ├── .env.example
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    └── src/
        ├── App.tsx                  # Routing configuration
        ├── components/
        │   ├── common/              # Reusable Button, Input, Card, Badge
        │   └── layout/              # Navbar, Footer
        ├── lib/
        │   ├── api.ts               # Axios client connected to backend
        │   └── supabase.ts          # Supabase client wrapper
        └── pages/
            ├── LandingPage.tsx      # Platform overview & live backend monitor
            ├── LoginPage.tsx        # Institutional role-based authentication
            ├── RegisterPage.tsx     # Institutional registration
            └── NotFoundPage.tsx     # 404 handler
```

---

## Local Development Setup

### Prerequisites
- Node.js 20+ (with npm)
- Python 3.10+

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows (PowerShell/CMD):
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Run FastAPI development server
uvicorn app.main:app --reload --port 8000
```
Backend will be live at `http://localhost:8000`.  
Interactive Swagger API docs at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run Vite dev server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

## Deployment to Render

1. Push your repository to GitHub.
2. In Render Dashboard, click **New > Blueprint**.
3. Select your GitHub repository.
4. Render will parse `render.yaml` and provision both:
   - `learnova-api` (Python Web Service)
   - `learnova-web` (Static Site with SPA routing)
5. Fill in your institutional Supabase keys in Render's environment variable settings.
