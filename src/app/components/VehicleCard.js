'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import WorkIcon from '@mui/icons-material/Work';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

// Example image: Replace with your car image URL or import
const carImage = "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg";

export default function VehicleCard() {
  // Theme colors (different from original)
  const CARD_BG = "#222D4A";
  const CARD_BORDER = "#6cb8e5";
  const LABEL_BG = "#2a3360";
  const LABEL_TEXT = "#ffe082";
  const PRICE_BG = "#11182f";
  const PRICE_TEXT = "#ffe082";
  const BUTTON_BG = "#6cb8e5";
  const BUTTON_BG_HOVER = "#5299c7";
  const BUTTON_TEXT = "#222D4A";
  const TITLE = "#ffe082";
  const DESC = "#b7bfe6";

  return (
    <Box
      sx={{
        background: CARD_BG,
        border: `2px solid ${CARD_BORDER}`,
        borderRadius: 5,
        width: 330,
        p: 2.5,
        boxShadow: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: DESC,
      }}
    >
      <Box
        component="img"
        src={carImage}
        alt="Business Sedan"
        sx={{
          width: "90%",
          height: 140,
          objectFit: "contain",
          borderRadius: 3,
          mb: 2,
          background: "#fff",
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: TITLE,
          mb: 1.2,
          textAlign: 'center',
          letterSpacing: 1.1,
        }}
      >
        Business Sedan
      </Typography>

      <Box sx={{ mb: 2, width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          <Feature text="Heated Seats" />
          <Feature text="Bottled Water" />
          <Feature text="Free WiFi" />
          <Feature text="Flight Tracking" />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          bgcolor: PRICE_BG,
          color: PRICE_TEXT,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PeopleAltIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Max. 3
          </Typography>
          <WorkIcon fontSize="small" sx={{ ml: 2 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Max. 3
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: PRICE_TEXT, letterSpacing: 1 }}>
          $116.74
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          width: "100%",
          display: "block",
          textAlign: "left",
          color: DESC,
          mb: 2.5,
        }}
      >
        Trip Price includes base fare, gratuity and tax
      </Typography>

      <Button
        fullWidth
        sx={{
          background: BUTTON_BG,
          color: BUTTON_TEXT,
          fontWeight: 700,
          py: 1.1,
          borderRadius: 2,
          textTransform: "none",
          fontSize: 17,
          '&:hover': { background: BUTTON_BG_HOVER }
        }}
      >
        SELECT
      </Button>
    </Box>
  );
}

function Feature({ text }) {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      fontSize: 15,
      fontWeight: 500,
      color: "#b7bfe6",
      gap: "4px"
    }}>
      <CheckIcon fontSize="small" sx={{ color: "#6cb8e5" }} /> {text}
    </Box>
  );
}