"use client";

import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Cart from "./cart";
import Menu from "./menu";
import { Separator } from "./ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const itemsCount = useSelector((state: RootState) => state.cart.itemsCount);

  return (
    <>
      <Card className="flex h-20 w-full flex-row items-center justify-between rounded-none border-l-0 border-t-0 p-5 sm:px-20 lg:px-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SheetHeader className="text-lg font-semibold">Menu</SheetHeader>

            <Separator orientation="horizontal" className="my-3" />

            <Menu />
          </SheetContent>
        </Sheet>

        <div className="flex flex-row gap-2">
          {/* <Button variant={"default"}>Login</Button> */}

          <Sheet>
            <SheetTrigger asChild>
              <Button size={"icon"} variant={"ghost"} className="relative">
                {itemsCount > 0 && (
                  <span className="absolute right-[-6px] top-[-4px] flex h-6 w-6 items-center justify-center rounded-full bg-primary font-semibold text-white">
                    {itemsCount > 9 ? "9+" : itemsCount}
                  </span>
                )}

                <ShoppingCartIcon size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col gap-3">
              <SheetHeader>
                <p className="text-lg font-semibold">Your shopping cart</p>
              </SheetHeader>

              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </Card>
    </>
  );
};

export default Header;
