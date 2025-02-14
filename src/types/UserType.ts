import ServiceType from "./ServiceType";

interface UserType{
    userId:number;
    name:string;
    email:string;
    role:string;
    contact:string;
    location:string;
    specialization:string;
    availableDays:string[];
    appoiments:string[];
    startTime:string;
    endTime:string;
    serviceTime:number;
    servicesProvide:ServiceType;
    averageRate:number;
}
export default UserType;