# PDMS

PDMS proxy web server that acts as an interface for the MQTT broker. Rest Api doc will be published soon. As of now, do feel free to explore the code .
Written on Nodejs, Expressjs framework, MQQT broker needs to be installed on the server using source and MQQT.js client has been used.

# Requirements
1. node.js
2. Mosquitto MQTT Server 

# Deployment
1. Update config.js with the proper PORT and MQTT Server IP (if not localhost)
2. Install node dependencies ```$ npm install```
3. Make sure Mosquitto server is running
4. Run the node server app ```$ npm start```