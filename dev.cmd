@echo off
setlocal
cd /d "%~dp0"
docker compose -f docker-compose.dev.yml up --build --watch
exit /b %errorlevel%
