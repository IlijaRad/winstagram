import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import { LOGIN } from "../constants/routes";

export default function ProtectedRoute({ user }) {
  return user ? <Outlet /> : <Navigate to={LOGIN} />;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
};
