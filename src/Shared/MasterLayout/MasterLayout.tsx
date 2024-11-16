import SideBar from '../SideBar/SideBar'
import NavBar from '../Navbar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
    return (
        <>

            <div className="container-fluid">
                <div className="d-flex">
                    <div style={{ backgroundColor: '#0E382F' }}>
                        <div className=''>
                            <SideBar />
                        </div>
                    </div>
                    <div className="w-100 px-3" style={{ backgroundColor: '#F5F5F5' }}>
                        <div className='bg-info'>
                            <NavBar />
                        </div>
                        <div className="content-container">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
