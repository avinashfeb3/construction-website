import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import AdminLayout from "./AdminLayout";
import { FaCogs, FaProjectDiagram, FaNewspaper, FaRegUser } from "react-icons/fa";
import { token, apiUrl } from "../common/http";
import { MdOutlineReviews } from "react-icons/md";

const Dashboard = () => {
  const chartRef = useRef(null);
  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [totalTestimonials, setTotalTestimonials] = useState(0);

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

  // Show total Project count
  const fetchProjects = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/projects`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      console.debug("Fetching projects", { url, hasToken: !!authToken });

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("Services response:", result);

      // ✅ Set both data and total count
      setProjects(result?.data || []);
      setTotalProjects(result?.total_projects || 0);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetch articles on component mount
  const fetchArticles = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/articles`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      console.debug("Fetching articles", { url, hasToken: !!authToken });

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("Services response:", result);

      // ✅ Set both data and total count
      setArticles(result?.data || []);
      setTotalArticles(result?.total_articles || 0);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

    // Fetch testimonials on component mount
  const fetchTestimonials = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/testimonials`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      console.debug("Fetching articles", { url, hasToken: !!authToken });

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("Services response:", result);

      // ✅ Set both data and total count
      setTestimonials(result?.data || []);
      setTotalTestimonials(result?.total_testimonials || 0);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
    fetchProjects();
    fetchArticles();
    fetchTestimonials();
  }, []);

  // ✅ Dynamic dashboard cards
  const dashboardCards = [
    {
      title: "Services",
      value: totalServices,
      description: "Total Services",
      icon: <FaCogs className="text-primary fs-2 me-2" />,
      color: "primary",
    },
    {
      title: "Projects",
      value: totalProjects,
      description: "Total Projects",
      icon: <FaProjectDiagram className="text-success fs-2 me-2" />,
      color: "success",
    },
    {
      title: "Articles",
      value: totalArticles,
      description: "Total Articles",
      icon: <FaNewspaper className="text-warning fs-2 me-2" />,
      color: "warning",
    },
    {
      title: "Testimonials",
      value: totalTestimonials,
      description: "Total Testimonials",
      icon: <MdOutlineReviews className="text-warning fs-2 me-2" />,
      color: "warning",
    },
    {
      title: "Team Members",
      value: totalArticles,
      description: "Total Team Members",
      icon: <FaRegUser className="text-warning fs-2 me-2" />,
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
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
