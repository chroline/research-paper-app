"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";

import { toast } from "@/lib/hooks/use-toast";
import { handleSignIn } from "@/lib/services/auth";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AuthForm } from "@/app/auth/form";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const res = await handleSignIn(values.email, values.password);

      if (res.success) router.push("/");

      if (!res.success) {
        switch (res.error) {
          case "CredentialsSignin":
            toast({
              variant: "destructive",
              title: "Invalid email and/or password.",
            });
            break;
          default:
            console.error(res.error);
            toast({
              variant: "destructive",
              title: "Unknown error occurred.",
              description: "Please try again later.",
            });
            break;
        }
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  const loginFooter = (
    <div className="text-sm text-muted-foreground">
      <span className="mr-1">Don&#39;t have an account?</span>
      <Link href={"/auth/register"} className={cn(buttonVariants({ variant: "link" }), "p-0")}>
        Sign up
      </Link>
    </div>
  );

  return (
    <AuthForm
      title="Sign In"
      description="Enter your credentials to access your account."
      onSubmit={form.handleSubmit(handleSubmit)}
      isLoading={isLoading}
      buttonText="Sign in"
      footer={loginFooter}
    >
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Button variant="link" className="h-auto p-0 font-normal" size="sm">
                    Forgot password?
                  </Button>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type={showPassword ? "text" : "password"} autoComplete="current-password" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </AuthForm>
  );
}
