import React from "react";
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from "react-leaflet";
import styled from "styled-components";

const DivMap = styled.div`
  width: auto;
  height: 250px !important;
  margin: 16px !important;
`;

const SpyingMap = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  // UseEffect + fetching the user's data
  React.useEffect(() => {
    fetch("https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
      });
  }, []);

  // console.log(23, "userInfo:", userInfo);
  if (userInfo === null) {
    return <p>Loading...</p>;
  }

  const defaultPosition = [userInfo.latitude, userInfo.longitude];
  // console.log(29, "defaultPosition:", defaultPosition);

  return (
    <DivMap>
      <MapContainer
        style={{width: "auto", height: "100%"}}
        center={defaultPosition}
        zoom={12}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        />
        <Marker position={defaultPosition}>
          <Popup>You are here...</Popup>
          <Tooltip>You are here...</Tooltip>
        </Marker>
      </MapContainer>
    </DivMap>
  );
};

export default SpyingMap;