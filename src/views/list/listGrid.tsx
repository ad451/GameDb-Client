import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { IGame } from '../../models/game';
import ListCard from '../home/Card';

interface ListGridProps {
    games: Array<IGame>,
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ListGrid: React.FunctionComponent<ListGridProps> = ({ games }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                {games.map((game) => (
                    <Grid item key={game._id} xs={6} sm={6} md={6} lg={4} xl={4}>
                        <ListCard
                            gameId={game._id}
                            name={game.name}
                            image={game.background_image}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}

export default ListGrid;
