import React from 'react'
import L from 'leaflet'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Spin } from 'antd'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { shortenHash } from '../utils/shorten'

const greenIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const yellowIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function MapNodes({ loading, data }) {
  const { t } = useTranslation()

  return (
    <Card className="home-node" bordered={false}>
      <div className="home-node-title">
        <i className="bcz-calendar" />
        <strong>{t('node registration')}</strong>
      </div>
      <Row>
        <Col span={24}>
          <div className="text-right">
            <ul className="map-legend">
              <li>
                <div className="green" > {t('registered')} </div>
              </li>
              <li>
                <div className="yellow" > {t('in queue')} </div>
              </li>
              <li>
                <div className="red" > {t('stray')} </div>
              </li>
            </ul>
          </div>

          <div className="leaflet-container">
            <Map
              zoom={1}
              minZoom={1}
              maxZoom={10}
              // animate={true}
              // dragging={true}
              // zoomControl={true}
              // easeLinearity={0.35}
              style={{ zIndex: 0 }}
              // doubleClickZoom={true}
              // scrollWheelZoom={true}
              // attributionControl={true}
              center={[0, 0]}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {loading ? (
                <Spin spinning={true} style={{ zIndex: 99 }} />
              ) : (
                data &&
                data.map((item, i) => {
                  const icon =
                    item.RegistrationStatus === 0
                      ? greenIcon
                      : item.RegistrationStatus === 1
                      ? yellowIcon
                      : redIcon

                  return item.Latitude && item.Longitude ? (
                    <Marker
                      key={i}
                      icon={icon}
                      position={[item.Latitude.toString(), item.Longitude.toString()]}
                    >
                      <Popup>
                        <small>
                          {item.NodeAddressInfo != null && (
                            <>
                              <Link to={`/nodes/${item.NodePublicKeyFormatted}`}>
                                <strong>{shortenHash(item.NodePublicKeyFormatted)}</strong>
                              </Link>
                              <br />
                            </>
                          )}
                          Country: {item.CountryName}&nbsp;&nbsp;
                          <img src={item.CountryFlagUrl && item.CountryFlagUrl.replace('http', 'https')} alt="flag" style={{ height: '12px' }} />
                          <br />
                          City: {item.City}
                          <br />
                          Latitude: {item.Latitude}
                          <br />
                          Longitude: {item.Longitude}
                        </small>
                      </Popup>
                    </Marker>
                  ) : null
                })
              )}
            </Map>
          </div>
        </Col>
      </Row>
    </Card>
  )
}
