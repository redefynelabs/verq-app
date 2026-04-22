import ContainerLayout from "@/containerLayout/ContainerLayout";
import Image from "next/image";

const CARD_GRADIENT = "bg-[linear-gradient(178.5deg,rgba(255,61,0,0.14)_0%,rgba(0,0,0,0.08)_100%)]";

// Skeuomorphism: physical raised surface with rim lighting, depth, and material feel
const CARD =
  `${CARD_GRADIENT} relative rounded-3xl overflow-hidden ` +
  // Outer depth — ambient + contact shadow beneath the card
  "shadow-[0_2px_0px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.7),0_32px_80px_rgba(0,0,0,0.5)," +
  // Rim light — top edge catches the light source
  "inset_0_1.5px_0_rgba(255,255,255,0.18)," +
  // Side rim — left edge subtle highlight
  "inset_1.5px_0_0_rgba(255,255,255,0.06)," +
  // Bottom inner shadow — underside in shade
  "inset_0_-2px_6px_rgba(0,0,0,0.6)," +
  // Orange inner bloom — warm light from the gradient source
  "inset_0_0_40px_rgba(255,61,0,0.04)]";

const FounderGrid = () => {
  return (
    <ContainerLayout className="px-10! py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-family-inter tracking-tighter">

        {/* Card 1 — Collaboration */}
        <div className={`${CARD} flex flex-col justify-end p-8 gap-6 min-h-[550px] border border-white/10`}>
          <div className="absolute -top-[15%] -right-32 h-[500px] w-full rounded-2xl overflow-hidden opacity-80">
            <Image
              src="/about/verq-stone.png"
              alt="Collaboration"
              fill
              className="object-contain object-center rotate-180"
            />
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl text-secondary leading-tighter tracking-tighter">
              Collaboration is Key
            </h2>
            <p className="text-white/60 leading-relaxed max-w-md">
              Verq was built on the belief that successful branding comes from a
              collaborative process. We work closely with our clients, ensuring
              they feel confident and supported at every stage of building their
              brand.
            </p>
          </div>
        </div>

        {/* Card 2 — Not just a Brand */}
        <div className={`${CARD} flex flex-col justify-between min-h-[550px] p-8 gap-6 border border-white/10 overflow-hidden`}>
          <div className="relative z-10 flex flex-col items-end text-right gap-4">
            <h2 className="text-3xl md:text-4xl text-secondary leading-tighter tracking-tighter">
              Not just a Brand
            </h2>
            <p className="text-white/60 leading-relaxed max-w-md">
              A well-designed landing page can communicate much more than a logo
              alone. Identity should thrive in the final output — not just in a
              presentation.
            </p>
          </div>
          <div className="absolute -bottom-[40%] -left-20 h-[600px] w-full rounded-2xl overflow-hidden opacity-80">
            <Image
              src="/about/verq-mobile-mock.png"
              alt="Mobile mockup"
              fill
              className="object-contain object-top"
            />
          </div>
        </div>

        {/* Card 3 — Founder (full width) */}
        <div className={`${CARD} md:col-span-2 h-[550px] flex flex-col md:flex-row border border-white/10 overflow-hidden`}>
          <div className="relative z-10 flex flex-col justify-end p-8 md:p-12 gap-8 flex-1">
            <div className="flex flex-col gap-4">
              <span className="text-white/25 text-xs tracking-[0.2em] uppercase">Founder</span>
              <h2 className="text-5xl text-secondary leading-tighter tracking-tighter">
                JOE DEEPAN
              </h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Verq was built on the belief that successful branding comes from a
              collaborative process. We work closely with our clients, ensuring
              they feel confident and supported at every stage of building their
              brand.
            </p>
          </div>
          <div className="relative w-full md:w-[420px] h-72 md:h-auto shrink-0 translate-x-[56%]">
            <Image
              src="/about/founder-temp.jpg"
              alt="Joe Deepan — Founder"
              fill
              className="object-cover object-top grayscale"
            />
          </div>
          <div className="relative w-full md:w-[420px] h-72 md:h-auto shrink-0">
            <Image
              src="/about/founder-temp.jpg"
              alt="Joe Deepan — Founder"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

      </div>
    </ContainerLayout>
  );
};

export default FounderGrid;
