@echo off
echo ===================================================
echo Starting CatalogCraft FastAPI Backend ^& Web Server
echo ===================================================
cd /d "%~dp0backend"
if not exist ".venv\Scripts\python.exe" (
    echo Creating Python virtual environment...
    python -m venv .venv
    call .venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call .venv\Scripts\activate.bat
)
echo.
echo ===================================================
echo  CatalogCraft is live!
echo  Open your browser at: http://localhost:8000
echo  API Documentation:    http://localhost:8000/docs
echo ===================================================
echo.
python run.py
pause
