import GoogleMapsAutocomplete from "../components/GoogleMapsAutocomplete";
import BookingForm from "../components/BookingForm";
const Home = () => {
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
        <BookingForm />
        </div>
        </>
    )
}
export default Home;