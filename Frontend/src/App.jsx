import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import SliderReview from "./components/clients"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Listing from "./components/Listing"
import Favrioutes from "./components/Favrouites"
import Signup from "./Forms/Signup"
import Login from "./Forms/Login"
import AddProperty from "./Forms/AddProperty"
function App() {
const location = useLocation();
const hideFooterRoutes = ["/signup", "/login"];
const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  return (
    <>
    {shouldShowFooter && <Navbar/>}
    <Routes>
      <Route path="/" element={<Hero/>}/>
      <Route path="/listing" element={<Listing/>}/>
      <Route path="/favroites" element={<Favrioutes/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/add-property" element={<AddProperty/>}/>
    </Routes>
   {shouldShowFooter && <Footer />}
    
    </>
  )
}

export default App
