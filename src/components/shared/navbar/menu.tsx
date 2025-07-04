"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HiMenuAlt2 } from "react-icons/hi";
import { mainCategories } from "./menu-data";
import WhatsappLogo from "@/components/icons/WhatsappLogo";
import { getAllSanityCategories } from "@/server/sanity/categories/category";
import { useEffect, useState } from "react";
import { sanityCategory } from "@/utils/types";
import SubCategoryAccordion from "./SubCategoryAccordion";

type NavbarProps = {
  variant: string;
};

const NavMenu = ({ variant }: NavbarProps) => {
  const [categoryData, setCategoryData] =
    useState<Record<string, sanityCategory[]>>();

  const filterCategoriesByTargetAudience = (
    targetAudience: string,
    category: sanityCategory[]
  ) => {
    // console.log("Cat not filtered", category);

    const filteredCategories: sanityCategory[] = [];

    for (let i = 0; i <= category.length - 1; i++) {
      const cat = { ...category[i] };

      // filter subcategories by target audience
      const filteredSubcategories = cat.subCategories.filter(
        (c) => c.targetAudience === targetAudience
      );

      if (filteredSubcategories.length > 0) {
        cat.subCategories = filteredSubcategories;
        filteredCategories.push(cat);
      }
    }

    // console.log("Filtered Categories: ", filteredCategories);

    return filteredCategories;
  };

  const getTargetAudienceCategory = async () => {
    const {
      data: targetAudienceCategories,
      error: fetchTargetAudienceCategoryErr,
    } = await getAllSanityCategories();

    if (fetchTargetAudienceCategoryErr) {
      // console.error(
      //   "Error fetching target audience products from Sanity:",
      //   fetchTargetAudienceCategoryErr
      // );
      return [];
    }

    if (!targetAudienceCategories) return [];

    const menCategories = filterCategoriesByTargetAudience(
      "men",
      targetAudienceCategories
    );
    const womenCategories = filterCategoriesByTargetAudience(
      "women",
      targetAudienceCategories
    );

    // console.log(targetAudienceCategories, menCategories, womenCategories);

    const categoryPayload = {
      men: menCategories,
      women: womenCategories,
    };

    setCategoryData(categoryPayload);
  };

  useEffect(() => {
    getTargetAudienceCategory();
  }, []);

  return (
    <Drawer direction="left">
      <DrawerTrigger className="flex items-center justify-center w-full h-full">
        <HiMenuAlt2 className={`w-8 h-8 ${variant} cursor-pointer`} />
      </DrawerTrigger>
      <DrawerTitle className="invisible absolute">Menu</DrawerTitle>
      <DrawerContent className="bg-accent">
        <div className="flex flex-col gap-4 h-full">
          <Tabs
            defaultValue={mainCategories[0]}
            className="w-full flex justify-center items-center h-full"
          >
            <TabsList className="flex justify-center items-center gap-4 w-full bg-white pb-0">
              {mainCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="w-full font-bold text-lg uppercase bg-transparent text-center data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none rounded-none"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {mainCategories.map((category) => {
              // Fetch target audience categories
              return (
                <TabsContent
                  key={category}
                  value={category}
                  className="w-full overflow-auto h-full max-h-[calc(100svh-250px)]"
                >
                  <div className="flex flex-col gap-4 w-full">
                    {categoryData &&
                      categoryData[category] &&
                      categoryData[category].map((subCategory, index) => {
                        const isMenCategory = category === "men";
                        const { alt, src } =
                          categoryData[category][index].categoryImages[
                            isMenCategory ? 1 : 0
                          ];
                        return (
                          <SubCategoryAccordion
                            key={subCategory.id}
                            name={subCategory.name}
                            alt={alt}
                            src={src}
                            subCategories={subCategory.subCategories}
                          />
                        );
                      })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
          <div className="help bg-white py-2.5">
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-lg text-center text-black">Need Help?</h3>
              <p className="text-sm text-center text-[#646060]">
                Need help, our customer service representative are available
                24/7. You can reach us via email or WhatsApp.
              </p>
              <div className="send-message flex flex-col justify-center items-center gap-1 w-full text-black">
                <h2 className="text-lg text-center">SEND US A MESSAGE</h2>
                <a
                  href="https://wa.me/+971585787558"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo />
                </a>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NavMenu;
