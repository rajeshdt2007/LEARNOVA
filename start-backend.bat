@echo off
echo ========================================================
echo  Starting LEARNOVA FastAPI Backend (Port 8000)
echo ========================================================
cd backend
C:\Users\Rajesh\AppData\Local\Python\bin\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
