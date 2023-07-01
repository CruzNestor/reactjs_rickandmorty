import { Box, Card, CardActionArea, CardContent, CardMedia, Fade, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';

interface Props {
  data: Record<string, any>
}

export default function CharacterCard (props: Props) {
  const { data } = props

  const getColorStatus = (status: string) : string => {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      default:
        return 'gray';
    }
  }

  const statusColor = getColorStatus(data['status'])
  
  return (
    <Card 
      variant='outlined' 
      elevation={0}
      sx={{
        height: { xs: 'auto'},
      }}
    >
      <CardActionArea>
        <Box component='div' display='flex' sx={{justifyContent: 'center', paddingTop: 2}}>
          <Fade in={true} timeout={2000}>
            <CardMedia
              component="img"
              src={data['image']}
              alt="Not found"
              sx={{
                borderRadius: '50%',
                width: { xs: '100px', sm: '160px', md: '160px' },
                height: { xs: '100px', sm: '160px',  md: '160px' },
                objectFit: "fill" 
              }}
            />
          </Fade>
        </Box>
        
        <CardContent 
          sx={{
            flex: 'auto',
            minHeight: { xs: '200px', sm: '240px', md: '280px'},
          }}
        >
          <Typography 
            component="div"
            fontWeight='bold'
            textAlign='center'
            sx={{ 
              textTransform: 'uppercase', fontSize: { xs: 12, sm: 14, md: 18} 
            }}
          >
            {data['name']}
          </Typography>

          <Box display='flex' alignItems='center' justifyContent='center'>
            <Box marginRight='4px'>
              <CircleIcon style={{fontSize: 14, fill: `${statusColor}`}} /> 
            </Box>
            <Typography textAlign='center' sx={{ fontSize: { xs: 12, sm: 14, md: 18} }}>
              {data['status']} | {data['species']}
            </Typography>
          </Box>

          <Box sx={{marginTop: {xs: 1, sm: 2 }}}>
            <Typography component='div' color='darkgray' fontWeight='bold' sx={{ fontSize: { xs: 12, sm: 14, md: 18} }}>
              Last known location:
            </Typography>
            <Typography component='div' sx={{ fontSize: { xs: 12, sm: 14, md: 18} }}>
              {data['location']['name']}
            </Typography>
          </Box>

          <Box sx={{marginTop: {xs: 1, sm: 2 }}}>
            <Typography component='div' color='darkgray' fontWeight='bold' sx={{ fontSize: { xs: 12, sm: 14, md: 18} }}>
              First seen in:
            </Typography>
            <Typography component='div' sx={{ fontSize: { xs: 12, sm: 14, md: 18} }}>
              {data['first_seen']}
            </Typography>
          </Box>
          
        </CardContent>
      </CardActionArea>
    </Card>
  )
}