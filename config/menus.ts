import {
  BoltIcon,
  PaperAirplaneIcon,
  Squares2X2Icon,
  UserCircleIcon,
  BookOpenIcon,
  VideoCameraIcon 
} from "@heroicons/react/24/outline";
import { Menu } from "types";

const menus: Menu[] = [
  {
    title: "Home",
    url: "/",
    idx: 1,
    icon: BoltIcon,
  },
  {
    title: "About",
    url: "/about",
    idx: 2,
    icon: UserCircleIcon,
  },
  {
    title: "Blog",
    url: "/blog",
    idx: 3,
    icon: Squares2X2Icon,
  },
  {
    title: "Contact",
    url: "/contact",
    idx: 4,
    icon: PaperAirplaneIcon,
  },
  {
    title: "Books",
    url: "/books",
    idx: 5,
    icon: BookOpenIcon,
  },
  {
    title: "Videos",
    url: "/videos",
    idx: 6,
    icon: VideoCameraIcon,
  },
];

export default menus;