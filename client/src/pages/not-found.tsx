import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function NotFound() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background dark:bg-background">
      <Card className="w-full max-w-md mx-4 border border-border">
        <CardContent className="pt-6 pb-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Did you forget to add the page to the router?
          </p>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="default" 
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
