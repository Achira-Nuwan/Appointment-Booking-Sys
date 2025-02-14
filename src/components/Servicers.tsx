  import AccountCircle from '@mui/icons-material/AccountCircle';
import Close from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from "@mui/icons-material/Star";
import { Button, Card, CardContent, CardMedia, Chip, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, Rating, Select, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceProvider from '../assets/profile.webp';
import AppointmentType from '../types/AppointmentType';
import ServiceType from '../types/ServiceType';
import UserType from '../types/UserType';



  // Styled components for search bar
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius:'50px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      borderRadius: '50px',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
  }));

  export default function Services() {

    const [service, setService] = React.useState<ServiceType[]>([]);
    const [isHovered, setIsHovered] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("");
    const [serviceProviders, setServiceProviders] = React.useState<UserType[]>([]);
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [selectedSProvider, setSelectedProvider] = React.useState<UserType | null>(null);
    const [name, setName] = React.useState<string | null>('');
    const [contact, setContact] = React.useState<string | null>('');
    const [description, setDescription] = React.useState<string | null>('');
    const [date, setdate] = React.useState<string | null>('');
    const [time, setTime] = React.useState<string | null>('');
    const [serviceProviderId, setServiceProviderId] = React.useState<number>(0);
    const [timeSlots, setTimeSlots] = React.useState<string[] | null>(null);
    const [bookedAppointments, setBookedAppointments] = React.useState<AppointmentType[]>([]);
    const navigate = useNavigate();

    const SearchDropdown = styled('ul')(({ theme }) => ({
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: theme.shadows[3],
      padding: 0,
      margin: 0,
      listStyle: 'none',
      zIndex: 10,
    }));

    // Load services from backend(Api request foe fetch data from backend)
    React.useEffect(() => {
      const loadServices = async () => {
          try{
              const response = await axios.get("http://localhost:8080/service/get");
              console.log("Services:",response.data);
              setService(response.data);
          }catch(error){
              console.error("Error fetching services");
          }
      };
    

      // fetch service providers from backend
      const loadServiceProviders = async () => {

          try{
              const response = await axios.get("http://localhost:8080/user/get");
              
              const filteredServiceProviders = response.data.filter((user:UserType) => user.role === "SERVICE_PROVIDER");
              console.log("Filtered Service providers:",filteredServiceProviders);

              setServiceProviders(filteredServiceProviders);
          }catch (error){
              console.error("Error fetching service providers:",error);
          }
          
      };

      loadServices();
      loadServiceProviders();

    },[]);

      const filteredServices =  service.filter((service) =>
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const openModel = (serviceProvider: UserType) => {
        setSelectedProvider(serviceProvider);
        setServiceProviderId(serviceProvider.userId);
        handleTimeSlots(serviceProvider);
        setProfileOpen(true);

        console.log("Service provider id:",serviceProvider.userId);
        console.log("Providers id:",serviceProviders.map((provider) => {provider.userId}));
      };
    
      const closeModel = () => {
          setProfileOpen(false);
      };

      function handleName(e:any){
        setName(e.target.value);
      }

      function handleContact(e:any){
        setContact(e.target.value);
      }

      function handleDate(e:any){
        setdate(e.target.value);
      }

      function handleTime(e:any){
        setTime(e.target.value);
      }

      function handleDescription(e:any){
        setDescription(e.target.value);
      }


      const handleSubmit = async () => {
        // Log the current data to check
        const data = {
          name: name,
          contact: contact,
          description: description,
          date: date,
          time: time,
          serviceProviderID: serviceProviderId,
        };
      
        console.log("AppointmentData:", data);
      
        // Check for missing values before submitting
        if (!name || !contact || !description || !date || !time || !serviceProviderId) {
          alert('Please fill out all fields.');
          return;
        }
      
        try {
          const response = await axios.post("http://localhost:8080/appointment/create", data);
          console.log("Appointment created successfully.", response.data);
          alert('Appointment successfully created.');
          
          // Clear the input fields after submission
          setName(null); 
          setContact(null);
          setDescription(null);
          setdate(null);
          setTime(null);
          closeModel(); // Close the modal after successful submission
        } catch (error) {
          console.error("Error creating appointment.", error);
          alert('Failed to create appointment');
        }
      };

      const handleTimeSlots = async (provider: UserType) => {
        if (!provider.startTime || !provider.endTime || !provider.serviceTime) {
          console.error("Missing time data:", provider);
          return;
        }
      
        console.log("Service provider from model:", provider);
      
        const startTime = provider.startTime.trim();
        const endTime = provider.endTime.trim();
        const serviceTime: number = provider.serviceTime;
      
        // Pass the time
        const parseTime = (time: string) => {
          const [hours, minutes] = time.split(":").map(Number);
          if (isNaN(hours) || isNaN(minutes)) {
            console.error("Invalid time format:", time);
            return null;
          }
          const date = new Date();
          date.setHours(hours, minutes, 0, 0);
          return date;
        };
      
        let currentTime: any = parseTime(startTime);
        let endTimeObj = parseTime(endTime);
      
        if (!currentTime || !endTimeObj) {
          console.error("Failed to parse times:", startTime, endTime);
          return;
        }
      
        console.log("Parsed Start Time:", currentTime);
        console.log("Parsed End Time:", endTimeObj);
      
        let timeSlots: string[] = [];
      
        while (currentTime < endTimeObj) {
          let nextTime = new Date(currentTime.getTime() + serviceTime * 60000);
          if (nextTime <= endTimeObj) {
            timeSlots.push(
              `${currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${nextTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            );
          }
          currentTime = nextTime;
        }

        try{
          // Fetch booked appointments to the service provider
          const response = await axios.get(`http://localhost:8080/appointment/get?providerId=${provider.userId}`);
          const fetchedAppointments: AppointmentType[] = response.data;
          setBookedAppointments(fetchedAppointments);

          //Extract booked times
          const bookedTimes = fetchedAppointments.map((appointment) => {
            const [hours, minutes] = appointment.time.split(":").map(Number);
            if (isNaN(hours) || isNaN(minutes)) {
              console.error("Invalid booked time format:", appointment.time);
              return null;
            }
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
          }).filter(time => time !== null); // Filter out any invalid times
          

          console.log("Booked time slots:",bookedTimes);

          // Filter the booked time slots
          timeSlots = timeSlots.filter(slot => {
            const slotTime = slot.split(" - ")[0]; //Get start time of each time
            return !bookedTimes.includes(slotTime);
          });

          console.log("Available time slots:",timeSlots);
          setTimeSlots(timeSlots);
        }catch (error){
          console.error("Error fetching appointments:",error);
        }
      };

      const handleSearchService = (id:number) => {
        // const filteredService = service.filter((service) => service.serviceId === id);
        const filteredServiceProviders = serviceProviders.filter((provider) => provider.servicesProvide.serviceId === id);
        setServiceProviders(filteredServiceProviders);
      };
      
      return (
          <Box sx={{ flexGrow: 1}}>
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

                      {/* Search bar with hoverable drop down */}
                      <Box position="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                          <Search>
                              <SearchIconWrapper>
                                  <SearchIcon />
                              </SearchIconWrapper>
                              <StyledInputBase
                                  placeholder="Search…"
                                  inputProps={{ 'aria-label': 'search' }}
                                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                          </Search>

                          {(isHovered || searchTerm.length > 0 ) && filteredServices.length > 0 && (
                              <SearchDropdown sx={{backgroundColor: "#1A3636", borderRadius:5}}>
                                  <MenuItem sx={{color:"black"}}>
                                      <Typography sx={{fontWeight:"bold", color:"#E0E0E0"}}>--All Services--</Typography>
                                  </MenuItem>
                                  {filteredServices.map((service) => (
                                      <MenuItem key={service.serviceId} 
                                        onClick={() => handleSearchService(service.serviceId)} 
                                        sx={{color:"#E0E0E0", fontSize:"14px",'&:hover': {color:"white"}}}
                                      >
                                          {service.description}
                                      </MenuItem>
                                  ))}
                              </SearchDropdown>
                          )}

                      </Box>

                      <Box sx={{ flexGrow: 1 }} />

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
                      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                          <IconButton
                              size="large"
                              aria-label="show 17 new notifications"
                              color="inherit"
                          >
                              <Badge badgeContent={17} color="error">
                                  <NotificationsIcon />
                              </Badge>
                          </IconButton>
                          <IconButton
                              size="large"
                              edge="end"
                              aria-label="account of current user"
                              aria-haspopup="true"
                              color="inherit"
                              onClick={() => navigate("/createUser")}
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

              <Box sx={{}}>
                  {/* Services providers list */}
                  <Box sx={{width:"100%", mt:10, display:"flex", justifyContent:"center", alignItems:"center"}}>
                      <Box 
                          sx={{
                              py:5,px:2,   
                              width:"100%", 
                              borderRadius:2,
                              boxShadow:3
                          }}>
                          <Typography 
                              variant='h4' 
                              sx={{textAlign:"left", fontWeight:"bold", mb:5}}
                          >
                              Find your service provider
                          </Typography>


                          <Grid container spacing={3}>
                              {serviceProviders.map((providers) => (
                                  <Grid item xs={12} sm={6} md={2} key={providers.userId}>
                                      <Card 
                                          sx={{
                                              display:"flex", 
                                              flexDirection:"column", 
                                              alignItems:"center", 
                                              padding:2,
                                              backgroundColor: "rgba(53, 65, 80, 0.6)",
                                              borderRadius:2,
                                              boxShadow:3,
                                              position:"relative",
                                              transition:"all 0.3s ease-in-out",
                                              "&:hover": { boxShadow:3},
                                              "&:hover .make-appointment": { opacity:1} 
                                          }}>
                                          <CardMedia 
                                              component="img" 
                                              image={ServiceProvider} 
                                              sx={{width:100, height:100, borderRadius:"50%"}}>
                                          </CardMedia>
                                          <CardContent>
                                              <Typography variant='h6' sx={{textAlign:"center", color:"green", fontWeight:"bold "}}>{providers.name}</Typography>
                                              <Typography variant='body2' color='white' sx={{textAlign:"center"}}>{providers.specialization}</Typography>
                                              <Typography variant='body2' color='white' sx={{textAlign:"center"}}>{providers.contact}</Typography>
                                               
                                               {/* Display Rating */}
                                              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                                                <Rating 
                                                  value={providers.averageRate || 0} 
                                                  precision={0.5} 
                                                  readOnly 
                                                  size="small"
                                                  sx={{ color: "gold" }} 
                                                  emptyIcon={<StarIcon fontSize="inherit" sx={{ color: "gray" }} />}
                                                />
                                                <Typography variant="body2" sx={{ ml: 1, color: "white" }}>
                                                  {providers.averageRate?.toFixed(1)}
                                                </Typography>
                                              </Box>
                                          </CardContent>
                                          
                                          {/* Appointment button */}
                                          <Button 
                                            variant='contained' 
                                            className='make-appointment'
                                            sx={{ 
                                              backgroundColor: "black", 
                                              mt:1,
                                              opacity:0,
                                              transition: "opacity 0.3s ease-in-out",
                                              width:"100%"
                                            }} 
                                            onClick={() => openModel(providers)}
                                          >
                                              Appointment
                                          </Button>
                                      </Card>
                                  </Grid>
                              ))}
                          </Grid>
                      </Box>
                  </Box>
                  
                  {/* Create appointment model */}
                  <Dialog open={profileOpen} onClose={closeModel} maxWidth="xs" fullWidth 
                    sx={{
                      backdropFilter: "blur(5px)",
                      "& .MuiDialog-paper": {
                        padding:3, 
                        borderRadius:3
                      }
                    }}
                  >
                      {/* Close button */}
                      <Box sx={{position:"absolute", top:2, right:2}}>
                          <IconButton onClick={closeModel}>
                              <Close />
                          </IconButton>
                      </Box>
                      <DialogTitle sx={{textAlign:"left", fontWeight:"bold", fontSize:"1.8rem"}}>
                        <Typography>
                          Book Appointment with {selectedSProvider?.name}
                        </Typography>
                      </DialogTitle>
                      <DialogContent>

                          {/* Input fields */}
                          <TextField 
                            fullWidth
                            label="Your Name"
                            name='name'
                            value={name}
                            onChange={handleName}
                            sx={{mb:2, mt:2, color:"white"}}
                          />

                          <TextField 
                            fullWidth
                            label="Contact Number"
                            name='contact'
                            value={contact}
                            onChange={handleContact}
                            sx={{mb:2, color:"white"}}
                          />
                          <Box sx={{mb:2}}>
                            <Typography variant='subtitle2' fontWeight="bold">
                              Available Days
                            </Typography>
                          <Box sx={{display:"flex", flexWrap:"wrap", gap:1}}>
                              {/* <Typography>{selectedSProvider?.workingHours}</Typography> */}
                              {selectedSProvider?.availableDays ? (
                                selectedSProvider?.availableDays.map((day, index) =>(
                                  <Chip key={index} label={day.trim()} color='primary' variant='outlined'/>
                                ))
                              ) : (
                                <Typography variant='body2' color='textSecondary'>
                                  No available days listed
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          <TextField
                            fullWidth
                            type='date'
                            name='date'
                            value={date}
                            onChange={handleDate}
                            sx={{mb:2, color:"white"}}
                          />
                          <Typography sx={{mb:2}}></Typography>
                          <FormControl fullWidth sx={{mb:2}}>
                            <InputLabel>Time Slots</InputLabel>
                            <Select 
                              name='time'
                              value={time}
                              onChange={handleTime}
                              sx={{color:"white"}}
                            > 
                              {timeSlots && timeSlots.length > 0 ? (
                                timeSlots.map((slot, index) => (
                                  <MenuItem key={index} value={slot}>{slot}</MenuItem>
                                ))
                              ) : (
                                <MenuItem disabled>No available slots</MenuItem>
                              )}
                            </Select>
                          </FormControl>

                          <TextField 
                            fullWidth
                            label="Description"
                            name='description'
                            value={description}
                            onChange={handleDescription}
                            sx={{mb:2, color:"white"}}
                          />

                          <Button 
                            variant='contained' 
                            color='secondary' 
                            fullWidth 
                            onClick={handleSubmit} 
                            disabled={!name || !contact || !date || !time}
                          >
                            Book Appointment
                          </Button>
                      </DialogContent>
                  </Dialog>
              </Box>
          </Box>
    );
  }
