import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <header className="relative mb-10">
      <div className="header absolute top-4 left-0 w-full">
        <div className="logo relative z-50 w-full">
          <Link
            href="/join"
            className="justify-center items-center flex gap-2 w-full"
          >
            <Image
              src="/icons/dxberience_logo.svg"
              alt="Dxberience Logo"
              width={98}
              height={24}
            />
          </Link>
        </div>
      </div>
      <div className="hero absolute max-w-screen w-full h-screen max-h-screen top-0 left-0">
        <Image
          src={"/images/hero-img.jpeg"}
          alt="A lady dressed modestly giving off a luxurious vibe"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      </div>
      <div className="header-content relative z-10 w-full h-full flex flex-col justify-end items-center gap-6 pb-44">
        <div className="text-center font-bold flex justify-center flex-col items-center gap-6">
          <h1 className="text-2xl lg:text-7xl font-ivyPresto">
            Personal Shopping Redefined
          </h1>
          <p className="lg:text-xl font-bold">
            Join our exclusive WhatsApp community for personalized style advice,
            early access to collections, and curated shopping experiences
            tailored just for you.
          </p>
        </div>
        <CustomButton
          isLink
          href="https://chat.whatsapp.com/K30lEpyv7OWAbqK6bfxUBV"
          btnName="Join Now"
        />
      </div>
    </header>
  );
};

export default page;
