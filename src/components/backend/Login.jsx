import React, { useContext, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
const onSubmit = async (data) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok || result.status === false) {
      // Handle login error (invalid credentials, server error, etc.)
      toast.error(result.message || "Invalid credentials", {
        position: "top-center",
      });
      return;
    }else{
      const userInfo = {
        id: result.id,
        token: result.token,
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      login(userInfo);
    }

    // Successful login: show toast briefly on the login screen then navigate
    toast.success(result.message || "Login successful", {
      position: "top-center",
      autoClose: 300,
    });

    // Wait slightly longer than autoClose then navigate so user sees the toast
    setTimeout(() => {
      // optional: explicitly clear toasts before navigating
      toast.dismiss();
      navigate("/admin/dashboard", { replace: true });
    }, 300);
 
  } catch (error) {
    // Handle network or unexpected errors
    toast.error("Something went wrong. Please try again.", {
      position: "top-center",
    });
    console.error("Login error:", error);
  }
};

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
                    <div style={{ position: "relative" }}>
                      <input
                        {...register("password", {
                          required: "Password field is required",
                        })}
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="password"
                        placeholder="Enter Password.."
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          margin: 0,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {showPassword ? (
                          // eye-off / hide icon (SVG)
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 2l20 20-1.4 1.4L18.6 20C16.9 20.8 14.6 21.5 12 21.5 7.8 21.5 4.2 19 2 15.5 3.3 13 5.7 11 8.5 9.9L4.6 6c-.1.2-.4.6-.6 1.1C2.2 11 5.5 14.5 12 14.5c1.3 0 2.5-.2 3.7-.5l-3.1-3.1c-.6.2-1.2.3-1.8.3-1.9 0-3.5-1.6-3.5-3.5 0-.6.2-1.2.4-1.8L2 2z" />
                          </svg>
                        ) : (
                          // eye / show icon (SVG)
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
                            <circle cx="12" cy="12" r="2.5" />
                          </svg>
                        )}
                      </button>
                    </div>
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
