import React from 'react'
import {MapContainer, TileLayer, Marker, Popup,SVGOverlay,text} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import '../../components/map/map.css'

//maps props center = {center} zoom = {zoom} ref={mapref}


function MapComp() {

    const [center, setCenter] = React.useState({lat : 13.545555555, lng : 80.2444444444444444})
    
    const [zoom,setZoom] = React.useState(12) 

    return (
        
        <div className ="mapcontainerchild">
         <MapContainer center = {center} zoom = {zoom}   zIndex={10} >
         <TileLayer url ="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=A1LaTRKfExV16ZrGMzMw" attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' />
         </MapContainer>
         </div>
        
    )
}
export default MapComp