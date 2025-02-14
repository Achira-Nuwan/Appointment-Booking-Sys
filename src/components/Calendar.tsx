import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";

export const Calendar = () => {
    const [date, setDate] = useState(dayjs());

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
            </LocalizationProvider>
        </Box>
    );
};
