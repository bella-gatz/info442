import React, { useContext } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoritesContext } from './FavoritesContext';

function Favorites() {
    const { favorites, handleFavoriteToggle } = useContext(FavoritesContext);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {favorites.length > 0 ? (
                favorites.map((favorite, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                        >
                            <Typography>{favorite.name || favorite.title || 'Unnamed'}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    sx={{
                                        height: 233,
                                        width: 350,
                                        maxHeight: { xs: 233, md: 167 },
                                        maxWidth: { xs: 350, md: 250 },
                                    }}
                                    alt={favorite.name || favorite.title || 'Unnamed'}
                                    src={favorite.imageURL || favorite.img_url || 'placeholder.jpg'}
                                />
                            </Box>
                            <Typography component="div">
                                <p>{favorite.address || favorite.date || 'No address available'}</p>
                                <p>{favorite.dominant_discipline || favorite.location || 'No discipline/location available'}</p>
                                <p>{favorite.description || 'No description available'}</p>
                                <IconButton
                                    aria-label="remove from favorites"
                                    onClick={() => handleFavoriteToggle(favorite)}
                                >
                                    <FavoriteIcon color="error" />
                                </IconButton>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography variant="h6" component="div" sx={{ m: 2 }}>
                    No favorite items yet.
                </Typography>
            )}
        </Box>
    );
}

export default Favorites;
