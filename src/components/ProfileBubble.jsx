import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ProfileBubble = ({ scrollToSection }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Avatar className="w-16 h-16 fixed top-4 left-4 z-50 cursor-pointer hover:ring-2 hover:ring-[#c24d2c] transition-all duration-300">
        <AvatarImage src="/marcelino-landen.jpg" alt="Marcelino Landen" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
    </PopoverTrigger>
    <PopoverContent className="w-48 bg-[#1a2639] border-[#c24d2c] text-[#d9dad7]">
      <nav>
        <ul className="space-y-2">
          {['AI Development', 'About', 'Projects', 'Contact'].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section.toLowerCase().replace(' ', '-'))}
                className="w-full text-left px-2 py-1 hover:bg-[#3e4a61] rounded transition-colors"
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </PopoverContent>
  </Popover>
);

export default ProfileBubble;