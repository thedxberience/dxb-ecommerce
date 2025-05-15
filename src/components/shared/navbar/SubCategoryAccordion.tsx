import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { subCategoryType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

type SubCategoryAccordionProps = {
  name: string;
  subCategories: subCategoryType[];
  alt: string;
  src: string;
};

const SubCategoryAccordion = ({
  name,
  subCategories,
  alt,
  src,
}: SubCategoryAccordionProps) => {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-primary flex justify-between items-center p-3 menu-accordion border-b border-primary rounded-none">
          {name[0].toUpperCase() + name.slice(1)}{" "}
          <div className="image w-[167px] h-[167px]">
            <Image
              alt={alt}
              src={src}
              width={167}
              height={167}
              className="object-cover w-full h-full"
            />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {subCategories.map((cat) => {
              const catName = cat.name.split("-")[0];

              return (
                <li
                  key={cat.id}
                  className="px-6 py-2.5 font-noah text-primary text-sm border-primary border-b"
                  id={cat.id}
                >
                  <Link href={`/collection/${cat.slug}`}>{catName}</Link>
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SubCategoryAccordion;
