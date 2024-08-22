import React, { useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useLoaderData, useNavigate } from "react-router-dom";
import Admin from "../components/dashboard/Admin";
import User from "../components/dashboard/User";

const DashboardWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Dashboard() {
  const { user } = useLoaderData();
  console.log(user);

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("jwt");
    // Redirect to home if user don't have the token
    if (!token) {
      navigate("/");
    }
  }, []);
  if (user.isAdmin) {
    return (
      <DashboardWrapper>
        <Admin />
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <User />
    </DashboardWrapper>
  );
}

export default Dashboard;
