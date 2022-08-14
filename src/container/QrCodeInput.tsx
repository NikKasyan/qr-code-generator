import { createContext, FC, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QrCodeType } from "../globals";
import QrCodePlainInput from "./input/QrCodePlainInput";
import QrCodeWifiInput from "./input/QrCodeWifiInput";
import "./QrCodeInput.css";
import QrCodeTypeSelect from "./QrCodeTypeSelect";
interface Props {
  qrCodeText: String;
  setQrCodeText: (name: any) => void;
}

export const TypeContext = createContext(QrCodeType.PLAIN);

const QrCodeComponents = {
  [QrCodeType.PLAIN]: QrCodePlainInput,
  [QrCodeType.WIFI]: QrCodeWifiInput,
};

const QrCodeInput: FC<Props> = ({ ...props }) => {
  const params = useParams();
  let initialType = params.type ?? QrCodeType.PLAIN;
  if (!Object.keys(QrCodeType).includes(initialType)) {
    initialType = QrCodeType.PLAIN;
  }

  const [type, setType] = useState<QrCodeType>(initialType as QrCodeType);
  const Component = useMemo(() => QrCodeComponents[type], [type]);
  const navigateTo = useNavigate();
  const handleSelect = (event: any) => {
    setType(event.target.value);
    navigateTo(`/${event.target.value}`);
    props.setQrCodeText("");
  };

  return (
    <>
      <div className="input">
        <TypeContext.Provider value={type}>
          <Component {...props} />

          <QrCodeTypeSelect value={type} onSelect={handleSelect} />
        </TypeContext.Provider>
      </div>
    </>
  );
};
export default QrCodeInput;
