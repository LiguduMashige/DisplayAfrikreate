@echo off
echo ========================================
echo Starting AfriKreate Backend (Simple Mode)
echo ========================================
echo.

REM Copy simple env file if .env doesn't exist
if not exist ".env" (
    echo Creating .env file...
    copy SIMPLE_START.env .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

echo.
echo Starting backend server...
echo.

node src/simple-server.js
