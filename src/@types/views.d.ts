declare interface IHomeProps extends JSX.IntrinsicAttributes {
  onUploadCancel?(): void;
  onUploadClick?(): void;
  onUploadSelect?(imgFile?: File | null): void;
}

declare interface IScanProps extends JSX.IntrinsicAttributes {
}

declare interface IResultsProps extends JSX.IntrinsicAttributes {
  onUploadCancel?(): void;
  onUploadClick?(): void;
  onUploadSelect?(imgFile?: File | null): void;
}
