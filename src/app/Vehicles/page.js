 'use client';
import VehicleCard from '../components/VehicleCard';

export default function VehiclesPage() {
  // Later: fetch or get vehicles list here
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#171e36'
    }}>
      {/* Render multiple cards or just one as needed */}
      <VehicleCard />
    </div>
  );
}