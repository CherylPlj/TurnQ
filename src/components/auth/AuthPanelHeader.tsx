import Image from "next/image";

const logoClassName = "h-16 w-16 object-contain sm:h-20 sm:w-20";

export default function AuthPanelHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col items-start gap-2">
        {/* <Image
          src="/turnqLogo.png"
          alt="TurnQ logo"
          width={80}
          height={80}
          className={logoClassName}
          priority
        /> */}
        <p className="text-4xl font-black text-[#4f46e5] sm:text-5xl">
          Turn<span className="text-cyan-400">Q</span>
        </p>
      </div>
      <Image
        src="/kardesia.png"
        alt="Kardesia Solutions, Inc."
        width={200}
        height={80}
        className="h-16 w-auto max-w-[200px] shrink-0 object-contain object-right sm:h-20 sm:max-w-[240px]"
      />
    </div>
  );
}
