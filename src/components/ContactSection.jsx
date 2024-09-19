import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

const ContactSection = () => (
  <ScrollArea className="h-full flex items-center justify-center p-8">
    <div className="max-w-4xl w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#4a9ff5]">Connect Across the Cosmos</h2>
      <p className="text-xl mb-6 text-center text-[#e0e1ff]">Ready to embark on an interstellar collaboration? Let's connect!</p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" className="bg-transparent border-[#4a9ff5] text-[#4a9ff5] hover:bg-[#4a9ff5] hover:text-[#0a0b1e] transition-colors">
          <GithubIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-transparent border-[#4a9ff5] text-[#4a9ff5] hover:bg-[#4a9ff5] hover:text-[#0a0b1e] transition-colors">
          <LinkedinIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-transparent border-[#4a9ff5] text-[#4a9ff5] hover:bg-[#4a9ff5] hover:text-[#0a0b1e] transition-colors">
          <MailIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </ScrollArea>
);

export default ContactSection;
