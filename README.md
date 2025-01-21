# CheckMyService

This application is designed to monitor the status of various websites. It stores website details in a SQLite database and checks their functionality every 10 seconds by sending HTTP requests. The results are saved into a CSV file for tracking and analysis.

## Features

### 1. Add Websites
Easily add websites to monitor by inserting their URLs into the SQLite database.

### 2. Automated Status Monitoring
Every 10 seconds, the application sends HTTP requests to the stored website URLs. It checks their responses to determine if the websites are operational (returning HTTP status codes 2xx).

### 3. CSV Status Logging
The application logs the status of each website into a CSV file after every check. The log includes:
- Timestamp
- Website name
- Status (`Running` or `Down`)
- HTTP response code

### 4. CSV Download
Users can download a CSV file containing the status history of a selected website for offline analysis.

## 🚀 Technologies

- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **Zod**  
- **Prisma**  
- **Cron**  
- **PostgreSQL**

