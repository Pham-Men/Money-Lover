import React from 'react';

const ChangePassword = () => {
    return (
      <section className="sign-up mt-5">
        <div className="container mt-5 d-flex justify-content-around align-items-center">
          <div className="d-flex flex-column  justify-content-between align-items-center">
            <h1 className="text-center">Change password</h1>
            <div className="mt-5 w-50">
              
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Current Password"
                    />
                  </div>
                  
                  <div className=" my-3 col-md-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="New password"
                    />
                  </div>
                  <div className=" my-3 col-md-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className=" my-3 col-md-12">
                    <a href="" className="btn w-100 btn-block bg-success">
                      Register
                    </a>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      </section>
    );

}

export default ChangePassword;
