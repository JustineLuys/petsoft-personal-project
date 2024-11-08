"use client";

import { usePetContext } from "@/lib/hooks";

export default function GuestCount() {
  const { petCount } = usePetContext();
  return (
    <section className="text-center mt-5">
      <h2 className="text-2xl font-semibold">{petCount}</h2>
      <p className="text-lg">current guests</p>
    </section>
  );
}
