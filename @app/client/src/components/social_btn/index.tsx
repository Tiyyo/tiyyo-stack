import { ReactNode } from "react";

function SocialBtn({
  children,
  value
}: {
  children: ReactNode;
  value?: string;
}) {
  return (
    <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white  py-2 text-sm font-medium text-gray-800 shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
      {children}
      <span className="ml-4">{value}</span>
    </button>
  );
}

export default SocialBtn;
