export enum ErrorCorrectionLevel {
  L = "L",
  M = "M",
  Q = "Q",
  H = "H",
}
export interface QrOptions {
  width: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
}
