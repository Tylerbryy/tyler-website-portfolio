import { GithubIcon, LinkedInIcon, TwitterIcon } from "@/icons";
import { Footer } from "types";

const footer: Footer = {
  copyright: "2024 Tyler. All rights reserved. No Cookies.",
  socials: [
    {
      name: "Twitter",
      href: "https://twitter.com/tylerbryy",
      icon: TwitterIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/Tylerbryy?tab=repositories",
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/tylergibbss/",
      icon: LinkedInIcon,
    },
  ],
};

export default footer;
