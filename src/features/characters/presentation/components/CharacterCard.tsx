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
        height: {xs: 'auto'}
      }}
    >
      <CardActionArea sx={{display: 'flex'}}>
        <Fade in={true} timeout={2000} >
          <CardMedia
            component="img"
            src={data['image']}
            alt="Not found"
            sx={{
              width: { xs: '120px', sm: '160px', md: '180px' },
              height: { xs: '190px', sm: '220px',  md: '220px' },
              objectFit: "fill" 
            }}
          />
        </Fade>
        <CardContent 
          sx={{
            flex: 'auto', 
            height: { xs:'190px', sm: '220px', md: '220px'} 
          }}
        >
          <Typography 
            component="div"
            fontWeight='bold'
            sx={{ 
              textTransform: 'uppercase', fontSize: { xs: 12, sm: 14, md: 16} 
            }}
          >
            {data['name']}
          </Typography>

          <Box display='flex'>
            <Box marginRight='4px'>
              <CircleIcon style={{fontSize: 14, fill: `${statusColor}`}} /> 
            </Box>
            <span>{data['status']} | {data['species']}</span>
          </Box>

          <Box sx={{marginTop: {xs: 1, sm: 2 }}}>
            <Typography component='div' variant='body2' color='darkgray' fontWeight='bold'>
              Last known location:
            </Typography>
            <Typography component='div' variant='body2'>
              {data['location']['name']}
            </Typography>
          </Box>

          <Box sx={{marginTop: {xs: 1, sm: 2 }}}>
            <Typography component='div' variant='body2' color='darkgray' fontWeight='bold'>
              First seen in:
            </Typography>
            <Typography component='div' variant='body2'>
              {data['first_seen']}
            </Typography>
          </Box>
          
        </CardContent>
      </CardActionArea>
    </Card>
  )
}