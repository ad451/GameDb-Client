import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Augment the palette to include a salmon color
declare module "@mui/material/styles" {
  interface Palette {
    salmon: Palette["primary"];
  }

  interface PaletteOptions {
    salmon?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    salmon: {
      main: "#FF5733",
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'white', // Set the text color to white
        },
      },
    },
  },
});
interface PaginationProps{
  count : number,
  color : any,
  handlePagination: (pageNumber: number) => void;
}
const ThemedPagination = (props : PaginationProps) => (
  <ThemeProvider theme={theme}>
    <Pagination {...props} style={{'color':'white'}} onChange={(event, value : number) => props.handlePagination(value)} />
  </ThemeProvider>
);

export default function BasicPagination(props : any) {
  return (
    <Stack spacing={2}>
      <ThemedPagination count={10000} color="salmon" handlePagination = {props.handlepagination} />
    </Stack>
  );
}
