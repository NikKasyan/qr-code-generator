import { useContext } from "react";
import { TypeContext } from "../container/QrCodeInput";

const useType = () => useContext(TypeContext);

export default useType;
