import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import museumMap from './museumsMap.json';
import './home.css';

function Exhibition({ title, date, location, img_url, link_url }) {
    return (
        <Paper elevation={3} sx={{ padding: '1rem', flex: '1 1 calc(33% - 1rem)', minWidth: '200px' }}>
            <img src={img_url} alt={title} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Typography variant="body1" gutterBottom>{date}</Typography>
            <Typography variant="body2" color="textSecondary">{location}</Typography>
            <Button href={link_url} target="_blank" rel="noopener noreferrer" variant="contained" color="primary">More Info</Button>
        </Paper>
    );
}

function MuseumComparisonTool({ museums }) {
    const [tickets, setTickets] = useState([]);
    const [selectedMuseum, setSelectedMuseum] = useState('');

    const handleSelectChange = (e) => {
        setSelectedMuseum(e.target.value);
    };

    const handleAddTicket = () => {
        if (selectedMuseum) {
            const selectedMuseumData = museums.find(museum => museum.Name === selectedMuseum);
            if (selectedMuseumData) {
                const ticketDetails = {
                    museumName: selectedMuseumData.Name,
                    ticketPrice: selectedMuseumData["Ticket Price"],
                    location: selectedMuseumData.Address,
                    dominantDiscipline: selectedMuseumData["Dominant Discipline"]
                };
                setTickets([...tickets, ticketDetails]);
                setSelectedMuseum('');
            }
        }
    };


    const removeTicket = (index) => {
        const updatedTickets = tickets.filter((_, i) => i !== index);
        setTickets(updatedTickets);
    };

    const resetComparison = () => {
        setTickets([]);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">Museum</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedMuseum}
                    label="Museum"
                    onChange={handleSelectChange}
                >
                    {museums.map((museum) => (
                        <MenuItem key={museum.Name} value={museum.Name}>
                            {museum.Name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleAddTicket} sx={{ mb: 2 }}>
                Add Ticket
            </Button>

            <Button variant="outlined" color="error" onClick={resetComparison} sx={{ mb: 2, ml: 2 }}>
                Reset
            </Button>

            <Typography variant="h4" component="h2" gutterBottom>
                Comparison Table
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="comparison table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Museum Name</TableCell>
                            <TableCell align="right">Ticket Price</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Dominant Discipline</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {ticket.museumName}
                                </TableCell>
                                <TableCell align="right">${ticket.ticketPrice}</TableCell>
                                <TableCell align="right">{ticket.location}</TableCell>
                                <TableCell align="right">{ticket.dominantDiscipline}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="secondary" size="small" onClick={() => removeTicket(index)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

function Home() {
    const [reviews, setReviews] = useState([]);
    const [reviewDetails, setReviewDetails] = useState({
        reviewerName: '',
        reviewText: ''
    });

    const handleReviewInputChange = (e) => {
        const { name, value } = e.target;
        setReviewDetails({ ...reviewDetails, [name]: value });
    };

    const addReview = () => {
        if (reviewDetails.reviewerName && reviewDetails.reviewText) {
            setReviews([...reviews, { ...reviewDetails }]);
            setReviewDetails({
                reviewerName: '',
                reviewText: ''
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Welcome Section */}
            <Box className="welcome-container">
                <Container maxWidth="md">
                    <div className="welcome-text">
                        <Typography variant="h3" component="h1" gutterBottom>
                            Welcome to the Museum Ticket Comparison Tool
                        </Typography>
                        <Typography variant="h6" component="p" gutterBottom>
                            "A museum is a place where one should lose one's head."
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            - Renzo Piano
                        </Typography>
                    </div>
                </Container>
            </Box>

            <MuseumComparisonTool museums={museumMap} />
            {/* Content and Pictures Section */}
            <Box sx={{ padding: '2rem 0' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" component="h2" gutterBottom>
                        Featured Museums and Promotions
                    </Typography>
                    {/* Placeholder for additional content */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {[
                            {
                                "title": "Calder: In Motion, The Shirley Family Collection",
                                "date": "Nov 8 2023 - Aug 4 2024",
                                "location": "Seattle Art Museum",
                                "img_url": "https://sam.canto.com/direct/image/9sv4na8vkh33df408m657om55i/QEORtJX-kH42k6c42gUcayo8J5o/m800/800",
                                "link_url": "/exhibitions/calder"
                            },
                            {
                                "title": "Anida Yoeu Ali: Hybrid Skin, Mythical Presence",
                                "date": "Jan 18 - Jul 7 2024",
                                "location": "Seattle Asian Art Museum",
                                "img_url": "https://sam.canto.com/direct/image/igkrevblud6gb8atiu2bqlbq3n/knO2_wKrrClbwrve9t4fCx7jnDE/m800/800",
                                "link_url": "/exhibitions/ali"
                            },
                            {
                                "title": "Elizabeth Malaska: All Be Your Mirror",
                                "date": "Nov 17 2023 - Jun 16 2024",
                                "location": "Seattle Art Museum",
                                "img_url": "https://sam.canto.com/direct/image/qubv8bi3f549fdjvknjpubor5p/6__Ov-KqR6UZ0GDM2t8JOALXULA/m800/800",
                                "link_url": "/Exhibitions/Details?EventId=87429"
                            },
                            {
                                "title": "Remember the Rain",
                                "date": "Aug 18 2023 - Oct 28 2024",
                                "location": "Seattle Art Museum",
                                "img_url": "https://sam.canto.com/direct/image/3qjlrlh55d00df8423vd0vel5t/_YcOlIHLjSN-TsRt2-apoiddJcg/m800/800",
                                "link_url": "/Exhibitions/Details?EventId=92510"
                            }
                        ].map((exhibition, index) => (
                            <Exhibition key={index} {...exhibition} />
                        ))}
                    </Box>
                    <Box sx={{ padding: '2rem 0', marginTop: '5rem' }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Reviews
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {reviews.map((review, index) => (
                                <Paper key={index} elevation={3} sx={{ padding: '1rem' }}>
                                    <Typography variant="h6" gutterBottom>{review.reviewerName}</Typography>
                                    <Typography variant="body1">{review.reviewText}</Typography>
                                </Paper>
                            ))}
                        </Box>
                        <Box sx={{ marginTop: '2rem' }}>
                            <Typography variant="h6" gutterBottom>Add a Review</Typography>
                            <TextField
                                fullWidth
                                label="Your Name"
                                name="reviewerName"
                                value={reviewDetails.reviewerName}
                                onChange={handleReviewInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Your Review"
                                name="reviewText"
                                value={reviewDetails.reviewText}
                                onChange={handleReviewInputChange}
                                multiline
                                rows={4}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" color="primary" onClick={addReview}>
                                Submit Review
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;
