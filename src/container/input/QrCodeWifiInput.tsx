import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useDebouncedNavigate from "../../utils/useDebouncedNavigate";
import useQuery from "../../utils/useQuery";
import useType from "../../utils/useType";
import "./QrCodeWifiInput.css";

interface Props {
  setQrCodeText: (value: any) => void;
}

const WIFI_NAME = "wifiname";
const PASSWORD = "password";

const error = (isError: boolean, errorMessage: string) => {
  return {
    error: isError,
    helperText: isError ? errorMessage : undefined,
  };
};

const QrCodeWifiInput: FC<Props> = ({ setQrCodeText }) => {
  const query = useQuery();
  const [wifiName, setWifiName] = useState(query[WIFI_NAME] ?? "");
  const [password, setPassword] = useState(query[PASSWORD] ?? "");

  const navigateTo = useDebouncedNavigate();
  const type = useType();

  const wifiError = error(
    !wifiName || wifiName.length === 0,
    "Wifi name must be set"
  );

  const handleWifiChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      setWifiName(value);
      navigateTo(`/${type}?${WIFI_NAME}=${value}&${PASSWORD}=${password}`);
    },
    [setWifiName, password, navigateTo, type]
  );

  const handlePasswordChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      setPassword(value);
      navigateTo(`/${type}?${WIFI_NAME}=${wifiName}&${PASSWORD}=${value}`);
    },
    [setPassword, wifiName, navigateTo, type]
  );

  useEffect(() => {
    if (
      wifiName &&
      wifiName.length !== 0 &&
      password &&
      password.length !== 0
    ) {
      const qrCodeText = `WIFI:T:WPA2;S:${wifiName};P:${password};;`;
      setQrCodeText(qrCodeText);
    }
  }, [wifiName, password, setQrCodeText]);
  return (
    <div className="wifi-input">
      <TextField
        autoComplete="none"
        label={"Wifi Name (SSID)"}
        value={wifiName}
        onChange={handleWifiChange}
        {...wifiError}
      />
      <WifiPasswordField
        password={password}
        handlePasswordChange={handlePasswordChange}
      />
    </div>
  );
};

interface WifiPasswordFieldProps {
  password: string;
  handlePasswordChange: (event: any) => void;
}
const WifiPasswordField: FC<WifiPasswordFieldProps> = ({
  password,
  handlePasswordChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword, setShowPassword]);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const passwordError = error(
    !password || password.length === 0,
    "Password must be set"
  );

  return (
    <TextField
      label={"Wifi Password"}
      value={password}
      onChange={handlePasswordChange}
      type={showPassword ? "text" : "password"}
      autoComplete="new-password"
      {...passwordError}
      InputProps={{
        autoComplete: "new-password",
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default QrCodeWifiInput;
