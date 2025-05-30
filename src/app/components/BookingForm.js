'use client';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const hourOptions = [1, 2, 3, 4, 5, 6, 8, 10, 12];

// Example theme colors
const DARK_BG = "#171e36";
const DARK_CARD = "#20294a";
const DARK_ACCENT = "#6cb8e5";
const DARK_TEXT = "#e2e6ec";
const DARK_BUTTON = "#4285f4";
const DARK_BUTTON_HOVER = "#3367d6";
const GOLD_ACCENT = "#ffc94b";

export default function BookingForm() {
  const [tab, setTab] = useState(0);
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [stops, setStops] = useState([]);
  const [hour, setHour] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const handleAddStop = () => {
    setStops([...stops, null]);
  };

  const handleRemoveStop = idx => {
    setStops(stops.filter((_, i) => i !== idx));
  };

  const handleStopChange = (idx, value) => {
    setStops(stops.map((stop, i) => (i === idx ? value : stop)));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      JSON.stringify({
        type: tab === 0 ? 'point-to-point' : 'hourly',
        pickup,
        stops,
        dropoff,
        hour,
        pickupDate,
        pickupTime,
      })
    );
  };

  return (
    <Box
      sx={{
        minWidth: 350,
        width: 400,
        maxWidth: '90vw',
        bgcolor: DARK_CARD,
        p: 3,
        borderRadius: 4,
        boxShadow: 6,
        mx: 'auto',
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          width: '100%',
          mb: 2,
          '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
        }}
        TabIndicatorProps={{ style: { background: DARK_ACCENT } }}
      >
        <Tab
          label="POINT TO POINT"
          sx={{
            flex: 1,
            fontWeight: 700,
            color: tab === 0 ? DARK_ACCENT : DARK_TEXT,
            bgcolor: tab === 0 ? DARK_BG : 'transparent',
            borderTopLeftRadius: 14,
            borderBottomLeftRadius: 14,
            transition: 'background 0.3s, color 0.3s',
          }}
        />
        <Tab
          label="HOURLY HIRE"
          sx={{
            flex: 1,
            fontWeight: 700,
            color: tab === 1 ? DARK_ACCENT : DARK_TEXT,
            bgcolor: tab === 1 ? DARK_BG : 'transparent',
            borderTopRightRadius: 14,
            borderBottomRightRadius: 14,
            transition: 'background 0.3s, color 0.3s',
          }}
        />
      </Tabs>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box sx={{ mb: 2 }}>
          <Typography fontWeight={600} fontSize={15} mb={0.5} color={DARK_TEXT}>
            Pick-up Location
          </Typography>
          <GoogleMapsAutocomplete
            value={pickup}
            onChange={(_, v) => setPickup(v)}
            placeholder="Address, Airport, Hotel, ..."
            dark // pass custom prop to support dark mode in Autocomplete (see below)
          />
        </Box>

        {tab === 0 && (
          <>
            <Box sx={{ mb: 1 }}>
              <Button
                variant="text"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddStop}
                size="small"
                sx={{ color: GOLD_ACCENT, textTransform: 'none', fontWeight: 600 }}
              >
                Add Stop
              </Button>
            </Box>
            {stops.map((stop, idx) => (
              <Box key={idx} sx={{ mb: 1, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <GoogleMapsAutocomplete
                    value={stop}
                    onChange={(_, v) => handleStopChange(idx, v)}
                    placeholder="Stop Location"
                    dark
                  />
                </Box>
                <IconButton
                  aria-label="remove stop"
                  color="error"
                  size="small"
                  onClick={() => handleRemoveStop(idx)}
                  sx={{ mb: 0.5 }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}
            {stops.length > 0 && (
              <Typography variant="caption" color={DARK_ACCENT} sx={{ mb: 2, display: 'block' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5, color: DARK_ACCENT }} />
                  15 minutes stop time is available. If the wait time exceeds it will be charged accordingly.
                </span>
              </Typography>
            )}
          </>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography fontWeight={600} fontSize={15} mb={0.5} color={DARK_TEXT}>
            Drop-off Location
          </Typography>
          <GoogleMapsAutocomplete
            value={dropoff}
            onChange={(_, v) => setDropoff(v)}
            placeholder="Address, Airport, Hotel, ..."
            dark
          />
        </Box>

        {tab === 1 && (
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={600} fontSize={15} mb={0.5} color={DARK_TEXT}>
              Select Hours
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={hour}
              onChange={e => setHour(e.target.value)}
              placeholder="Select Hours"
              InputProps={{
                startAdornment: <AccessTimeIcon sx={{ mr: 1, color: DARK_ACCENT }} />,
                style: { color: DARK_TEXT, fontWeight: 500, background: DARK_BG }
              }}
              InputLabelProps={{
                style: { color: DARK_ACCENT, fontWeight: 600 }
              }}
              sx={{
                '& .MuiInputBase-root': { bgcolor: DARK_BG, color: DARK_TEXT },
                '& .MuiSvgIcon-root': { color: DARK_ACCENT }
              }}
            >
              {hourOptions.map((h) => (
                <MenuItem key={h} value={h} sx={{ color: DARK_TEXT, bgcolor: DARK_BG }}>
                  {h} {h === 1 ? 'hour' : 'hours'}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        <Divider sx={{ my: 2, borderColor: DARK_ACCENT, opacity: 0.15 }} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={600} fontSize={15} mb={0.5} color={DARK_TEXT}>
              Pick-Up Date
            </Typography>
            <TextField
              type="date"
              size="small"
              fullWidth
              value={pickupDate}
              onChange={e => setPickupDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { color: DARK_ACCENT, fontWeight: 600 }
              }}
              inputProps={{
                placeholder: 'DD/MM/YYYY',
                style: { color: DARK_TEXT, fontWeight: 500, background: DARK_BG }
              }}
              sx={{
                '& .MuiInputBase-root': { bgcolor: DARK_BG, color: DARK_TEXT }
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={600} fontSize={15} mb={0.5} color={DARK_TEXT}>
              Pick-Up Time
            </Typography>
            <TextField
              type="time"
              size="small"
              fullWidth
              value={pickupTime}
              onChange={e => setPickupTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { color: DARK_ACCENT, fontWeight: 600 }
              }}
              inputProps={{
                placeholder: 'HH:MM',
                style: { color: DARK_TEXT, fontWeight: 500, background: DARK_BG }
              }}
              sx={{
                '& .MuiInputBase-root': { bgcolor: DARK_BG, color: DARK_TEXT }
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="caption"
          color={DARK_ACCENT}
          sx={{ mt: 2, display: 'block', fontSize: 12 }}
        >
          Chauffeur will wait 25 minutes as a complimentary service
        </Typography>

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            mt: 3,
            background: DARK_BUTTON,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: 17,
            py: 1.2,
            color: "#fff",
            '&:hover': { background: DARK_BUTTON_HOVER },
          }}
        >
          Search
        </Button>
      </form>
    </Box>
  );
}