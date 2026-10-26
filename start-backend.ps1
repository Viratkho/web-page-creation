Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " Starting CatalogCraft FastAPI Backend & Web Server" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Set-Location "$PSScriptRoot\backend"
if (-not (Test-Path ".\.venv\Scripts\python.exe")) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
    python -m venv .venv
    & ".\.venv\Scripts\pip.exe" install -r requirements.txt
}

Write-Host ""
Write-Host "===================================================" -ForegroundColor Green
Write-Host " CatalogCraft is live!" -ForegroundColor Green
Write-Host " Open your browser at: http://localhost:8000" -ForegroundColor Green
Write-Host " API Documentation:    http://localhost:8000/docs" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
Write-Host ""

& ".\.venv\Scripts\python.exe" run.py
