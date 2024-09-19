import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

const ContactSection = () => (
  <ScrollArea className="h-full">
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="max-w-4xl w-full bg-[#1a2639] bg-opacity-80 border-2 border-[#c24d2c] shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-[#c24d2c]">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-6 text-center text-[#d9dad7]">I'm always open to new opportunities and collaborations.</p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors"
              onClick={() => window.open('https://github.com/mslanden/mslanden.github.io', '_blank')}
            >
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors"
              onClick={() => window.open('https://www.linkedin.com/in/marcelino-landen-52890728a', '_blank')}
            >
              <LinkedinIcon className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors"
              onClick={() => window.location.href = 'mailto:landenmsjd@gmail.com'}
            >
              <MailIcon className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </ScrollArea>
);

export default ContactSection;
