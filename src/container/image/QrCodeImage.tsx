import { Modal } from "@material-ui/core";
import { FC, useCallback, useState } from "react";
import DownloadImage from "./DownloadImage";
import ImageType from "./ImageType";
import QrCodeCanvasImage from "./QrCodeCanvasImage";
import "./QrCodeImage.css";
import QrCodeSvgImage from "./QrCodeSvgImage";
import { ErrorCorrectionLevel, QrOptions } from "../../utils/QrOptions";

interface Size {
  width?: number;
  height?: number;
}

interface _ImageProps {
  updateDownloadContent: (content: string) => void;
}

interface Props {
  text: string;
  size?: Size;
  qrCodeOptions?: QrOptions;
}

export type ImageProps = _ImageProps & Props;

const defaultOptions = {
  margin: 0,
  width: 500,
  errorCorrectionLevel: ErrorCorrectionLevel.L,
};

const IMAGES = {
  [ImageType.PNG]: QrCodeCanvasImage,
  [ImageType.SVG]: QrCodeSvgImage,
};

const fillOptionsWithDefaults = (qrCodeOptions?: QrOptions): QrOptions => {
  return {
    margin: qrCodeOptions?.margin ?? 0,
    width: (qrCodeOptions?.width ?? 500) + 200,
    errorCorrectionLevel:
      qrCodeOptions?.errorCorrectionLevel ?? ErrorCorrectionLevel.L,
  };
};

const QrCodeImage: FC<Props> = (props) => {
  const { size, qrCodeOptions, text } = props;
  const [imageType, setImageType] = useState(ImageType.PNG);
  const [downloadContent, setDownloadContent] = useState("");
  const Image = IMAGES[imageType];
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className="image" style={{ width: size?.width, height: size?.height }}>
      <Modal open={isOpen} onClose={close}>
        <>
          <div className="modal-body">
            <Image
              {...props}
              qrCodeOptions={fillOptionsWithDefaults(qrCodeOptions)}
              updateDownloadContent={setDownloadContent}
            />
          </div>
          <div className="modal-close" onClick={close}>
            &times;
          </div>
        </>
      </Modal>
      <div
        className="qr-code-image"
        onClick={() => {
          if (text?.length !== 0) open();
        }}
        style={text?.length === 0 ? { cursor: "default" } : {}}
      >
        <Image {...props} updateDownloadContent={setDownloadContent} />
      </div>
      <DownloadImage
        downloadContent={downloadContent}
        imageType={imageType}
        updateImageType={setImageType}
      />
    </div>
  );
};

QrCodeImage.defaultProps = {
  size: { width: 500, height: 500 },
  qrCodeOptions: defaultOptions,
};

export default QrCodeImage;
