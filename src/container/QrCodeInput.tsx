import { createContext, FC, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QrCodeType } from "../globals";
import { ErrorCorrectionLevel } from "../utils/QrOptions";
import QrCodePlainInput from "./input/QrCodePlainInput";
import QrCodeWifiInput from "./input/QrCodeWifiInput";
import QrCodeErrorCorrectionSelect from "./QrCodeErrorCorrectionSelect";
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

const QrCodeInput: FC<Props> = (props) => {
  const params = useParams();
  let initialType = params.type ?? QrCodeType.PLAIN;
  if (!Object.keys(QrCodeType).includes(initialType)) {
    initialType = QrCodeType.PLAIN;
  }

  const [type, setType] = useState<QrCodeType>(initialType as QrCodeType);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>(ErrorCorrectionLevel.L);
  const QrCodeInputComponent = useMemo(() => QrCodeComponents[type], [type]);
  const navigateTo = useNavigate();
  const handleTypeSelect = (event: any) => {
    setType(event.target.value);
    navigateTo(`/${event.target.value}`);
    props.setQrCodeText("");
  };

  const handleErrorCorrectionLevelSelect = (event: any) => {
    console.log(event.target.value);
    console.log(ErrorCorrectionLevel.L);
    setErrorCorrectionLevel(event.target.value);
  };

  return (
    <>
      <div className="input">
        <TypeContext.Provider value={type}>
          <QrCodeInputComponent {...props} />

          <QrCodeTypeSelect value={type} onSelect={handleTypeSelect} />
          <QrCodeErrorCorrectionSelect
            value={errorCorrectionLevel}
            onSelect={handleErrorCorrectionLevelSelect}
          />
        </TypeContext.Provider>
      </div>
    </>
  );
};
export default QrCodeInput;
