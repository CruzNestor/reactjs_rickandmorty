import { Box, Toolbar } from "@mui/material";

export default function HomePage() {
  return (
    <div>
      <Toolbar>
        <h1>Home</h1>
      </Toolbar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 310px)' }}
      >
        <Box padding={2}>
          <h2>Rick And Morty API</h2>
          <p>Here you can see the list of all the characters and you can also search by the name of the character or his ID.</p>
        </Box>
      </Box>
    </div>
    
  )
}