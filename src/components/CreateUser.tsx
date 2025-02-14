import { AccountCircle, Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AppBar, Badge, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function CreateUser(){

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [specialization, setSpecialization] = useState<string>('');
    const [availabledays, setAvailabledays] = useState<string[]>([]);
    const [workinghours, setWorkinghours] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');

    const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    function handleName(e:any){
        setName(e.target.value);
    }

    function handleEmail(e:any){
        setEmail(e.target.value);
    }

    function handleRole(e:any){
        setRole(e.target.value);
        if (e.target.value != "SERVICE_PROVIDER") {
            setAvailabledays([]);
        }
    }

    function handleContact(e:any){
        setContact(e.target.value);
    }

    function handleLocation(e:any){
        setLocation(e.target.value);
    }

    function handleSpecialization(e:any){
        setSpecialization(e.target.value);
    }

    function handleAvailableDays(day:string){
        setAvailabledays(prev => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    }

    function handleStartTime(e:any){
        setStartTime(e.target.value);
    }

    function handleEndTime(e:any){
        setEndTime(e.target.value);
    }

    const handleSubmit = async () => {
        try{
            const data = {
                name:name,
                email:email,
                role:role,
                contact:contact,
                location:location,
                specialization:role === "SERVICE_PROVIDER" ? specialization: null,
                availableDays:role === "SERVICE_PROVIDER" ? availabledays: null,
                startTime:role === "SERVICE_PROVIDER" ? startTime: null,
                endTime:role === "SERVICE_PROVIDER" ? endTime: null,
            }
            console.log("Data:",data);
    
            const response = await axios.post("http://localhost:8080/user/create",data);
            console.log("Created user details:",response.data);
            alert("Successfully created");
        }catch (error){
            console.error("Error creating user:",error);
        }
    }

    return (
        <Box>
            <AppBar variant='outlined' sx={{backgroundColor: "rgba(53, 55, 75, 0.5)", boxShadow: 2}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Online Booking
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Box sx={{minWidth:"300px", display:"flex", justifyContent:"space-between", mr:10 }}>
                            <Button 
                                sx={{color:"#E0E0E0", '&:hover': {fontWeight:"bold"}}}
                                onClick={() => document.getElementById("home")?.scrollIntoView({behavior:"smooth"})}
                            >
                                Home
                            </Button>
                            <Button 
                                sx={{color:"#E0E0E0", '&:hover': {fontWeight:"bold"}}}
                                onClick={() => document.getElementById("about-us")?.scrollIntoView({behavior:"smooth"})}
                            >
                                About
                            </Button>
                            <Button 
                                sx={{color:'#E0E0E0', '&:hover': {fontWeight:"bold"}}}
                                onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}
                            >
                                Services
                            </Button>
                        </Box>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",mt:12}}>
            <Box sx={{maxWidth:"600px", border:0.5, borderColor:"black", width:"100%", py:2, px:4, borderRadius:3, backgroundColor:"#1E1E1E", boxShadow:3}}>
                <Typography variant="h5" sx={{textAlign:"left", mb:2, color:"#00D084"}}>Create an user.</Typography>
                {/* User inputs */}
                <Box sx={{mt:4}}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={handleName}
                        sx={{mb:2, input: {color:"#E0E0E0"}, label: {color:"#999"}}}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={handleEmail}
                        sx={{mb:2, input: {color:"#E0E0E0"}, label: {color:"#999"}}}
                    />
                    <FormControl fullWidth sx={{mb:2}}>
                        <InputLabel sx={{color:"#999"}}>User Role</InputLabel>
                        <Select name='role' value={role} onChange={handleRole} sx={{textAlign:"left", color:"#E0E0E0"}}>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="SERVICE_PROVIDER">SERVICE_PROVIDER</MenuItem>
                            <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField
                        fullWidth
                        label="Contact"
                        value={contact}
                        onChange={handleContact}
                        sx={{mb:2, input: {color:"#E0E0E0"}, label: {color:"#999"}}}
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        value={location}
                        onChange={handleLocation}
                        sx={{mb:2, input: {color:"#E0E0E0"}, label: {color:"#999"}}}
                    />
                    {/* Show only if role is SERVICE PROVIDER */}
                    {role === "SERVICE_PROVIDER" && (
                        <>
                            <TextField
                                fullWidth
                                label="Specialization"
                                value={specialization}
                                onChange={handleSpecialization}
                                sx={{mb:2, input: {color:"#E0E0E0"}, label: {color:"#999"}}}
                            />
                            {/* Available days */}
                            <Typography sx={{mb:1, textAlign:"left", color:"#00D084"}}>Available Days</Typography>
                            <FormGroup sx={{display:"flex", flexDirection:"row", mb:2}}>
                                {daysOfWeek.map(day => (
                                    <FormControlLabel
                                        key={day}
                                        control={
                                            <Checkbox 
                                                checked={availabledays.includes(day)}
                                                onChange={() => handleAvailableDays(day)}
                                            />
                                        }
                                        label={day}
                                        sx={{color:"#E0E0E0"}}
                                    />
                                ))}
                            </FormGroup>
                            <Box sx={{display:"flex", justifyContent:"space-between", gap:4}}>
                                <Box sx={{width:"100%"}}>
                                    <Typography sx={{textAlign:"left", color:"#00D084"}}>Start Time</Typography>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        value={startTime}
                                        onChange={handleStartTime}
                                        sx={{mb:2, input: {color:"#E0E0E0"}, label: {color:"#999"}}}
                                    />    
                                </Box>
                                <Box sx={{width:"100%"}}>
                                    <Typography sx={{textAlign:"left", color:"#00D084"}}>End Time</Typography>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        value={endTime}
                                        onChange={handleEndTime}
                                        sx={{mb:2, input: {color:"#E0E0E0"}, label: {color:"#999"}}}
                                    />
                                </Box>
                            </Box>
                        </>    
                    )}
                    
                    <Box sx={{display:"flex", gap:2, mt:2}}>
                        <Button variant="outlined" sx={{color:"white"}}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Create
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        </Box>
        
    )
}