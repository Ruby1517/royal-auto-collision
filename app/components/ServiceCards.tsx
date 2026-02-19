import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
type Service = {
  title: string;
  desc: string;
  icon: (props: IconProps) => ReactElement;
};

function CollisionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 40l4-11c1-3 4-5 8-5h22c4 0 7 2 8 5l4 11" />
      <path d="M7 40h50v8H7z" />
      <circle cx="18" cy="48" r="4" />
      <circle cx="46" cy="48" r="4" />
      <path d="M20 33h24" />
    </svg>
  );
}

function PaintIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 14h14v34H18z" />
      <path d="M18 24h14M42 18h10v30H42zM42 30h10" />
      <path d="M47 54c2 0 4-2 4-4" />
    </svg>
  );
}

function BumperIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 39c8-10 17-14 31-14h17v12H40c-7 0-10 2-13 6H8z" />
      <path d="M18 34h10M46 34h8M8 43h48" />
    </svg>
  );
}

function HeadlightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 36c6-8 14-12 27-12h21v24H35C22 48 14 44 8 36z" />
      <path d="M36 28v16M43 27v18M50 28v16" />
    </svg>
  );
}

function GlassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 23h44l-4 24H14l-4-24z" />
      <path d="M24 23l2-7h12l2 7M20 47v5h24v-5" />
    </svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M32 10l18 6v12c0 13-8 22-18 26-10-4-18-13-18-26V16l18-6z" />
      <path d="M23 32l6 6 12-12" />
    </svg>
  );
}

const services: Service[] = [
  { title: "Collision Repair", desc: "Structural, body, and cosmetic repairs to OEM specs.", icon: CollisionIcon },
  { title: "Paint & Color Match", desc: "Computer-matched paint in dust-free booths.", icon: PaintIcon },
  { title: "Dent & Bumper Repair", desc: "Paintless dent removal and bumper restoration.", icon: BumperIcon },
  { title: "Headlight Restoration", desc: "Restore clarity and brightness for safety.", icon: HeadlightIcon },
  { title: "Glass Service", desc: "Windshield and glass replacement/repair.", icon: GlassIcon },
  { title: "Insurance Assistance", desc: "We help with estimates and claims.", icon: ShieldIcon },
];

export default function ServiceCards() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Services Built Around You</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="card overflow-hidden border-brand-600/55 p-0">
              <div className="flex h-44 items-center justify-center border-b border-brand-600/50 bg-slate-100/95 text-brand-600">
                <Icon className="h-24 w-24" />
              </div>
              <div className="p-5">
                <div className="text-lg font-semibold text-white">{s.title}</div>
                <p className="text-white/80 mt-2 text-sm">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
