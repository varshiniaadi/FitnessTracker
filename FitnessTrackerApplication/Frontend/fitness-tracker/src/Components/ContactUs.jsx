import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ContactUs = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Box>
        <Typography variant="h6">Contact Us</Typography>
        <Typography variant="body1">
          Curefit HQ Office
          <br />
          #17/17C BDA 3rd Sector,
          <br />
          HSR Layout,
          <br />
          Bengaluru,
          <br />
          Karnataka,
          <br />
          560102
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          For general enquiry, please reach out to us on <a href="mailto:hello@cult.fit">hello@cult.fit</a>
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          If you are a health/fitness expert and wish to partner with us, please reach out to us on <a href="mailto:partner.support@cult.fit">partner.support@cult.fit</a>
        </Typography>
      </Box>
    </Paper>
  );
};

export default ContactUs;
