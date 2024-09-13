import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import ChessGame from '../components/ChessGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Your Name</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#about" className="text-gray-600 hover:text-gray-800">About</a></li>
              <li><a href="#projects" className="text-gray-600 hover:text-gray-800">Projects</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
          <p className="text-xl mb-8">I'm a passionate developer creating amazing web experiences</p>
          <Button variant="secondary" size="lg">View My Work</Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <img src="/placeholder.svg" alt="Your Name" className="w-64 h-64 rounded-full mb-8 md:mb-0 md:mr-8" />
            <div className="max-w-md">
              <p className="text-gray-700 mb-4">
                Hello! I'm a web developer with a passion for creating beautiful and functional websites. 
                I specialize in React, Node.js, and modern web technologies.
              </p>
              <p className="text-gray-700">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or enjoying the great outdoors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Chess Game</h3>
                <p className="text-gray-600 mb-4">A simple chess game built with React.</p>
                <ChessGame />
              </CardContent>
            </Card>
            {[1, 2].map((project) => (
              <Card key={project}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Project {project}</h3>
                  <p className="text-gray-600 mb-4">A brief description of the project and its key features.</p>
                  <Button variant="outline">View Project</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl mb-8">I'm always open to new opportunities and collaborations.</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon">
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <LinkedinIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <MailIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;