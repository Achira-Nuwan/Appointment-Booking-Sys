import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import consultationImage from '../assets/consultation.jpg';
import coverImage from '../assets/cover.jpg';
import ServiceType from '../types/ServiceType';
import UserType from '../types/UserType';

export default function Home() {

  const [service, setService] = React.useState<ServiceType[]>([]);
  const [isHovered, setIsHovered] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("");
  const [serviceProviders, setServiceProviders] = React.useState<UserType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsPerPage = 3 // number of items per page
  const navigate = useNavigate();

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % service.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + service.length) % service.length);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App bar */}
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
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate('/createUser')}
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

        {/*Cover Page*/}
        <Box id="home" sx={{mt:5, width:"100%", display:"flex", justifyContent:"center", gap:10}}>
            <Box sx={{width:"40%", pt:5}}>
                <Typography
                    variant='h2'
                    sx={{fontWeight:"bold", textAlign:"left"}}
                >
                    Find Your Service And Make An Appointment
                </Typography>
                <Box sx={{alignItems:"left", display:"flex", gap:2, mt:2, backgroundColor:"inherit"}}>
                    <Button variant='contained' onClick={() => navigate("/services")}>
                        Make Appointment
                    </Button>
                    <Button variant='outlined'>
                        Learn more
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    height:"500px",
                    width:"60%",
                    display:"flex",
                    alignItems:"right",
                    justifyContent:"right",
                    color:"white",
                    textAlign:"center",
                    marginBottom:2,
                    marginTop:6,
                    overflow:"hidden"
                    }}>
                    <img
                        src={coverImage}
                        alt='Cover'
                        style={{
                            width:"80%",
                            height:"80%",
                            objectFit:"contain",
                            boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.5)"
                        }}
                    />
            </Box>
        </Box>

        {/* Display Services */}
        <Box id="services" sx={{py:4, px:2}}>
            <Box sx={{p:2, mb:4, borderBottom:0.25, borderColor:"#999"}}>
                <Typography variant='h4' sx={{fontWeight:"bold", textAlign:"left"}}>Explore Services</Typography>
            </Box>

            <Box sx={{position:"relative", width:"100%", overflow:"hidden", alignItems:"center", display:"flex", justifyContent:"space-between"}}>
                {/* Left Arrow */}
                <Box>
                    <Button onClick={prevSlide} sx={{position: "absolute", left:0, zIndex:10}}>
                        <ArrowBackIcon />
                    </Button>
                </Box>
            
                {/* Services */}
                <Box sx={{display:"flex", gap:5, overflow:"hidden", width:"90%",transition:"0.5s ease-in-out", justifyContent:"center"}}>
                    {service.slice(currentIndex, currentIndex + itemsPerPage).map((services) => (
                        <Box>
                            <Box sx={{
                                height:400,
                                width:200,
                                backgroundImage:`url(${consultationImage})`,
                                backgroundSize:"cover",
                                backgroundPosition:"center",
                                boxShadow:5,
                                borderRadius:2
                            }} />

                            <Typography sx={{mt:2}}>
                                {services.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Right Arrow */}
                <Box>
                    <Button onClick={nextSlide} sx={{position:"absolute", right:5, zIndex:10}}>
                        <ArrowForwardIcon />
                    </Button>
                </Box>
            </Box>
        </Box>
        {/* About */}
        <Box id="about-us" sx={{mb:4}}>
              <Box sx={{p:2, borderBottom:0.25, borderColor:"#999"}}>
                <Typography variant='h4' sx={{fontWeight:"bold", textAlign:"left"}}>About Us</Typography>
              </Box>
              
              <Box sx={{mt:5, display:"flex", flexDirection:"column"}}>
                <Box sx={{display:"flex", justifyContent:"center"}}>
                  <Typography variant='body1' sx={{width:"70%"}}>
                    We are dedicated to connecting customers with professional service providers. 
                    Our platform offers a seamless experience to find and book services across various industries. 
                    Whether you need a consultation, home service, or professional advice, we ensure you get the best experience possible.
                  </Typography>   
                </Box>
                <Box sx={{mt:8}}>
                  <Typography variant='subtitle1' sx={{}}>
                    Follow us.
                  </Typography>
                  <Box>
                    <IconButton sx={{color:"#E0E0E0"}}>
                      <Facebook />
                    </IconButton>
                    <IconButton sx={{color:"#E0E0E0"}}>
                      <Instagram />
                    </IconButton>
                    <IconButton sx={{color:"#E0E0E0"}}>
                      <Twitter />
                    </IconButton>
                    <IconButton sx={{color:"#E0E0E0"}}>
                      <LinkedIn />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
    </Box>
  );
}
