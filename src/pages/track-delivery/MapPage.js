import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { MAPS_API_KEY } from '../../config/KEYS'

export default function MapPage(props) {
    const { positionOrigem, positionDestino } = props.location.state;
    const [directions, setDirections] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: `${MAPS_API_KEY}`
    })

    useEffect(() => {
        if (typeof window !== "undefined" && window.google && window.google.maps) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: positionOrigem,
                    destination: positionDestino,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    }
                }
            );
        } else {
            console.log('Lida com o erro de biblioteca não carregada aqui')
        }
    }, [positionOrigem, positionDestino]);


    return (
        <div style={{ height: "100vh", width: "100%" }}>
            {isLoaded && positionOrigem && positionDestino && (
                <GoogleMap
                    mapContainerStyle={{ height: "100%", width: "100%" }}
                    zoom={8}
                    center={positionOrigem}
                >
                    {directions && (
                        <DirectionsRenderer directions={directions} />
                    )}
                </GoogleMap>
            )}
        </div>
    );
}
