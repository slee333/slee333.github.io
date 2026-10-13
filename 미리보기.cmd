@echo off
cd /d "%~dp0docs"
python -B blog.py preview
if errorlevel 1 pause
