import * as changeCase from "change-case";

import { ClipboardIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import MenuButton from "./menu-button";
import { MENU_COLLAPSIBLE_ICON } from "@/constants/menu-collapsible-icon";

interface MenuCollapsibleItemProps {
  slug: string;
  icon: string;
}

const MenuCollapsibleItem = ({ slug, icon }: MenuCollapsibleItemProps) => {
  return (
    <>
      <Accordion type="multiple">
        <AccordionItem value="product-collapse">
          <AccordionTrigger>
            <span className="flex flex-row items-center gap-4">
              {
                MENU_COLLAPSIBLE_ICON[
                  icon as keyof typeof MENU_COLLAPSIBLE_ICON
                ]
              }

              <p>{changeCase.pascalCase(slug)}</p>
            </span>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-3">
            <MenuButton href={`/create/${slug}`} label="Create" icon="create" />

            <MenuButton href={`/find/${slug}`} label="Find" icon="find" />

            <MenuButton href={`/update/${slug}`} label="Update" icon="update" />

            <MenuButton href={`/delete/${slug}`} label="Delete" icon="delete" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default MenuCollapsibleItem;
