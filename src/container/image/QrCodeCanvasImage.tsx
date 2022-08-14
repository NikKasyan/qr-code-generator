import { FC, useEffect, useRef } from "react";
import { QrCode } from "../../utils/QrCode";
import { ImageProps } from "./QrCodeImage";
import "./QrCodeCanvasImage.css";
import download from "../../utils/download";
const QrCodeCanvasImage: FC<ImageProps> = ({
  text,
  size,
  qrCodeOptions,
  updateDownloadContent,
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const generateToken = async () => {
      await QrCode.toCanvas(canvasRef.current, text, qrCodeOptions);
    };
    if (text && text.length !== 0) {
      generateToken();
    }
  }, [text, qrCodeOptions]);

  useEffect(() => {
    const getContent = (canvas: HTMLCanvasElement) => {
      return canvas.toDataURL();
    };
    if (canvasRef?.current !== null) {
      updateDownloadContent(getContent(canvasRef.current));
    }
  }, [canvasRef, text]);

  return (
    <canvas
      className="canvasImage"
      width={size?.width}
      height={size?.height}
      ref={canvasRef}
    ></canvas>
  );
};

export default QrCodeCanvasImage;
