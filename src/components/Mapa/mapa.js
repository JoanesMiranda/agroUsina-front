import React from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { formatRelative } from "date-fns";
import { Button, Form } from 'react-bootstrap';

import "@reach/combobox/styles.css";

import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
    height: "500px",
    width: "900px",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: -7.2369038,
    lng: -35.9267084,
};

export default function App(props) {

    console.log("latitude: ", props.latitude)
    console.log("longitude: ", props.longitude)

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.API_KEY_MAPS,
        libraries,
    });

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>

            <Locate panTo={panTo} />
            <Search panTo={panTo} />

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                        icon={{
                            url: `/fazenda.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                                <span role="img" aria-label="harverts">

                                </span>{" "}
                Alert
              </h2>
                            <p>Spotted {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
}

function Locate({ panTo }) {
    return (
        <>
            <br />
            <Button variant="success"
                className="locate"
                onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            panTo({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            });
                        },
                        () => null
                    );
                }}
            >
                Pesquisar
        </Button>
        </>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });


    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (

        <div className="search">
            <Combobox onSelect={handleSelect}>
                <Form.Control
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Localizar endereço"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );

}