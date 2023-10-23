declare module 'react-ui';
declare module 'react-ui/themes/light';
declare module 'qrcode-reader';

declare type Pattern = {
  count: number;
  estimatedModuleSize: number;
  x: number;
  y: number;
  X: number;
  Y: number;
  aboutEquals(moduleSize: number, i: number, j: number): boolean;
  incrementCount(): void;
}

declare interface IQRCodeReaderData {
  error?: Error | string;
  result?: {
    points?: Pattern[];
    result: string;
  };
  imageData?: ImageData;
}
