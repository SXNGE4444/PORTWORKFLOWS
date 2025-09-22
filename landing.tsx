import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Anchor, LogIn, ShieldCheck } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center p-4">
      {/* Ship harbor background with morning mist and industrial cranes */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-card/95 backdrop-blur-sm shadow-2xl border border-border/50">
          <CardContent className="pt-8">
            {/* Logo and branding */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Anchor className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">PortOps</h1>
              <p className="text-muted-foreground">Harbor & Port Operations Management</p>
            </div>
            
            {/* Login button */}
            <Button 
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 mb-4"
              data-testid="button-login"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In to PortOps
            </Button>
            
            {/* ID Verification notice */}
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">ID Verification Required</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All users must complete employment verification before accessing port systems.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
