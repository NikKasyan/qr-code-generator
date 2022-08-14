import { Button, MenuItem, Select } from "@material-ui/core";
import ImageType from "./ImageType";
import "./DownloadImage.css";
import { FC, useCallback } from "react";
import download from "../../utils/download";

interface Props {
  imageType: ImageType;
  updateImageType: (imageType: any) => void;
  downloadContent: string;
}
const DownloadImage: FC<Props> = ({
  imageType,
  downloadContent,
  updateImageType,
}) => {
  const downloadImage = useCallback(() => {
    downloadImg(downloadContent, imageType);
  }, [downloadContent, imageType]);

  return (
    <div className="download-image">
      <Button onClick={downloadImage} className="button">
        Download QrCode as
      </Button>
      <Select
        value={imageType}
        className="select"
        onChange={(event) => updateImageType(event.target.value)}
      >
        {Object.keys(ImageType).map((val, index) => (
          <MenuItem key={index} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

const downloadImg = (content: string, fileType: string) => {
  download("qrcode." + fileType.toLowerCase(), content);
};

export default DownloadImage;
