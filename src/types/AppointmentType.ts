import UserType from "./UserType";

interface AppointmentType{
    id:number;
    name:string;
    contact:string;
    description:string;
    date:string;
    time:string;
    serviceProvider:UserType;
}
export default AppointmentType;