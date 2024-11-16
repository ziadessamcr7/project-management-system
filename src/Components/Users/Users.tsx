import { useContext, useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import css from "./Users.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

export default function Users() {
  const [usersList, setUsersList] = useState([]);
  // const [id, setId] = useState(0);
  const [srchValue, setSrchValue] = useState(null);
  const [filterRole, setFilterRole] = useState(null);
  // const [show, setShow] = useState(false);
  let { BaseUrl, requestHeaders }: any = useContext(AuthContext);
  const [toltalNumberOfPages, setToltalNumberOfPages] = useState(0);
  // let [CurrentPage, setCurrentPage] = useState(0);

  // const handleShow: (id: number) => void = (id) => {
  //   setShow(true);
  //   setId(id);
  // };

  // const handleClose: () => void = () => setShow(false);


  const getUserList = (pageNum: any, usrName: any, grps: any) => {
    console.log('this is current page', pageNum);
    // console.log('this is userName ', userName);
    // console.log('this is grpus ', groups);

    // setIsLoading(true);
    axios
      .get(`${BaseUrl}/Users/`, {
        headers: requestHeaders,
        params: {
          pageSize: 5,
          pageNumber: pageNum,
          userName: usrName,
          groups: grps
        },
      })
      .then((res: any) => {
        // console.log(res);

        // setIsLoading(false);
        setUsersList(res?.data?.data);
        setToltalNumberOfPages(res?.data?.totalNumberOfPages);

      })
      .catch((err: any) => {
        // setIsLoading(false);
        toast.error(err?.response?.data?.message);
      });
  }


  function searchValue(e: any) {
    setSrchValue(e.target.value);
    getUserList(1, e.target.value, filterRole);
  }
  function FilterByRole(e: any) {
    setFilterRole(e.target.value);
    getUserList(1, srchValue, e.target.value)
  }



  let handlPageChange = (data: any) => {
    // console.log(data.selected + 1);

    let currentPage = data.selected + 1

    getUserList(currentPage, srchValue, filterRole)

  }


  useEffect(() => {
    getUserList(1, null, null);
    console.log('hello in repeatttttttttt');

  }, []);


  return (
    <>
      <div className="header" style={{ paddingTop: '80px' }}>
        <h4 className="ps-3 py-3 bg-white">Users</h4>
      </div>

      <div className="bg-light p-3">
        <div className="content bg-white rounded-3">
          <div className="searchAndFilter ">
            <div className="input-group mb-3 px-3 pt-3 w-50">
              <div className="w-75">
                <input
                  onChange={searchValue}
                  type="text"
                  className="form-control rounded-5 me-1"
                  placeholder="Search Fleets"
                />
              </div>
              <div className="w-25">
                <select onChange={FilterByRole} className="form-select ms-1 rounded-5">
                  <option value="2">Filter</option>
                  <option value="1">Manager</option>
                  <option value="2">Employee</option>
                </select>
              </div>
            </div>
          </div>
          {usersList.length == 0 ? (
            <div
              className={`text-center fs-1 text-success d-flex  justify-content-center align-items-center bg-light ${css.loadingHieght}`}
            >
              <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass="mt-5"
                colors={['#E39B1A', '#E39B1A']}
              />
            </div>
          ) : usersList?.length > 0 ? (
            <div className="table-responsive">
              <Table striped hover>
                <thead className="text-center">
                  <tr>
                    <th>User Name</th>
                    <th>Statues</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {usersList?.map((user: any, idx: number) => (
                    <tr key={idx}>
                      <td>{user.userName}</td>
                      <td>
                        {user.isActivated ? (
                          <span className="bg-success px-3 py-1 rounded-5 text-white">
                            Active
                          </span>
                        ) : (
                          <span
                            className={`px-3 py-1 bg-danger rounded-5 text-white ${css.noActive}`}
                          >
                            Not Active
                          </span>
                        )}
                      </td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.creationDate?.split("T")[0]}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant=""></Dropdown.Toggle>
                          <Dropdown.Menu>
                            {/* <Dropdown.Item onClick={() => handleShow(user.id)}>
                              <i className="fa-solid fa-pen-fancy"></i> Block
                            </Dropdown.Item> */}

                            <Link className=" ps-3 pe-5 text-decoration-none text-dark w-100" to={`/dashboard/user-details/${user.id}`}>
                              <i className="fa-regular fa-eye"></i> View
                            </Link>

                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ReactPaginate
                breakLabel={'...'}
                pageCount={toltalNumberOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlPageChange}
                containerClassName='pagination justify-content-end'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='active'
              />
            </div>

          ) : (
            'NO DATA'
          )}
        </div>
      </div>



    </>
  );
}
