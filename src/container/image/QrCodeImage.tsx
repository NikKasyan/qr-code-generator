import { Button, Modal } from "@material-ui/core";
import { FC, useCallback, useState } from "react";
import DownloadImage from "./DownloadImage";
import ImageType from "./ImageType";
import QrCodeCanvasImage from "./QrCodeCanvasImage";
import "./QrCodeImage.css";
import QrCodeSvgImage from "./QrCodeSvgImage";

interface Size {
  width?: number;
  height?: number;
}

type QrOptions = typeof defaultOptions;

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
};

const IMAGES = {
  [ImageType.PNG]: QrCodeCanvasImage,
  [ImageType.SVG]: QrCodeSvgImage,
};

const QrCodeImage: FC<Props> = (props) => {
  const { size } = props;
  const [imageType, setImageType] = useState(ImageType.PNG);
  const [downloadContent, setDownloadContent] = useState("");
  const Image = IMAGES[imageType];
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const openFullScreen = () => {
    open();
  };
  return (
    <div className="image" style={{ width: size?.width, height: size?.height }}>
      <Modal open={isOpen} onClose={close}>
        <div className="modal-body" onClick={close}>
          <Image
            {...props}
            qrCodeOptions={{ margin: 0, width: 700 }}
            updateDownloadContent={setDownloadContent}
          />
        </div>
      </Modal>
      <div className="qr-code-image" onClick={openFullScreen}>
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