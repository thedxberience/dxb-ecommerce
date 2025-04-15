"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const [scrolled, setScrolled] = useState(false);
  const [reachedFooter, setReachedFooter] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  const handleDomChecking = useCallback(() => {
    if (document && footerRef.current) {
      const windowScrollHeight = document.documentElement.scrollHeight;
      const footerHeight = footerRef.current.getBoundingClientRect().height;
      const footerOffsetHeight = windowScrollHeight - footerHeight * 2 - 100;
      if (window.scrollY >= footerOffsetHeight) {
        setReachedFooter(true);
      } else {
        setReachedFooter(false);
      }
    }
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      handleDomChecking();
    };
  }, []);

  function openWhatsapp() {
    window.open("https://wa.me/+971585787558", "_blank");
  }

  function toPageTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      ref={footerRef}
      className="footer relative flex flex-col w-full h-[454px] 2xl:h-[526px] bg-bottom bg-cover 2xl:py-5 bg-black/80"
    >
      <div className="w-full flex justify-center z-20">
        <div className="relative w-[223.79px] 2xl:w-[325.52px] h-[80px] pt-[30px]">
          <Link href="/">
            <Image
              src="/footer/dxberience_logo.png"
              alt="logo"
              className="object-cover"
              fill
            />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 bg-[#171010] bg-opacity-90 z-10" />
      <div className="relative z-20 text-white">
        <div className="px-8 flex justify-center">
          <h1 className="py-2 text-2xl font-bold font-IvyPresto text-white text-center">
            No need to think, just experience
          </h1>
        </div>

        <div className="flex justify-center items-center text-sm lg:gap-[80px] border-t-[1px] border-b-[1px] h-[200.01px] 2xl:h-[252.01px] border-white">
          <div className="flex flex-col items-center p-4 gap-5">
            <span>CONTACT US</span>
            <Image
              width={24}
              height={24}
              src="/footer/footer_whatsapp.svg"
              alt="WhatsApp logo"
              onClick={openWhatsapp}
            />
          </div>

          <div className="h-[50px] w-[1px] bg-white bg-opacity-50" />

          <div className="flex flex-col items-center p-4 gap-5">
            <span>FOLLOW US</span>
            <Link
              href="https://www.instagram.com/thedxberience?igsh=MTdyY2k5NTdpZW5kcA=="
              target="_blank"
            >
              <Image
                width={24}
                height={24}
                src="/footer/footer_insta.svg"
                alt="Insta logo"
              />
            </Link>
          </div>
        </div>

        <ul className="flex justify-evenly pt-5 uppercase">
          <li>Terms & Conditions</li>
          <li>Shipping</li>
        </ul>
      </div>
      <div
        className={`flex flex-col fixed right-5 ${
          reachedFooter ? "bottom-60 md:bottom-40" : "bottom-6"
        } md:right-5  gap-5 z-30 md:flex-row`}
      >
        {/* <div className="relative w-10 h-10 lg:w-[50px] lg:h-[50px]">
          <Image
            src="/whatsapp_logo.png"
            alt="whatsapp-logo"
            fill
            className="object-cover"
            onClick={openWhatsapp}
          />
        </div> */}
        {scrolled && (
          <div className="relative w-10 h-10 lg:w-[50px] lg:h-[50px]">
            <Image
              src="/footer/to_page_top.svg"
              alt="scroll-to-top"
              fill
              className="object-cover"
              onClick={toPageTop}
            />
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
