import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../dropdown/dropdown.css'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {getUni} from '../../services/dataservices'
import MapComp from '../map/map';


const placesSearch = [
  {id : 1,name : 'India'},
  {id : 2,name : 'Turkey'},
  {id : 3, name : 'Italy'}
]

// google places API key AIzaSyD1pWfwP3Og2MsWG9fdmSloHw5XEl_bia0

function DropDown() {
    const [age, setAge] = React.useState('');
    const [open,setOpen]= React.useState(false)
    const [unis,setUnis] = React.useState([])
    const [checked, setChecked] = React.useState([]);
    const [currentLocation,setCurrentLocation] = React.useState("")
    const[searchKeyWord,setSearchKeyWord] = React.useState({id :0,name : ""})
    const handleChange =(e) => {
       setOpen(true)
    }
    
    // const takeInput =(e) => {
    //     setSearchKeyWord(e.target.value)
    //   if(e.target.value !== "") {
    //   getUni(e.target.value).then((resp) => {
       
      
    //   console.log(resp.data)
    //     setUnis(resp.data.slice(0,100))
      
      
    //   }).catch((error) => {console.log(error)})
    // }
    // }

    const getData =(search) => {
      console.log(search)
      if(search !== "") {
          getUni(search).then((resp) => {
           
          
          console.log(resp.data)
            setUnis(resp.data.slice(0,100))
          
          
          }).catch((error) => {console.log(error)})
        }
    }

    
    const handleClickAway = (e) => {
        
        setOpen(false)
        setUnis([])
        setChecked([])
    }



    const handleToggle =  (place) => {
      const currentIndex = checked.findIndex(p =>p.name === place.name);
      console.log(currentIndex)
      const newChecked = [...checked];
      let filteredUni =[]
  
      if (currentIndex === -1) {
        newChecked.push(place);
        filteredUni = unis.filter(x=> x.name !== place.name)
        setUnis(filteredUni)
      } else {
        newChecked.splice(currentIndex, 1);
        console.log(place)
        if(place["source"]) {
          console.log("caught")
        } else {
          filteredUni = [...unis]
          console.log(place)
          filteredUni.unshift(place)
          setUnis(filteredUni)
        }
       
    
      }
  
      setChecked(newChecked);
      
    };

    const listenToMapLocation =(data) => {
        setCurrentLocation(data)
    }

    const addLocationToList= (data) => {
      console.log(data)
        let address = data.split(",")
        let actulAddress = address.slice(0,3)
        let obj = {name : actulAddress.join(", "), source:"map"}

        let arr = [...checked]
        arr.push(obj)
        setChecked(arr)
    }

    React.useEffect(() => {
        
        console.log(searchKeyWord)
        
        getData(searchKeyWord.name)
       
        if(searchKeyWord === "") {
          setUnis([])
        }
    },[checked,searchKeyWord.name])


   
    return(
      <>
      
     
      <Box sx ={{marginTop : '100px', marginLeft : '100px'}} >
      <FormControl size ="small" sx={{width : '150px', height : "500px"}} >
      
        {/* <InputLabel id="demo-simple-select-label" >Choose</InputLabel> */}
       
        <TextField
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          autoComplete='hello'
          value={age}
          select
          size="small"
       open ={open}
          
          onClick={handleChange}
          InputLabelProps={{shrink : false}}
          label="Choose"
          SelectProps={{
            MenuProps: {
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right"
              },
              getContentAnchorEl: null
            }
          }}
         
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
           <ClickAwayListener onClickAway={handleClickAway}>
          <div id="dropdowncontainer">
            <div className='manuallocation'>
              <div className="dropdownSearchBox">
              <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={placesSearch}
      // getOptionLabel={option => option.name}
      getOptionLabel={option=>option.name}
      renderInput={(params) => <TextField {...params} id="outlined-basic" sx={{width : '100%'}} placeholder='enter input' variant="outlined" 
      size ="small" InputLabelProps={{shrink : false}} />}

      value={searchKeyWord}
  onChange={(_event, place) => {
    if(place !== null) {
      setSearchKeyWord(place)
    } else {
      setSearchKeyWord({id:0,name:""})
    }
   
  }}


    />
              {/* <TextField id="outlined-basic" sx={{width : '100%'}} placeholder='enter input' variant="outlined" onChange={takeInput}
              size ="small" InputLabelProps={{shrink : false}} /> */}
              </div>
              <div className ="locationMenu">
              {checked.length !== 0 || unis.length !==0 ?
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {checked.map((place,index) => (
                     <ListItemButton key={index} dense sx={{marginBottom : "10px"}}onClick={()=>handleToggle(place)} >
                     <ListItemIcon>
                       <Checkbox
                         edge="start"
                         checked={checked.findIndex(p => p.name === place.name) !== -1}
                         tabIndex={-1}
                         disableRipple
                         
                       />
                     </ListItemIcon>
                     {
                       checked.length !== 0 ? 
                       <ListItemText  primary={`${place.name}`} />   :
                       <></>
}
                   </ListItemButton>
       

                ))}
             
                {unis.map((place,index) => (
                     <ListItemButton dense key={index} sx={{marginBottom : "10px"}}onClick={()=>handleToggle(place)} >
                     <ListItemIcon>
                       <Checkbox
                         edge="start"
                         checked={checked.findIndex(p => p.name === place.name) !== -1}
                         tabIndex={-1}
                         disableRipple
                         
                       />
                     </ListItemIcon>
                     {
                       unis.length !== 0 ? 
                       <ListItemText  primary={`${place.name}`} />   :
                       <></>
}
                   </ListItemButton>
       

                ))}
             
        
                  </List> : <></>}
              </div>
              </div>
              
              <div className="mapcontainer">
                <div className ="maplocation">
                    <div>
                      Select map
                    </div>
                    <div>
                      {currentLocation}
                    </div>
                         </div>
                  <MapComp addLocationToList={addLocationToList}   listenToMapLocation = {listenToMapLocation}/>
              </div>
        
          </div>
          </ClickAwayListener>
        </TextField>
        
      </FormControl>
    </Box>
  
    
   </>
    )
}

export default DropDown