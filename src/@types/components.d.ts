declare interface IBusyIndicator extends JSX.IntrinsicAttributes {
  testId?: string;
  show?: boolean;
}

declare interface IHeaderProps extends JSX.IntrinsicAttributes {
  testId?: string;
  color?: string;
  backgroundColor?: string;
  hideDismissButton?: boolean;
  hideInfoButton?: boolean;
}

declare interface IFooterProps extends JSX.IntrinsicAttributes {
  testId?: string;
  color?: string;
  backgroundColor?: string;
}

declare interface ICopyrightProps extends JSX.IntrinsicAttributes {
  testId?: string;
  color?: string;
  backgroundColor?: string;
}

declare interface IScanDialogProps extends JSX.IntrinsicAttributes {
  testId?: string;
  color?: string;
  backgroundColor?: string;
  children?: ReactElement[];
  isOpen?: boolean;
  onDismiss?(event?: any): void;
}

declare interface IAboutProps extends JSX.IntrinsicAttributes {
  testId?: string;
}

declare interface ILayoutProps extends JSX.IntrinsicAttributes {
  testId?: string;
  header?: IHeaderProps;
  footer?: IFooterProps;
  children?: ReactElement[];
}
