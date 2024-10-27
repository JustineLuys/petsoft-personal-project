import React from "react";
import Branding from "./Branding";
import GuestCount from "./GuestCount";

export default async function DashboardHeader() {
  return (
    <section className="flex justify-between">
      <Branding />
      <GuestCount />
    </section>
  );
}
