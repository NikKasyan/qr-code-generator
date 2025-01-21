import { FC, useEffect, useRef } from "react";
import * as QrCode from "qrcode"
import "./QrCodeCanvasImage.css";
import { ImageProps } from "./QrCodeImage";
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
  }, [canvasRef, text, updateDownloadContent]);

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
