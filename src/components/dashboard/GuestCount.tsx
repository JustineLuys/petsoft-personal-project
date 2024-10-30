"use client";

import { usePetContext } from "@/lib/hooks";

export default function GuestCount() {
  const { petCount } = usePetContext();
  return (
    <section className="text-center mt-5">
      <h3 className="text-2xl font-semibold">{petCount}</h3>
      <p className="text-lg">current guests</p>
    </section>
  );
}
