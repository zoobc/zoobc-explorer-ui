import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Container, Card, CardHeader, CardBody, Button, Row, Col } from 'reactstrap'
import L from 'leaflet'
import { withTranslation } from 'react-i18next'

import Loader from '../../components/Loader'

const greenIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
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

const blackIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

class MapPeerPage extends Component {
  state = {
    lat: 47.03386459688471,
    lng: -22.89482116699219,
    zoom: 3.499,
    draggable: false,
  }

  handleZoom() {
    if (this.map && this.map.leafletElement) {
      const zoomLevel = this.map.leafletElement.getZoom()
      this.setState({ draggable: zoomLevel > this.state.zoom })
    }
  }

  render() {
    const { loading, error, message, data = null, onRefresh, t } = this.props
    const position = [this.state.lat, this.state.lng]

    return (
      <Container id="map" className="mb-4 mt-5" fluid>
        <Card>
          <CardHeader>
            <Row>
              <Col sm="6">
                <h4>{t('Map Peers')}</h4>
              </Col>
              <Col sm="6" className="text-right">
                <Button outline color="primary" size="sm" onClick={onRefresh}>
                  {t('Refresh')}
                </Button>
              </Col>
              <div />
            </Row>
          </CardHeader>
          <CardBody>
            <div className="text-right">
              <ul className="map-legend">
                <li>
                  <div className="green" /> {t('Connected')}
                </li>
                <li>
                  <div className="red" /> {t('Disconnected')}
                </li>
                <li>
                  <div className="black" /> {t('Blacklisted')}
                </li>
              </ul>
            </div>

            <div className="leaflet-container">
              <Map
                center={position}
                zoom={this.state.zoom}
                minZoom={3}
                maxZoom={10}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={this.state.draggable}
                animate={true}
                easeLinearity={0.35}
                onZoomEnd={this.handleZoom.bind(this)}
                ref={map => {
                  this.map = map
                }}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {loading ? (
                  <Loader />
                ) : error ? (
                  <label>{message}</label>
                ) : (
                  data &&
                  data.map((item, idx) => {
                    const icon =
                      item.State === 'CONNECTED'
                        ? greenIcon
                        : item.State === 'BLACKLISTED'
                        ? blackIcon
                        : redIcon

                    return item.lat && item.long ? (
                      <Marker
                        key={idx}
                        position={[item.lat.toString(), item.long.toString()]}
                        icon={icon}
                      >
                        <Popup>
                          <small>
                            Address [Port]:{' '}
                            <b>
                              {item.Address} [{item.Port}]
                            </b>
                          </small>
                          <br />
                          <small>
                            Latitude: <b>{item.lat}</b>
                          </small>
                          <br />
                          <small>
                            Longitude: <b>{item.long}</b>
                          </small>
                          <br />
                          <small>
                            Region: <b>{item.region}</b>
                          </small>
                          <br />
                          <small>
                            City: <b>{item.city}</b>
                          </small>
                          <br />
                          <small>
                            Version: <b>{item.Version}</b>
                          </small>
                          <br />
                          <small>
                            Status: <b>{item.State}</b>
                          </small>
                        </Popup>
                      </Marker>
                    ) : null
                  })
                )}
              </Map>
            </div>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default withTranslation()(MapPeerPage)
