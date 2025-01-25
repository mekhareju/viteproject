import React from "react";
import { Navigate } from "react-router-dom";
import { useAbility } from "./casl/AbilityContext";
import { Actions, Subjects } from "./casl/AbilityContext"; // Import Subjects

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  action: Actions; 
  subject: Subjects; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  action,
  subject,
}) => {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  const ability = useAbility();

  console.log("Token:", token); 
  console.log("Role:", role);
  console.log("Ability Check:", ability.can(action, subject));
  // Check if the user's role and ability permit the action on the subject
  if (!token || !allowedRoles.includes(role || "") || !ability.can(action, subject)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
