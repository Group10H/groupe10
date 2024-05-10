import AddSalle from './components/salle/AddSalle'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingSalles from './components/salle/ExistingSalles'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import EditSalle from './components/salle/EditSalle'
import Home from './components/home/Home'
import Footer from './components/layout/Footer'
import SalleListing from './components/salle/SalleListing'
import MainHeader from './components/layout/MainHeader'
import Reservations from './components/reservation/Reservations'
import Checkout from './components/reservation/Checkout'
import ReservationForm from './components/reservation/ReservationForm'
import SalleCarousel from './components/common/SalleCarousel'
import ReservationSuccess from './components/reservation/ReservationSuccess'
import FindReservation from './components/reservation/FindReservation'
import Parallax from './components/common/Parallax'
import Header from './components/common/Header'
import SalleSearch from './components/common/SalleSearch'
import NavbarC from './components/layout/navbar'
import Register from './components/admin/Registrer'
import SingIN from './components/admin/SingIn'
import Navbaradmin from './components/admin/navbaradmin'
function App() {

  return (
    <>
    <main>
      <MainHeader/>
      <Router>
        <Navbar/>
      
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/edit-salle/:salleId' element={<EditSalle/>}/>
          <Route path='/existing-salles' element={<ExistingSalles/>}/>
          <Route path="/browse-all-salles" element={<SalleListing/>} />
          <Route path="/Salle/add" element={<AddSalle/>}/>

          <Route path="/reservations" element={<Reservations/>} />
          <Route path="/browse-all-salles" element={<SalleListing/>} />
          <Route path="/reservation-form" element={<ReservationForm/>} />
          <Route path="/reserver-salle/:salleId"element={ <Checkout/>}/>
          <Route path='/salle'element={ <SalleCarousel/>}/>
          <Route path='/reservation-success'element={ <ReservationSuccess/>}/>
          <Route path="/find-reservation" element={<FindReservation />} />
          {/*-------------------*/}
          <Route path="/parallax" element={<Parallax />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/SalleSearch" element={<SalleSearch />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SingIn" element={<SingIN />} />
          




          
        </Routes>
      </Router>
      <Footer/>
    </main>

    

     </>
 )
}
function Navbar() {
  const location = useLocation();

  // Define paths for which to show specific navbars
  const adminPaths = ['/edit-salle/:salleId', '/existing-salles', '/reservations', '/Salle/add','/Register'];

  // Check if the current location matches admin paths
  const isAdminPage = adminPaths.some(path => location.pathname.includes(path));

  // Render Navbar based on isAdminPage
  return (
    <>
      {isAdminPage ? <Navbaradmin /> : <NavbarC />}
    </>
  );
}


export default App
