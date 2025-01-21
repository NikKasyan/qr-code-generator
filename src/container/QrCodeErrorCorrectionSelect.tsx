import { MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { ErrorCorrectionLevel } from "../utils/QrOptions";
import "./QrCodeTypeSelect.css";

interface Props {
  value: ErrorCorrectionLevel;
  onSelect: (event: any) => void;
}

const QrCodeErrorCorrectionSelect: FC<Props> = ({ value, onSelect }) => {
  return (
    <Select onChange={onSelect} value={value}>
      {Object.keys(ErrorCorrectionLevel).map((val, index) => (
        <MenuItem key={index} value={val}>
          {val}
        </MenuItem>
      ))}
    </Select>
  );
};
export default QrCodeErrorCorrectionSelect;
