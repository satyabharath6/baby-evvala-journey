import "./CMSLayout.css";
import type { ReactNode } from "react";
import CMSSidebar from "./CMSSidebar";
import CMSHeader from "./CMSHeader";

type Props = {
  title: string;
  children: ReactNode;
};

export default function CMSLayout({ title, children }: Props) {
  return (
    <div className="cms-layout">
      <CMSSidebar />

      <div className="cms-main">
        <CMSHeader title={title} />

        <main className="cms-content">
          {children}
        </main>
      </div>
    </div>
  );
}
