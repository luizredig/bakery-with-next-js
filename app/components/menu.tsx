import { HomeIcon } from "lucide-react";
import MenuCollapsibleItem from "./menu-collapsible-item";
import { Button } from "./ui/button";
import Link from "next/link";
import { SheetClose } from "./ui/sheet";

const Menu = () => {
  return (
    <>
      <div className="flex flex-col">
        <SheetClose asChild>
          <Link href={"/"} className="my-4 w-full">
            <Button className="flex w-full flex-row gap-4">
              <HomeIcon size={20} />

              <p>Home</p>
            </Button>
          </Link>
        </SheetClose>

        <MenuCollapsibleItem slug="product" icon="cake" />
      </div>
    </>
  );
};

export default Menu;
