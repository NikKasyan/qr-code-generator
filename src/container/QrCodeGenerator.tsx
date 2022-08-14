import { FC, useState } from "react";
import QrCodeImage from "./image/QrCodeImage";
import QrCodeInput from "./QrCodeInput";
import "./QrCodeGenerator.css";
interface Props {}
const QrCodeGenerator: FC<Props> = (props: Props) => {
  const [qrCodeText, setQrCodeText] = useState("");
  return (
    <div className="container">
      <QrCodeImage text={qrCodeText} />
      <QrCodeInput qrCodeText={qrCodeText} setQrCodeText={setQrCodeText} />
    </div>
  );
};

export default QrCodeGenerator;
