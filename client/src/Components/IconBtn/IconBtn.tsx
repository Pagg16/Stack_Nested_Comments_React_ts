import { IconType } from "react-icons";
import { ReactNode } from "react";

type IconBtn = {
  Icon: IconType;
  isActive?: boolean;
  children?: ReactNode;
  color?: string;
  onClick: () => void;
  disabled?: boolean;
};

export function IconBtn({
  Icon,
  isActive,
  color = "",
  children,
  ...props
}: IconBtn) {
  return (
    <button
      className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${
        color || ""
      }`}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
