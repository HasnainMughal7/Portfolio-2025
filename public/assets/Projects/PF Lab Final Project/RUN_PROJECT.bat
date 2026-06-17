@echo off
title All in one Calculator Project
color 0A
echo ========================================================
echo      LOADING PROJECT ENVIRONMENTS...
echo ========================================================
echo.

:: Check if Windows Curl is available (Dependency Check)
where curl >nul 2>nul
if %errorlevel%==1 (
    color 0C
    echo [ERROR] CURL tool not found on this Windows!
    echo Please ensure you are using Windows 10 or 11.
    echo AI features might not work.
    pause
) else (
    echo [OK] Networking Tools Detected.
)

:: Check if Executable exists
if exist "Bin\project.exe" (
    echo [OK] Launching Application...
    echo.
    cd Bin
    project.exe
    cd ..
) else (
    color 0C
    echo [ERROR] project.exe not found in 'Bin' folder!
    echo Please compile main.c first.
    pause
)

echo.
echo ========================================================
echo      Thank you for using the system.
echo ========================================================
pause