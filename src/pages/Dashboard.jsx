import React, { useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("jwt");
    // Redirect to home if user don't have the token
    if (!token) {
      navigate("/");
    }
  }, []);

  return <DashboardWrapper>Dashboard</DashboardWrapper>;
}

export default Dashboard;
