import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>Hello!</div>
      <Outlet />
    </div>
  );
}
