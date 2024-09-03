To free up a port in Windows
Open Command Prompt:
Find the Port Usage:

Use the netstat command to find the process using the port. Replace PORT_NUMBER with the port you want to check (e.g., 5000):
netstat -aon | findstr :PORT_NUMBER

Example for port 5000:

netstat -aon | findstr :5000


Run ngrok For Device Testing

ngrok http 5000
