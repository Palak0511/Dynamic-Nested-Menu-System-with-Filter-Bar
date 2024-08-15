import React, { useState } from "react";
import { Menu, Input, Radio } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./MenuBar.css";

const { SubMenu } = Menu;

const MenuBar = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    if (selectedCategory === newCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(newCategory);
    }
  };

  const renderCategoryRadioButtons = () => {
    return (
      <Radio.Group
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="men">Men</Radio.Button>
        <Radio.Button value="women">Women</Radio.Button>
        <Radio.Button value="kids">Kids</Radio.Button>
      </Radio.Group>
    );
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return <Menu.Item key={item.path}>{item.title}</Menu.Item>;
      }
    });
  };

  const filteredMenuItems = (items, searchText, parentPath = "") => {
    return items.reduce((filteredItems, item) => {
      const currentPath = `${parentPath}.${item.key}`.replace(/^\./, "");
      const includesSearchText = item.title.toLowerCase().includes(searchText.toLowerCase());
  
      if (includesSearchText || item.children) {
        const newItem = { ...item, path: currentPath };
  
        if (item.children) {
          const filteredChildren = filteredMenuItems(item.children, searchText, currentPath);
          if (filteredChildren.length > 0) {
            newItem.children = filteredChildren;
            filteredItems.push(newItem);
          }
        } else {
          filteredItems.push(newItem);
        }
      }
  
      return filteredItems;
    }, []);
  };
  

  const filteredMenu = filteredMenuItems(menuData, searchText);

  return (
    <div className="menu-bar">
      <Input.Search
        placeholder="Search menus"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {renderCategoryRadioButtons()}
      <Menu mode="inline" theme="dark" defaultOpenKeys={["home"]} defaultSelectedKeys={["home"]}>
        <SubMenu key="home" title="Home" icon={<HomeOutlined />}>
          {renderMenuItems(filteredMenu)}
        </SubMenu>
      </Menu>
    </div>
  );
};


const menuData = [
  {
    key: "clothes",
    title: "Clothes",
    children: [
      {
        key: "topwear",
        title: "Topwear",
        children: [
          { key: "shirts", title: "Shirts" },
          { key: "tshirts", title: "T-Shirts" },
          { key: "jackets", title: "Jackets" },
          { key: "hoodies", title: "Hoodies" },
          { key: "sweaters", title: "Sweaters" },
        ],
      },
      {
        key: "bottomwear",
        title: "Bottomwear",
        children: [
          { key: "jeans", title: "Jeans" },
          { key: "pants", title: "Pants" },
          { key: "trousers", title: "Trousers" },
          { key: "skirts", title: "Skirts" },
          { key: "shorts", title: "Shorts" },
        ],
      },
      {
        key: "indianFestiveWear",
        title: "Indian & Festive Wear",
      },
      {
        key: "innerwearSleepwear",
        title: "Innerwear & Sleepwear",
      },
      {
        key: "westernWear",
        title: "Western Wear",
      },
    ],
  },
  {
    key: "homeDecor",
    title: "Home Decor",
    children: [
      {
        key: "bedLinenFurnishing",
        title: "Bed Linen & Furnishing",
        children: [
          { key: "furniture", title: "Furniture" },
          { key: "beds", title: "Beds" },
          { key: "sofas", title: "Sofas" },
        ],
      },
      {
        key: "lampsLighting",
        title: "Lamps & Lighting",
        children: [
          { key: "ceilingLamps", title: "Ceiling Lamps" },
          { key: "tableLamps", title: "Table Lamps" },
          { key: "wallLamps", title: "Wall Lamps" },
        ],
      },
      {
        key: "flooring",
        title: "Flooring",
        children: [
          { key: "carpets", title: "Carpets" },
          { key: "rugs", title: "Rugs" },
          { key: "mats", title: "Mats" },
        ],
      },
      {
        key: "curtains",
        title: "Curtains",
        children: [
          { key: "windowCurtains", title: "Window Curtains" },
          { key: "doorCurtains", title: "Door Curtains" },
          { key: "shades", title: "Shades" },
        ],
      },
      {
        key: "decorations",
        title: "Decorations",
        children: [
          { key: "wallDecor", title: "Wall Decor" },
          { key: "ornaments", title: "Ornaments" },
          { key: "vases", title: "Vases" },
        ],
      },
    ],
  },
  {
    key: "beautySkincare",
    title: "Beauty and Skincare",
    children: [
      {
        key: "makeup",
        title: "Makeup",
        children: [
          { key: "faceMakeup", title: "Face Makeup" },
          { key: "eyeMakeup", title: "Eye" },
          { key: "lipMakeup", title: "Lips" },
        ],
      },
      {
        key: "toolsAccessories",
        title: "Tools & Accessories",
      },
      {
        key: "skincareBathBody",
        title: "Skincare, Bath & Body",
        children: [
          { key: "cleansers", title: "Cleansers" },
          { key: "moisturizers", title: "Moisturizers" },
          { key: "serums", title: "Serums" },
        ],
      },
      {
        key: "skincareTools",
        title: "Skincare Tools",
      },
      {
        key: "haircare",
        title: "Haircare",
        children: [
          { key: "shampoo", title: "Shampoo" },
          { key: "conditioner", title: "Conditioner" },
          { key: "stylingProducts", title: "Styling Products" },
        ],
      },
      {
        key: "fragrances",
        title: "Fragrances",
        children: [
          { key: "perfumes", title: "Perfumes" },
          { key: "deodorants", title: "Deodorants" },
        ],
      },
      {
        key: "appliances",
        title: "Appliances",
        children: [
          { key: "hairAppliances", title: "Hair Appliances" },
          { key: "skinAppliances", title: "Skin Appliances" },
        ],
      },
    ],
  },
  {
    key: "accessories",
    title: "Accessories",
    children: [
      { key: "bags", title: "Bags" },
      { key: "jewelry", title: "Jewelry" },
      { key: "hatsBeltsScarves", title: "Hats, Belts & Scarves" },
      { key: "watches", title: "Watches" },
    ],
  },
  {
    key: "shoesFootwear",
    title: "Shoes and Footwear",
    children: [
      { key: "sneakers", title: "Sneakers" },
      { key: "boots", title: "Boots" },
      { key: "sandals", title: "Sandals" },
      { key: "sportsWear", title: "Sports Wear" },
      { key: "heels", title: "Heels" },
    ],
  },
];

export default MenuBar;
