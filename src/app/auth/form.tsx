import { Loader2 } from "lucide-react";

import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthForm({
  title,
  description,
  onSubmit,
  isLoading,
  buttonText,
  children,
  footer,
}: {
  title: string;
  description: string;
  onSubmit: () => void;
  isLoading: boolean;
  buttonText: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 border-b py-8">
        <CardTitle className="text-center text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 bg-gray-50 p-8">
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <Button className="btn-primary w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {buttonText}...
              </>
            ) : (
              buttonText
            )}
          </Button>
        </form>
      </CardContent>
      {footer && <CardFooter className="flex justify-center bg-gray-50">{footer}</CardFooter>}
    </Card>
  );
}
