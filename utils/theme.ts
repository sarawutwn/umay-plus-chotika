import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    palette: {
        primary: {
            main: "#043478",
            light: "#10254a",
        },
        info: {
            main: "#1C84C6",
            dark: "#416393",
            contrastText: "#fff"
        },
        success: {
            main: "#6fbf73",
            dark: "#3e8e46",
            contrastText: "#fff"
        },
        warning: {
            main: "#f8AC59",
            dark: "#ffa000",
            contrastText: "#fff"
        },
    },
    typography: {
        fontFamily: 'Athiti, sans-serif'
    }
});

export default Theme