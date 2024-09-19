import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MenuIcon } from 'lucide-react';

const MenuBubble = ({ scrollToSection }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button 
        className="w-12 h-12 rounded-full fixed top-4 left-4 z-50 bg-[#1a2639] hover:bg-[#3e4a61] transition-all duration-300 border-2 border-[#c24d2c] opacity-85"
        size="icon"
      >
        <MenuIcon className="h-6 w-6 text-[#d9dad7]" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-48 bg-[#1a2639] border-[#c24d2c] text-[#d9dad7]">
      <nav>
        <ul className="space-y-2">
          {['Home', 'About', 'Projects', 'Contact'].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section.toLowerCase())}
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

export default MenuBubble;
