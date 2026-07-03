DAILY COLLECTION WEBSITE - GOOGLE SHEETS SETUP

Your Google Sheet ID is already added in google_apps_script_code.gs:
1yv0EUSpwPzA_-5nb_zPBsMYIwOUZlvP_ZIolXeLljvg

STEP 1 - Open your Google Sheet
Open your sheet link in the same Google account you want to use for the backend.

STEP 2 - Create Apps Script
1. In Google Sheets, click Extensions > Apps Script.
2. Delete any default code.
3. Copy all code from google_apps_script_code.gs.
4. Paste it into Apps Script.
5. Click Save.

STEP 3 - Deploy as Web App
1. Click Deploy > New deployment.
2. Select type: Web app.
3. Description: Daily Collection Backend.
4. Execute as: Me.
5. Who has access: Anyone.
6. Click Deploy.
7. Authorize permissions.
8. Copy the Web App URL.

STEP 4 - Link website to Google Sheets
1. Open config.js.
2. Replace PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE with the Web App URL.
3. Save config.js.

STEP 5 - Upload to GitHub Pages
Upload these files to your GitHub repository:
- index.html
- config.js

STEP 6 - Test
1. Open your GitHub Pages website.
2. Fill the form.
3. Click Submit to Google Sheets.
4. Check your Google Sheet.

Sheets created automatically:
- DailyCollection
- Denominations
- CardPayments

DATE FIX INCLUDED
The date is now mandatory by default and stored as YYYY-MM-DD.
The local dashboard also shows Collection Date separately from Submitted Time.
