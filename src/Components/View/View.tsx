import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../Loading/Loading";
import css from "./View.module.css";

export default function View() {
  let { id }: any = useParams();
  let { BaseUrl, requestHeaders }: any = useContext(AuthContext);
  const [user, setUser]: any = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  function getUser(): void {
    setLoadingDetails(true);
    axios
      .get(`${BaseUrl}/Users/${id}`, {
        headers: requestHeaders
      })
      .then((res: any) => {
        setLoadingDetails(false);
        setUser(res?.data);
        console.log(res.data);
      })
      .catch((err: any) => {
        setLoadingDetails(false);
        toast.error(err.response.data.message || "faild");
      });
  }
  useEffect(() => {
    getUser();
  }, []);

  // const [show, setShow] = useState(false);
  const handleShow: () => void = () => {
    // setShow(true);
  };
  // const handleClose: () => void = () => setShow(false);



  return (
    <>
      {loadingDetails ? (
        <div
          className={`fs-3 text-success d-flex justify-content-center align-items-center ${css.loadingHeight}`}
        >
          <Loading />
        </div>
      ) : user ? (
        <div className="profile border border-1 py-4 bg-light">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4">
              <div className="profileImage text-center">
                {user.imagePath ? (
                  <img
                    src={`https://upskilling-egypt.com:3003/${user.imagePath}`}
                    className={`w-75 ${css.image}`}
                    alt="profileImage"
                  />
                ) : (
                  "Profile image is not found"
                )}
              </div>
            </div>
            <div className="col-md-8">
              <h4>Name : {user.userName}</h4>
              <hr />
              <h4>Email : {user.email}</h4>
              <hr />
              <h4>Phone Number : {user.phoneNumber}</h4>
              <hr />
              <h4>Role : {user?.group?.name}</h4>
              <hr />
              <h4>Country : {user?.country}</h4>
              <hr />
              <h4>Join Us : {user?.creationDate?.split("T")[0]}</h4>
              <hr />
              <h4 className="acitvated">
                Activated :{" "}
                {user.isActivated ? (
                  <span className="bg-success px-3 py-1 rounded-5 text-white">
                    Active
                  </span>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-5 text-white ${css.noActive}`}
                  >
                    No Active
                  </span>
                )}
              </h4>
              <hr />
              <div className="block text-end">
                <button onClick={handleShow} className="btn btn-outline-dark rounded-5 w-100  py-2">
                  {user.isActivated ? "Block" : "UnBlock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'nodata'
      )}

    </>
  );
}
