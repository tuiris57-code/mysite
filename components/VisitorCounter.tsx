"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const recorded = sessionStorage.getItem("visitor_recorded");

    if (recorded) {
      fetch("/api/visitor")
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => setCount(0));
    } else {
      fetch("/api/visitor", { method: "POST" })
        .then((r) => r.json())
        .then((d) => {
          setCount(d.count);
          sessionStorage.setItem("visitor_recorded", "1");
        })
        .catch(() => setCount(0));
    }
  }, []);

  return (
    <div className="text-4xl font-bold text-teal font-serif">
      {count !== null ? count : "..."}
    </div>
  );
}
