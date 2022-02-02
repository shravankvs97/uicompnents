import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
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

// google places API key AIzaSyD1pWfwP3Og2MsWG9fdmSloHw5XEl_bia0

function DropDown() {
    const [age, setAge] = React.useState('');
    const [open,setOpen]= React.useState(false)
    const [unis,setUnis] = React.useState([])
    const [checked, setChecked] = React.useState([]);
    const[searchKeyWord,setSearchKeyWord] = React.useState("")
    const handleChange =(e) => {
       setOpen(true)
    }
    
    const takeInput =(e) => {
        setSearchKeyWord(e.target.value)
      if(e.target.value !== "") {
      getUni(e.target.value).then((resp) => {
        
        setUnis(resp.data)
      
      
      }).catch((error) => {console.log(error)})
    }
    }
    
    const handleClickAway = (e) => {
        console.log("kllk")
        console.log(e.target.id)
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
        console.log(filteredUni)
      } else {
        newChecked.splice(currentIndex, 1);
        filteredUni = [...unis]
        filteredUni.push(place)
      }
  
      setChecked(newChecked);
      setUnis(filteredUni)
    };

    React.useEffect(() => {
        console.log(checked)
        if(searchKeyWord === "") {
          setUnis([])
        }
    },[checked])


   
    return(
      <>
      
     
      <Box sx ={{marginTop : '100px', marginLeft : '100px'}} >
      <FormControl size ="small" sx={{width : '150px', height : "500px"}} >
      
        {/* <InputLabel id="demo-simple-select-label" >Choose</InputLabel> */}
        
        <TextField
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
              <div className="dropdownSearchBox">
              <TextField id="outlined-basic" sx={{width : '100%'}} placeholder='enter input' variant="outlined" onChange={takeInput}
              size ="small" InputLabelProps={{shrink : false}} />
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
              <div>Or select from map</div>
              <div className="mapcontainer">
                  <MapComp />
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