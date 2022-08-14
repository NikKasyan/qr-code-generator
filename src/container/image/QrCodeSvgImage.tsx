import { FC, useEffect, useState } from "react";
import { QrCode } from "../../utils/QrCode";
import { ImageProps } from "./QrCodeImage";
import { Buffer } from "buffer";
const encodeToBase64 = (string: string) =>
  Buffer.from(string).toString("base64");

const QrCodeSvgImage: FC<ImageProps> = ({
  text,
  size,
  qrCodeOptions,
  updateDownloadContent,
}) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const generateToken = async () => {
      const qrCode = await QrCode.toString(text, qrCodeOptions);
      setImage(encodeToBase64(qrCode));
    };
    if (text && text.length !== 0) {
      generateToken();
    } else {
      setImage("");
    }
  }, [text, qrCodeOptions]);
  const src = `data:image/svg+xml;base64,${image}`;
  useEffect(() => {
    updateDownloadContent(src);
  }, [src, updateDownloadContent]);
  return (
    <img
      alt={text}
      width={qrCodeOptions?.width}
      height={qrCodeOptions?.width}
      src={src}
    />
  );
};
export default QrCodeSvgImage;
