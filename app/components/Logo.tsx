import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }){
  return (
    <Link href="/" aria-label="Royal Auto Collision home" className={`flex items-center gap-3 ${className}`}>
      <Image src="/royal_auto_collision.png" alt="Royal Auto Collision" width={130} height={10} priority />
    </Link>
  );
}
