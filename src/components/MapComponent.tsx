import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import axios from 'axios';
import * as kml from '@tmcw/togeojson'; // Biblioteca para converter KML para GeoJSON
import { DOMParser } from 'xmldom'; // Biblioteca para ler o XML do KML
import 'leaflet/dist/leaflet.css';

interface PointOfInterest {
    name: string;
    position: [number, number];
}

const MapComponent: React.FC = () => {
    const [route, setRoute] = useState<any[]>([]);
    const [pois, setPois] = useState<PointOfInterest[]>([]);
    const kmlUrl = '/cg_chile.kml';

    useEffect(() => {
        const fetchKML = async () => {
            try {
                const response = await axios.get(kmlUrl, { responseType: 'text' });
                const xml = new DOMParser().parseFromString(response.data, 'text/xml');
                const geojson = kml.kml(xml);
                console.log('GeoJSON:', geojson);
                setRoute(geojson.features);
                console.log('GeoJSON Features:', geojson.features);
            } catch (error) {
                console.error('Erro ao ler o KML:', error);
            }
        };

        fetchKML();
    }, []);

    useEffect(() => {
        const filteredPoints: PointOfInterest[] = [];

        route.forEach((feature) => {
            // Supondo que a propriedade "name" contém o nome do ponto
            const name = feature.properties?.name; // Ajuste conforme sua estrutura

            if (name && (name.includes('Restaurante') || name.includes('Hotel') || name.includes('Posto de Gasolina') || name.includes('Hospital'))) {
                // Supondo que as coordenadas estão em feature.geometry.coordinates
                const position: [number, number] = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
                filteredPoints.push({ name, position });
            }
        });

        setPois(filteredPoints);
    }, [route]);

    return (
        <MapContainer center={[-23.550520, -46.633308]} zoom={12} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {route.map((feature, index) => (
                <Polyline
                    key={index}
                    positions={feature.geometry.coordinates.map(coord => [coord[1], coord[0]])}
                    pathOptions={{ color: 'blue' }}
                />
            ))}
        </MapContainer>
    );
};

export default MapComponent;
