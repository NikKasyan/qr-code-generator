import { TextField } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import useDebouncedNavigate from "../../utils/useDebouncedNavigate";
import useQuery from "../../utils/useQuery";
import useType from "../../utils/useType";
import "./QrCodePlainInput.css";
interface Props {
  qrCodeText: String;
  setQrCodeText: (string: any) => void;
}

const QR_CODE_TEXT = "qrCodeText";

const QrCodePlainInput: FC<Props> = ({ qrCodeText, setQrCodeText }) => {
  const query = useQuery();
  const navigateTo = useDebouncedNavigate();
  const type = useType();
  const changeQrCodeText = useCallback(
    (value: string) => {
      setQrCodeText(value);
      navigateTo(`/${type}?${QR_CODE_TEXT}=${value}`);
    },
    [setQrCodeText, navigateTo, type]
  );
  useEffect(() => {
    if (query[QR_CODE_TEXT]) {
      changeQrCodeText(query[QR_CODE_TEXT]);
    }
  }, [query, changeQrCodeText]);

  const handleChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      changeQrCodeText(value);
    },
    [changeQrCodeText]
  );
  return (
    <div className="plain-text">
      <TextField
        label="QR Code Text"
        value={qrCodeText}
        onChange={handleChange}
      />
    </div>
  );
};

export default QrCodePlainInput;
