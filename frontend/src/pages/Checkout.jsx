import { useLocation } from "react-router-dom";

const location = useLocation();
const product = location.state?.product;
