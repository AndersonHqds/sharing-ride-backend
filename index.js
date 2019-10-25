const express = require('express');
const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');
const calculateDistance = require('./functions');

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);

const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('Client connected on websocket');
  socket.on('driver-status', (response) => {
    if (response.isAvailable) {
      const drivers = JSON.parse(fs.readFileSync('drivers.json'));
      drivers[response.id] = response;
      fs.writeFileSync('drivers.json', JSON.stringify(drivers, null, 4));
      console.log(drivers[response.id]);
      console.log(drivers[response.id].stops);
    }
  });

  socket.on('search-drivers', (response, fn) => {
    const drivers = JSON.parse(fs.readFileSync('drivers.json'));
    let matchedDrivers = Object.keys(drivers)
      .filter((key) => Math.round(calculateDistance(drivers[key].from, response.from) <= 650));

    const check = Object.keys(drivers).filter((key) => {
      const results = drivers[key].stops.filter((location) => {
        const latitude = location[0];
        const longitude = location[1];
        if (Math.round(calculateDistance({ latitude, longitude }, response.from)) < 650) {
          return true;
        }
        return false;
      });

      if (results.length > 0) {
        return true;
      }

      return false;
    });
    matchedDrivers = [...new Set(matchedDrivers.concat(check))];
    matchedDrivers = Object.values(drivers).filter((driver) => matchedDrivers.includes(driver.id));
    fn(matchedDrivers);
  });
});

server.listen(PORT, () => {
  console.log(`Server is litening on port ${ PORT }`);
});
