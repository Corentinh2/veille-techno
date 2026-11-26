@echo off
chcp 65001 >nul
title Veille Techno
rem Lanceur du site de veille. Peut etre copie n'importe ou (ex. sur le Bureau) :
rem il utilise toujours le chemin complet du projet ci-dessous.
set "PROJET=C:\Users\coren\Documents\penta\veillle_techno"
set "EN_LIGNE=https://corentinh2.github.io/veille-techno/"
set "LOCAL=http://localhost:4321/veille-techno/"

echo.
echo   ==============================
echo     Veille Techno
echo   ==============================
echo.
echo   1. Ouvrir le site en ligne (GitHub Pages)
echo   2. Lancer le site en local (apercu des modifications)
echo.
choice /c 12 /n /t 10 /d 1 /m "  Ton choix [1 ou 2] (1 par defaut dans 10 s) : "
if errorlevel 2 goto local

start "" "%EN_LIGNE%"
exit /b 0

:local
if not exist "%PROJET%\package.json" (
  echo.
  echo   Dossier du projet introuvable : %PROJET%
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js n'est pas installe ou introuvable. Installe-le avec :
  echo   winget install OpenJS.NodeJS.LTS
  pause
  exit /b 1
)
cd /d "%PROJET%"
if not exist "node_modules" (
  echo.
  echo   Premiere utilisation : installation des dependances...
  call npm install
)
echo.
echo   Demarrage du serveur local. Le navigateur va s'ouvrir sur :
echo   %LOCAL%
echo.
echo   Pour arreter le site : ferme cette fenetre (ou Ctrl+C).
echo.
start "" /b cmd /c "timeout /t 4 /nobreak >nul & start "" "%LOCAL%""
call npm run dev
pause
