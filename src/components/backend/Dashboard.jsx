import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import AdminLayout from "./AdminLayout";
import { FaCogs, FaProjectDiagram, FaNewspaper } from "react-icons/fa";
import { token, apiUrl } from "../common/http"; // fixed import path

const Dashboard = () => {
  const chartRef = useRef(null);
  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);

  // ✅ Fetch Services API Call
  const fetchServices = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/services`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      console.debug("Fetching services", { url, hasToken: !!authToken });

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("Services response:", result);

      // ✅ Set both data and total count
      setServices(result?.data || []);
      setTotalServices(result?.total_services || 0);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Dynamic dashboard cards
  const dashboardCards = [
    {
      title: "Services",
      value: totalServices, // dynamically show from API
      description: "Total Services",
      icon: <FaCogs className="text-primary fs-2 me-2" />,
      color: "primary",
    },
    {
      title: "Projects",
      value: 8,
      description: "Ongoing Projects",
      icon: <FaProjectDiagram className="text-success fs-2 me-2" />,
      color: "success",
    },
    {
      title: "Articles",
      value: 20,
      description: "Published Articles",
      icon: <FaNewspaper className="text-warning fs-2 me-2" />,
      color: "warning",
    },
  ];

  // Chart example
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
    <AdminLayout>
      <div className="container">
        <h3 className="mb-4 mt-3">Dashboard</h3>

        {/* ✅ Dynamic Cards for Services, Projects, and Articles */}
        <div className="row mb-4">
          {dashboardCards.map((card, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex align-items-center">
                  {card.icon}
                  <div>
                    <h5 className="card-title mb-1">{card.title}</h5>
                    <h2 className={`text-${card.color}`}>{card.value}</h2>
                    <p className="text-muted">{card.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Map Section */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Monthly Sales</h5>
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>

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
    </AdminLayout>
  );
};

export default Dashboard;
