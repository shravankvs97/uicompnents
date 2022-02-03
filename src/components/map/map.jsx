import React from 'react'
import {MapContainer, TileLayer, Marker, Popup,useMapEvents} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import '../../components/map/map.css'
import Button from '@mui/material/Button';
import {reverseGeoCoding} from '../../services/dataservices'
import L from 'leaflet'

//maps props center = {center} zoom = {zoom} ref={mapref}

const markerIcon = new L.Icon({
    iconUrl : require("../../assests/pinloc.png"),
    iconSize :[35,45],
    popupAnchor :[3,-26]

})

function MapComp(props) {

    const [center, setCenter] = React.useState({lat : 17.413828, lng : 78.439758})
    const [selectedLocationAdress, setSelectedLocationAddress]= React.useState("")
    
    const [zoom,setZoom] = React.useState(12) 

    const addLocation =() => {
       console.log(center)
       console.log(selectedLocationAdress)
       props.addLocationToList(selectedLocationAdress)
    }

    // const map = useMapEvents({
    //     click: (e) => {
    //       const { lat, lng } = e.latlng;
    //       console.log(lat,lng)
    //     //   L.marker([lat, lng], { icon }).addTo(map);
    //     }
    //   });
    

    React.useEffect(() => {
        console.log("kk")
        reverseGeoCoding(center).then(resp => {
            console.log("ll")
            let name = resp.data.display_name.split(",")
            setSelectedLocationAddress(resp.data.display_name)
            console.log(name[0])
            props.listenToMapLocation(name[0])
        }).catch(err => console.log(err))
    },[center.lat,center.lng])


    return (
        
        <div className ="mapcontainerchild">
            <div className="hs"> <Button onClick={addLocation} size ="small" variant="contained">Add Location</Button></div>
         <MapContainer center = {center} zoom = {zoom}
         
         whenReady={(map) => {
            console.log("1kk")
            map.target.on("click", function (e) {
                console.log("kkoilirotis")
              const { lat, lng } = e.latlng;
              console.log(lat,lng)
              console.log("ppp")
              setCenter({...center,lat:lat,lng :lng})
            //   L.marker([lat, lng], { icon }).addTo(map.target);
            });
          }}
         
         
         
         zIndex={10} >
         <TileLayer url ="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=A1LaTRKfExV16ZrGMzMw" attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' />
         <Marker position = {[center.lat,center.lng]} icon ={markerIcon} ></Marker>
         </MapContainer>
         </div>
        
    )
}
export default MapComp