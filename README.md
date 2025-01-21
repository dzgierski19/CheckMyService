# CheckMyService

The application is designed to monitor the status of various websites. Website details are stored in a SQLite database. Every 10 seconds, the application sends HTTP requests to these websites and analyzes the responses to verify their functionality (status codes 2xx). After each check, the website statuses are logged into a CSV file.

Features
Add Websites: Easily add websites to monitor by entering their URLs into the SQLite database.
Automated Status Monitoring: The application automatically sends HTTP requests to the stored website URLs every 10 seconds to check their status and ensure they're operational (returning status codes 2xx).
CSV Status Logging: Each check logs website data into a CSV file, including the timestamp, website name, status (Running/Down), and HTTP response code.
CSV Download: Users can download a CSV file with the status history of a selected website.

🚀 Technologies
Node.js
Express.js
TypeScript
Zod
Prisma
Cron
PostgreSQL

