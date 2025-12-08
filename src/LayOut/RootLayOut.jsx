import { Outlet } from 'react-router'
import Footer from '../Pages/Shared/Footer/Footer'
import NavBAr from '../Pages/Shared/NavBAr/NavBAr'

const RootLayOut = () => {
  return (
    <div>
      <NavBAr></NavBAr>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default RootLayOut
