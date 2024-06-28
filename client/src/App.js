import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRegister from './pages/customer/userregister/UserRegister';
import AddPets from './pages/customer/addpet/AddPets';
import AppointmentRegister from './pages/customer/appointmentregister/AppointmentRegister';
import DailyDoctorUpdate from './pages/admin/docterupdate/DailyDoctorUpdate';
import AddVaccinationcertificates from './pages/docter/vaccination/AddVaccinationcertificates';
import Aboutus from './pages/home/about/Aboutus';
import OurDocters from './pages/home/docter/OurDocters';
import Servies from './pages/home/servies/Servies';
import Loginpage from './pages/home/login/Loginpage';
import Home from './pages/home/homesection/Home';
import Addservies from './pages/admin/addservices/Addservies';
import Viewusers from './pages/admin/viewusers/Viewusers';
import Viewdocter from './pages/admin/viewdocter/Viewdocter';
import Viewservices from './pages/admin/viewservies/Viewservices';
import Viewappointment from './pages/admin/viewappointment/Viewappointment';
import DoctorReg from './pages/admin/registerdoctor/DoctorReg';
import Userregs from './pages/admin/reguser/Userregs';
import Ahome from './components/admin/home/navbar/Ahome';
import Viewpet from './components/customers/viewpet/Viewpet';
import Viewpriscription from './pages/customer/viewpriscription/Viewpriscription';
import Doctorhome from './pages/docter/home/Doctorhome';
import Dviewappointment from './pages/docter/viewappointment/Dviewappointment';
import AddPriscriptions from './pages/docter/priscription/AddPriscriptions';
import Viewvaccinecetificate from './pages/customer/viewvaccination/Viewvaccinecetificate';
import TableViewPrescription from './pages/customer/viewpriscription/TableViewPrescription';
import TableViewvaccine from './pages/customer/viewvaccination/TableViewvaccine';
import AdminAddAppoint from './components/admin/adminaddappointment.js/AdminAddAppoint';
import Admindoctorsheduleview from './pages/admin/adminviewdoctorshedule/Admindoctorsheduleview';
import AdminViewPet from './pages/admin/adminviewpet/AdminViewPet';
import AdminAddPet from './pages/admin/adminaddpet/AdminAddPet';
import Doctor_view_appoint from './pages/docter/viewappointment/Doctor_view_appoint';
import Footer from './pages/home/footer/Footer';
import Doctor_user_view from './pages/docter/DoctorUserView/Doctor_user_view';
import Doctor_view_pet from './pages/docter/doctorviewpet/Doctor_view_pet';
import Admin_View_Today_Appoint from './pages/admin/admintodayappoint/Admin_View_Today_Appoint';
import TotalAppointview from './pages/docter/docterviewtotalappoint/TotalAppointview';



function App() {
  

  return (
    <div className="App">
      
      <BrowserRouter>
    
      
        <Routes>
          {/* home */}
          <Route path='/' element={<Home/>} />
          <Route path='/services' element={<Servies/>} />
          <Route path='/ourdocters' element={<OurDocters/>} />
          <Route path='/aboutus' element={<Aboutus/>} />
          <Route path='/userregisteration' element={<UserRegister/>} />
          <Route path='/login' element={<Loginpage/>} />



          {/* admin */}
          <Route path='/adminhome' element={<Ahome/>} />
          <Route path='/dash' element={<Ahome/>} />
          <Route path='/schedule' element={<DailyDoctorUpdate/>} />
          <Route path='/admindoctorreg' element={<DoctorReg/>} />  
          <Route path='/addservices' element={<Addservies/>} />
          <Route path='/viewservice' element={<Viewservices/>} />
          <Route path='/adminreguser' element={<Userregs/>} />
          <Route path='/appoints/:id' element={<AdminAddAppoint/>} />
          <Route path='/viewusers' element={<Viewusers/>} />
          <Route path='/viewdoctors' element={<Viewdocter/>} />
          <Route path='/adminviewshedules' element={<Admindoctorsheduleview/>} />
          <Route path='/viewappointment' element={<Viewappointment/>} />
          <Route path='/adminviewpet/:id' element={<AdminViewPet/>} />
          <Route path='/adminaddpet/:id' element={<AdminAddPet/>} />
          <Route path='/adminviewtodayappointment' element={<Admin_View_Today_Appoint/>} />
         
         




         {/* doctor */}
         <Route path='/doctorhome' element={<Doctorhome/>} />
         <Route path='/Dviewappointment' element={<Doctor_view_appoint/>} />
        <Route path='/addpriscription/:id/:pet_id' element={<AddPriscriptions/>} />
        <Route path='/Addvaccinationcetificate/:id/:pet_id' element={<AddVaccinationcertificates/>} />
        <Route path='/doctoruserview' element={<Doctor_user_view/>} />
        <Route path='/doctorpetview/:id' element={<Doctor_view_pet/>} />
        <Route path='/totalappoint' element={<TotalAppointview/>} />
         
         
          {/* customer */}
         
          <Route path='/addpet' element={<AddPets />} />
          <Route path='/viewpet' element={<Viewpet />} />
          <Route path='/viewprescription/:id' element={<Viewpriscription />} />
          <Route path='/appoint' element={<AppointmentRegister />} />
          <Route path='/viewvaccine/:id' element={<Viewvaccinecetificate />} />
          <Route path='/tableview_prescription/:id' element={<TableViewPrescription/>} />
          <Route path='/tableview_vaccine/:id' element={<TableViewvaccine/>} />
        </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
