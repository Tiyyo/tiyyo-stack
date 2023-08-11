export interface IButton {
  type: "submit" | "button";
  isLoading?: boolean;
  children?: React.ReactNode;
  value?: string;
  rest?: any;
}
