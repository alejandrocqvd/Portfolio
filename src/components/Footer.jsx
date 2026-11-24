import { Link } from "next-view-transitions";
import { Clock3, Gamepad2, MapPin, Music2 } from "lucide-react";
import Clock from "@/components/Clock";
import CommandMenu from "@/components/CommandMenu";
import DisplayToggle from "@/components/DisplayToggle";
import { elsewhere, routes } from "@/lib/site";
import { signature, signatureViewBox } from "@/lib/signature";
import { getLocation, getRecentGame, getRecentSong, getWeather } from "@/lib/now";

const LAST_UPDATED = "November 2026";

// ==============================================================================================================
function NowItem({ icon: Icon, label, children }) {
  return (
    <li className="flex min-w-0 items-center gap-2.5">
      <Icon size={14} className="shrink-0 text-muted" aria-hidden />
      <span className="sr-only">{label}: </span>
      <span className="truncate">{children}</span>
    </li>
  );
}

// ==============================================================================================================
async function Now() {
  const [location, weather, game, song] = await Promise.all([
    getLocation(),
    getWeather(),
    getRecentGame(),
    getRecentSong(),
  ]);

  return (
    <ul aria-label="Right now" className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
      <NowItem icon={MapPin} label="Location">
        {location}
        <span className="ml-2 text-muted" title={weather === null ? "Weather not connected yet" : undefined}>
          {weather === null ? "—" : Math.round(weather)}°C
        </span>
      </NowItem>
      <NowItem icon={Clock3} label="Local time">
        <Clock />
      </NowItem>
      <NowItem icon={Gamepad2} label="Recent game">
        {game ?? <span className="text-muted">No recent game</span>}
      </NowItem>
      <NowItem icon={Music2} label="Recent song">
        {song ?? <span className="text-muted">No recent song</span>}
      </NowItem>
    </ul>
  );
}

// ==============================================================================================================
function LinkList({ label, children }) {
  return (
    <ul aria-label={label} className="flex flex-col gap-2 text-sm">
      {children}
    </ul>
  );
}

// ==============================================================================================================
export default function Footer() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-5xl px-6 pb-10 xl:px-0">
      <div className="grid grid-cols-2 gap-10 border-t border-ink/10 pt-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
        <div className="col-span-2 flex flex-col gap-6 md:col-span-1">
          <svg viewBox={signatureViewBox} role="img" aria-label="Alejandro Cardona" className="h-auto w-44 text-ink">
            <path d={signature} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Now />
        </div>

        <LinkList label="Pages">
          {routes.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="link text-muted hover:text-ink">
                {r.label}
              </Link>
            </li>
          ))}
        </LinkList>

        <LinkList label="Elsewhere">
          {elsewhere.map((l) => {
            const external = !l.href.startsWith("mailto:");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="link text-muted hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </LinkList>
      </div>

      <div className="mt-12 flex flex-col justify-between gap-2 text-xs text-muted sm:flex-row">
        <div className="-ml-2 flex items-center gap-1 md:hidden">
          <CommandMenu />
          <DisplayToggle />
        </div>
        <p>© 2026 Alejandro Cardona</p>
        <p>Last updated {LAST_UPDATED}</p>
      </div>
    </footer>
  );
}
