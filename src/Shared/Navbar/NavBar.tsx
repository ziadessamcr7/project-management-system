import { useContext } from 'react'

import myLogo from '../../assets/images/3 994372.svg'
import { AuthContext } from '../../Context/AuthContext'

export default function NavBar() {

  const { userData }: any = useContext(AuthContext)
  console.log(userData)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={myLogo} className='100' alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <a className="nav-link active" aria-current="page" href="#">
                <i className='fa fa-user'></i>
              </a>
            </li>
            <li className="nav-item" style={{ fontSize: '14px' }}>
              <a className="nav-link pe-5" href="#">
                <span className='text-dark'> {userData?.userName}
                </span>  <br />
                <span >
                  {userData?.userEmail}
                </span>
              </a>

            </li>
          </ul>

        </div>
      </div>
    </nav>

  )
}
