"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Edmonton",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

// Rendered after mount: the server can't know the visitor's "now", so this avoids a hydration mismatch.
export default function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time dateTime={now?.toISOString()} className="tabular-nums">
      {now ? format.format(now) : "--:--"}
    </time>
  );
}
