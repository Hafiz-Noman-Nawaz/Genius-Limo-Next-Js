'use client';

import GoogleMapsAutocomplete from "../components/GoogleMapsAutocomplete";
import BookingForm from "../components/BookingForm";
import VehicleCard from "../components/VehicleCard";
import React, { useState } from 'react';
const Home = () => {
     const [showCard, setShowCard] = useState(false);
    return(
        <>
        <div >
            <GoogleMapsAutocomplete/>
        </div>
        <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f7fa'
    }}>
        {!showCard ? (
        <BookingForm onSearch={() => setShowCard(true)} />
      ) : (
        <VehicleCard />
      )}
        </div>
        </>
    )
}
export default Home;