import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import { CakeIcon } from "lucide-react";
import MenuButton from "./menu-button";

const Menu = () => {
  return (
    <>
      <div>
        <Accordion type="multiple">
          <AccordionItem value="product-collapse">
            <AccordionTrigger>
              <span className="flex flex-row gap-4">
                <CakeIcon />

                <p>Product</p>
              </span>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-3">
              <MenuButton href="" label="Create" icon="create" />

              <MenuButton href="" label="Find" icon="find" />

              <MenuButton href="" label="Update" icon="update" />

              <MenuButton href="" label="Delete" icon="delete" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Menu;
