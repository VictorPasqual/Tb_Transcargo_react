import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { REACT_APP_GOOGLE_API_KEY } from "../../config/KEYS";
import "./MapPage.css";

const MapPage = (props) => {
  const {
    positionOrigemLat,
    positionOrigemLng,
    positionDestinoLat,
    positionDestinoLng,
  } = props.location.state;
  const [map, setMap] = useState(null);
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [response, setResponse] = useState(null);
  const directionsRenderer = useRef(null);
  const [position, setPosition] = useState(null);

  const traceRoute = useCallback(() => {
    if (pointA && pointB) {
      setOrigin({ lat: pointA.lat, lng: pointA.lng });
      setDestination({ lat: pointB.lat, lng: pointB.lng });
    }
  }, [pointA, pointB]);

  useEffect(() => {
    const position = {
      lat: Number(positionOrigemLat),
      lng: Number(positionOrigemLng),
    };

    setPointA(position);
    setPointB({
      lat: Number(positionDestinoLat),
      lng: Number(positionDestinoLng),
    });

    setPosition(position);
  }, [positionOrigemLat, positionOrigemLng, positionDestinoLat, positionDestinoLng]);

  useEffect(() => {
    traceRoute();
  }, [traceRoute, pointA, pointB]);

  useEffect(() => {
    if (response !== null && directionsRenderer.current !== null) {
      directionsRenderer.current.setDirections(response);
    }
  }, [response, directionsRenderer]);

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
    } else {
      console.log(res);
    }
  }, []);

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
        preventGoogleFontsLoading={true}
      >

        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          zoom={15}
          center={position}
        >
          {/* Renderização dos marcadores */}
          {pointA && <Marker position={pointA} />}
          {pointB && <Marker position={pointB} />}



          {/* Renderização das direções */}
          {origin !== null && destination !== null && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: "DRIVING",
              }}
              callback={directionsCallback}
              onLoad={(directionsService) =>
                (directionsService.current = directionsService)
              }
            />
          )}
          {response !== null && (
            <DirectionsRenderer
              directions={response}
              onLoad={(directionsRenderer) =>
                (directionsRenderer.current = directionsRenderer)
              }
            />

          )}

        </GoogleMap>
      </LoadScript>

    </div>

  );
};

export default MapPage;