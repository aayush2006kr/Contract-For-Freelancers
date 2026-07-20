import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  console.log(user);
  console.log(isAuthenticated);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user?.name}</h2>
    </div>
  );
};

export default Dashboard;