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
import { mainCategories, subCategories } from "./menu-data";
import CategoryNavMenu from "./CategoryNavMenu";
import WhatsappLogo from "@/components/icons/WhatsappLogo";

type NavbarProps = {
  variant: string;
};

const NavMenu = ({ variant }: NavbarProps) => {
  return (
    <Drawer direction="left">
      <DrawerTrigger className="flex items-center justify-center w-full h-full">
        <HiMenuAlt2 className={`w-8 h-8 ${variant} cursor-pointer`} />
      </DrawerTrigger>
      <DrawerTitle className="invisible absolute">Menu</DrawerTitle>
      <DrawerContent className="bg-accent">
        <div className="flex flex-col gap-4">
          <Tabs
            defaultValue={mainCategories[0]}
            className="w-full flex justify-center items-center"
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
              return (
                <TabsContent
                  key={category}
                  value={category}
                  className="w-full overflow-auto max-h-[calc(100svh-250px)]"
                >
                  <div className="flex flex-col gap-4 w-full">
                    {subCategories[category as keyof typeof subCategories].map(
                      (subCategory, index) => {
                        return (
                          <CategoryNavMenu
                            key={index}
                            collection={subCategory.collection}
                            imgAlt={subCategory.imgAlt}
                            imgSrc={subCategory.imgSrc}
                            slug={subCategory.slug}
                          />
                        );
                      }
                    )}
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
                <WhatsappLogo />
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
