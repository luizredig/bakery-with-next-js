import MenuCollapsibleItem from "./menu-collapsible-item";

const Menu = () => {
  return (
    <>
      <div className="flex flex-col">
        <MenuCollapsibleItem slug="product" icon="cake" />

        <MenuCollapsibleItem slug="category" icon="clipboard" />
      </div>
    </>
  );
};

export default Menu;
