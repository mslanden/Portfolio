import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ProfileBubble = ({ scrollToSection }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Avatar className="w-20 h-20 fixed top-4 left-4 z-50 cursor-pointer hover:ring-4 hover:ring-[#4a9ff5] transition-all duration-300 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a9ff5] to-[#2c3e50] animate-pulse"></div>
        <AvatarImage src="/marcelino-landen.jpg" alt="Marcelino Landen" className="relative z-10" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
    </PopoverTrigger>
    <PopoverContent className="w-48 bg-[#1a1b3a] border-[#4a9ff5] text-[#e0e1ff]">
      <nav>
        <ul className="space-y-2">
          {['AI Development', 'About', 'Projects', 'Contact'].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section.toLowerCase().replace(' ', '-'))}
                className="w-full text-left px-2 py-1 hover:bg-[#2c3e50] rounded transition-colors"
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
