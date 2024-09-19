import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

const ContactSection = () => (
  <ScrollArea className="h-full">
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#c24d2c]">Get in Touch</h2>
        <p className="text-xl mb-6">I'm always open to new opportunities and collaborations.</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors">
            <GithubIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors">
            <LinkedinIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors">
            <MailIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </ScrollArea>
);

export default ContactSection;
