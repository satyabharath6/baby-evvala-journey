import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({
  children,
  className = "",
}: Props) {
  return (
    <div className={`elevated-card ${className}`}>
      {children}
    </div>
  );
}
