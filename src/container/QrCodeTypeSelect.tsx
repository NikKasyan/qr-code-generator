import { MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { QrCodeType } from "../globals";
import "./QrCodeTypeSelect.css";

interface Props {
  value: QrCodeType;
  onSelect: (event: any) => void;
}

const QrCodeTypeSelect: FC<Props> = ({ value, onSelect }) => {
  return (
    <Select onChange={onSelect} value={value}>
      {Object.keys(QrCodeType).map((val, index) => (
        <MenuItem key={index} value={val}>
          {val}
        </MenuItem>
      ))}
    </Select>
  );
};
export default QrCodeTypeSelect;
