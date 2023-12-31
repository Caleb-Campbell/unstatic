"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function CreateANewProject() {
  const [projectCreationStep, setProjectCreationStep] = useState<number>(0);

  const displayCurrentStep = () => {
    switch (projectCreationStep) {
      case 0:
        return (
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Create a new project</h1>
            <p className="text-gray-100">
              Projects are a great way to organize your work
            </p>
            <Button
              className="mt-4 text-primary"
              onClick={() => setProjectCreationStep(1)}
              variant="outline"
            >
              Create a new project
            </Button>
          </div>
        );
      case 1:
        return (
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Name your project</h1>
            <p className="text-gray-100">
              Projects are a great way to organize your work
            </p>
            <Button
              className="mt-4 text-primary"
              onClick={() => setProjectCreationStep(1)}
              variant="outline"
            >
              Create a new project
            </Button>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative rounded-xl border border-primary bg-slate-600 bg-opacity-40 p-10 text-gray-100">
        <Button
          onClick={
            projectCreationStep > 0
              ? () => setProjectCreationStep(projectCreationStep - 1)
              : () => {}
          }
          variant="ghost"
          className="absolute left-1 top-3"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        {displayCurrentStep()}
      </div>
    </div>
  );
}
