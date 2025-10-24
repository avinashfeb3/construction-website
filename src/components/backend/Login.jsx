import React from "react";
import Logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if(result.status == false){
    toast.error(result.message, {
      position: "top-center",
    });
  }else{
    
  }
  // console.log(result);
}

  return (
    <>
      <div className="login-wrapper">
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="login-form w-100" style={{ maxWidth: "400px" }}>
            <div className="card border-0 shadow">
              <div className="card-body p-3 mx-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <img
                      src={Logo}
                      alt="Construction Logo"
                      className="img-fluid me-2"
                      style={{ width: "120px", height: "120px" }}
                    />
                    <h4 className="mb-0">Login Here</h4>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      {...register("email", {
                        required: "Email field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter Email.."
                    />
                    {errors.email && (
                      <p className="text-danger mt-2 invalid-feedback">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "Password field is required",
                      })}
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="Enter Password.."
                    />
                    {errors.password && (
                      <p className="text-danger mt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 pt-2 mb-0 pb-2">
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
