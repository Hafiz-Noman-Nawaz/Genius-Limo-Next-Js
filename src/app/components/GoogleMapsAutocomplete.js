'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB2YTMyrrPKP1JZeyzPw39S_qce8AJWmfI';

const DARK_BG = "#171e36";
const DARK_CARD = "#20294a";
const DARK_ACCENT = "#6cb8e5";
const DARK_TEXT = "#e2e6ec";

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function loadScript(src, position, id) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.id = id;
  script.src = src;
  position.appendChild(script);
}

function CustomPaper(props) {
  const theme = useTheme();
  return (
    <Paper
      {...props}
      sx={{
        bgcolor: DARK_BG,
        color: DARK_TEXT,
        border: `1px solid ${DARK_ACCENT}`,
        ...props.sx
      }}
    >
      {props.children}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          pt: '1px',
          opacity: 0.7,
        }}
      >
        <img
          src={
            theme.palette.mode === 'dark'
              ? 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-non-white3_hdpi.png'
              : 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png'
          }
          alt=""
          width="120"
          height="14"
        />
      </Box>
    </Paper>
  );
}

const fetchPlaces = debounce(
  (request, callback) => {
    if (
      !(window && window.google && window.google.maps && window.google.maps.places)
    ) {
      callback([]);
      return;
    }
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(request, (results) => {
      callback(
        results
          ? results.map((prediction) => ({
              description: prediction.description,
              structured_formatting: prediction.structured_formatting,
            }))
          : []
      );
    });
  },
  400
);

export default function GoogleMapsAutocomplete({
  value,
  onChange,
  placeholder = 'Address, Airport, Hotel, ...',
  dark = false,
}) {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.google || !window.google.maps) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    } else {
      setLoaded(true);
    }
    const onLoad = () => setLoaded(true);
    window.addEventListener('google-maps-loaded', onLoad);
    return () => window.removeEventListener('google-maps-loaded', onLoad);
  }, []);

  useEnhancedEffect(() => {
    if (!loaded && window.google && window.google.maps && window.google.maps.places) {
      setLoaded(true);
    }
    if (!loaded) {
      return undefined;
    }
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    let active = true;
    fetchPlaces({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];
        if (results) {
          newOptions = results;
          if (value) {
            newOptions = [
              value,
              ...results.filter((result) => result.description !== value.description),
            ];
          }
        } else if (value) {
          newOptions = [value];
        }
        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [value, inputValue, loaded]);

  return (
    <Autocomplete
      sx={{
        width: '100%',
        '& .MuiInputBase-root': dark
          ? { bgcolor: DARK_BG, color: DARK_TEXT, borderColor: DARK_ACCENT }
          : {},
        '& .MuiInputBase-input': dark
          ? { color: DARK_TEXT, fontWeight: 500 }
          : { color: '#222D4A', fontWeight: 500 },
        '& .MuiInputLabel-root': dark
          ? { color: DARK_ACCENT, fontWeight: 600 }
          : { color: '#222D4A', fontWeight: 600 }
      }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={onChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          size="small"
          fullWidth
          InputProps={{
            ...params.InputProps,
            style: dark
              ? { color: DARK_TEXT, fontWeight: 500, background: DARK_BG }
              : { color: '#222D4A', fontWeight: 500 }
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            style: dark
              ? { color: DARK_ACCENT, fontWeight: 600 }
              : { color: '#222D4A', fontWeight: 600 }
          }}
        />
      )}
      slots={{
        paper: CustomPaper,
      }}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );
        return (
          <li {...props}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: dark ? DARK_ACCENT : 'text.secondary' }} />
              </Grid>
              <Grid sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      color: dark ? DARK_TEXT : '#222D4A',
                      fontWeight: part.highlight
                        ? 'fontWeightBold'
                        : 'fontWeightRegular',
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
                {option.structured_formatting.secondary_text ? (
                  <Typography variant="body2" sx={{ color: dark ? DARK_ACCENT : 'text.secondary' }}>
                    {option.structured_formatting.secondary_text}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}