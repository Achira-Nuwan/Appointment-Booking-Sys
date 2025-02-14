import { AccountCircle, Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
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
        if (e.target.value !== "SERVICE_PROVIDER") {
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
                name,
                email,
                role,
                contact,
                location,
                specialization: role === "SERVICE_PROVIDER" ? specialization : null,
                availableDays: role === "SERVICE_PROVIDER" ? availabledays : null,
                startTime: role === "SERVICE_PROVIDER" ? startTime : null,
                endTime: role === "SERVICE_PROVIDER" ? endTime : null,
            };
            console.log("Data:", data);
    
            const response = await axios.post("http://localhost:8080/user/create", data);
            console.log("Created user details:", response.data);
            alert("Successfully created");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: "#121212", color: "#E0E0E0", minHeight: "100vh", pb: 5 }}>
            {/* App Bar */}
            <AppBar sx={{ backgroundColor: "#1E1E1E", boxShadow: 2 }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dark Theme App
                    </Typography>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={17} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Form Box */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 12, opacity:"50%" }}>
                <Box sx={{ maxWidth: "600px", width: "100%", py: 3, px: 4, borderRadius: 2, backgroundColor: "#1E1E1E" }}>
                    <Typography variant="h5" sx={{ textAlign: "left", mb: 2, color: "#00D084" }}>Create a User</Typography>
                    
                    <TextField fullWidth label="Name" value={name} onChange={handleName} sx={{ mb: 2, input: { color: "#E0E0E0" }, label: { color: "#999" }, boxShadow:3 }} />
                    <TextField fullWidth label="Email" value={email} onChange={handleEmail} sx={{ mb: 2, input: { color: "#E0E0E0" }, label: { color: "#999" } }} />
                    
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel sx={{ color: "#999" }}>User Role</InputLabel>
                        <Select value={role} onChange={handleRole} sx={{ color: "#E0E0E0" }}>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="SERVICE_PROVIDER">SERVICE_PROVIDER</MenuItem>
                            <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField fullWidth label="Contact" value={contact} onChange={handleContact} sx={{ mb: 2, input: { color: "#E0E0E0" }, label: { color: "#999" } }} />
                    <TextField fullWidth label="Location" value={location} onChange={handleLocation} sx={{ mb: 2, input: { color: "#E0E0E0" }, label: { color: "#999" } }} />

                    {role === "SERVICE_PROVIDER" && (
                        <>
                            <TextField fullWidth label="Specialization" value={specialization} onChange={handleSpecialization} sx={{ mb: 2, input: { color: "#E0E0E0" }, label: { color: "#999" } }} />
                            <Typography sx={{ mb: 1, color: "#00D084" }}>Available Days</Typography>
                            <FormGroup sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                                {daysOfWeek.map(day => (
                                    <FormControlLabel
                                        key={day}
                                        control={<Checkbox checked={availabledays.includes(day)} onChange={() => handleAvailableDays(day)} sx={{ color: "#00D084" }} />}
                                        label={day}
                                        sx={{ color: "#E0E0E0" }}
                                    />
                                ))}
                            </FormGroup>
                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                                <Box sx={{ width: "100%" }}>
                                    <Typography sx={{ color: "#00D084" }}>Start Time</Typography>
                                    <TextField fullWidth type="time" value={startTime} onChange={handleStartTime} sx={{ mb: 2, input: { color: "#E0E0E0" } }} />
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <Typography sx={{ color: "#00D084" }}>End Time</Typography>
                                    <TextField fullWidth type="time" value={endTime} onChange={handleEndTime} sx={{ mb: 2, input: { color: "#E0E0E0" } }} />
                                </Box>
                            </Box>
                        </>
                    )}

                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button variant="outlined" sx={{ borderColor: "#00D084", color: "#00D084", '&:hover': { backgroundColor: "#00D084", color: "black" } }}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#00D084", color: "black", '&:hover': { backgroundColor: "#00A970" } }}>
                            Create
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
