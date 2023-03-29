import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCon } from "./context/Context";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

return <div>{children}</div>
}
export default ProtectedRoute;