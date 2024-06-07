import Link from "next/link";
import { SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { MENU_BUTTON_ICON } from "@/constants/menu-button-icon";

interface MenuButtonProps {
  href: string;
  label: string;
  icon: "create" | "find" | "update" | "delete";
}

const MenuButton = ({ href, label, icon }: MenuButtonProps) => {
  return (
    <SheetClose asChild>
      <Link href={href}>
        <Button variant={"outline"} className="w-full justify-center">
          <div className="flex w-20 flex-row items-center gap-3">
            <span>
              {MENU_BUTTON_ICON[icon as keyof typeof MENU_BUTTON_ICON]}
            </span>

            <p>{label}</p>
          </div>
        </Button>
      </Link>
    </SheetClose>
  );
};

export default MenuButton;
