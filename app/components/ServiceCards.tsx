const services = [
  { title: "Collision Repair", desc: "Structural, body, and cosmetic repairs to OEM specs." },
  { title: "Paint & Color Match", desc: "Computer-matched paint in dust-free booths." },
  { title: "Dent & Bumper Repair", desc: "Paintless dent removal and bumper restoration." },
  { title: "Headlight Restoration", desc: "Restore clarity and brightness for safety." },
  { title: "Glass Service", desc: "Windshield and glass replacement/repair." },
  { title: "Insurance Assistance", desc: "We help with estimates and claims." }
];

export default function ServiceCards(){
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Services Built Around You</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(s => (
          <div key={s.title} className="card p-6">
            <div className="text-xl font-semibold">{s.title}</div>
            <p className="text-white/80 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
