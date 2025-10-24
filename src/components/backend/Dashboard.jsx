import React, { useEffect, useRef } from "react";
import Layout from "./layout";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Sales",
              data: [12, 19, 14, 18, 20, 24],
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
        },
      });
    }
  }, []);

  return (
    <Layout>
      <div className="container">
        <h3 className="mb-4 mt-3">Dashboard</h3>

        {/* Cards */}
        <div className="row mb-4">
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <h2>1,245</h2>
                <p className="text-success">+5% from last month</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Orders</h5>
                <h2>845</h2>
                <p className="text-danger">-3% from last month</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Revenue</h5>
                <h2>$12,340</h2>
                <p className="text-success">+8% from last month</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Feedback</h5>
                <h2>312</h2>
                <p className="text-warning">New feedbacks today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Monthly Sales</h5>
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Map (Using iframe for simplicity) */}
          <div className="col-lg-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">User Locations</h5>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086902906007!2d-122.41941518468192!3d37.77492977975932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5e4d3a05%3A0x7a92f81d3c8b4f6b!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="User Locations"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
