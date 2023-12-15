import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
    gameId: string;
    name: string;
    image: string;
}

const ListCard: React.FunctionComponent<GameCardProps> = ({ gameId, name, image }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ display: 'flex', backgroundColor: 'white', marginX: "10px" }} key={gameId} onClick={()=>{navigate(`/game/${gameId}`)}} >
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }} >
                <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography component="div" variant="h6">
                        {name}
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151, flex: 1 }}
                image={image}
                alt={name}
            />
        </Card>

    );
}

export default ListCard;