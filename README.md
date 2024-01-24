Create a monitoring application for the status of websites.

Websites to be monitored should be loaded from a text file.

The application should send HTTP requests to each website address every 10 seconds.

We consider a website to be functioning if it returns a status in the 2xx range.

After each request, the status of the websites should be saved to db.

Information to be recorded for each website includes Timestamp, Website Name, its status - Running/Down, and the returned HTTP Code.

The program must not block the Event Loop.