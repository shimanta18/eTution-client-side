import { Toaster } from "react-hot-toast";
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBAr from '../Pages/Shared/NavBAr/NavBAr';
const RootLayOut = () => {
  return (
    <div>
      <NavBAr></NavBAr>
      <Toaster position="top-right" />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default RootLayOut
