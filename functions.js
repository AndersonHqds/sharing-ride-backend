const convertDegreesToRadian = (degress) => ((degress * Math.PI) / 180);

const calculateDistance = (distance, distance2) => {
  const earthRadiusKm = 6371e3;

  const latitudeDistance = convertDegreesToRadian(distance2.latitude - distance.latitude);
  const longitudeDistance = convertDegreesToRadian(distance2.longitude - distance.longitude);

  const a = Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2)
            + Math.sin(longitudeDistance / 2) * Math.sin(longitudeDistance / 2)
            * Math.cos(convertDegreesToRadian(distance.latitude))
            * Math.cos(convertDegreesToRadian(distance2.latitude));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

module.exports = calculateDistance;
