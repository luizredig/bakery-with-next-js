import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Cart from "./cart";

const Header = () => {
  return (
    <>
      <Card className="flex h-20 w-full flex-row items-center justify-between rounded-none border-l-0 border-t-0 p-5 sm:px-20 lg:px-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side={"left"}></SheetContent>

          <SheetClose asChild></SheetClose>
        </Sheet>

        <div className="flex flex-row gap-2">
          <Button variant={"default"}>Login</Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <ShoppingCartIcon />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </Card>
    </>
  );
};

export default Header;
