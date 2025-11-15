import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Mail, Calendar, TrendingDown, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorksTimeline } from "@/components/HowItWorksTimeline";

const Landing = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  // ============================================
  // GOOGLE OAUTH INTEGRATION POINT
  // Replace this mock with actual Google OAuth
  // Documentation: https://developers.google.com/identity/protocols/oauth2
  // ============================================
  const handleConnectEmail = async () => {
    setIsConnecting(true);
    
    // Mock OAuth flow - replace with real Google OAuth
    setTimeout(() => {
      // Store mock user data
      localStorage.setItem("finginie_user", JSON.stringify({
        name: "Alex Chen",
        email: "alex@gmail.com",
        connected: true
      }));
      
      setIsConnecting(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💡
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-5xl opacity-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          💰
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4 text-4xl opacity-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        >
          📧
        </motion.div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap className="h-10 w-10 text-primary fill-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FinGinie
            </h1>
          </div>
          <Button variant="ghost" className="hidden md:flex">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Zap className="h-24 w-24 md:h-32 md:w-32 text-primary fill-primary animate-glow" />
                <span className="absolute -top-2 -right-2 text-4xl md:text-5xl">💰</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Never Miss a Bill Again 💡
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              AI agents that read your emails, remind you of payments, and find you better deals—automatically.
            </p>
            
            <Button
              size="lg"
              className="gradient-primary text-white text-lg px-8 py-6 h-auto rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-glow"
              onClick={handleConnectEmail}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting to Google...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Connect Your Email
                </>
              )}
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              ✓ Free to start • ✓ No credit card required • ✓ 2 minute setup
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Your Personal Finance Team
            </h3>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Three AI agents working 24/7 to manage your bills
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Mail}
                emoji="📧"
                title="Smart Bill Detection"
                description="Agent 1 scans your inbox and extracts bill details instantly"
                delay={0}
              />
              <FeatureCard
                icon={Calendar}
                emoji="📅"
                title="Never Forget to Pay"
                description="Agent 2 creates calendar reminders and sends timely alerts"
                delay={0.2}
              />
              <FeatureCard
                icon={TrendingDown}
                emoji="💰"
                title="Find Better Deals"
                description="Agent 3 compares your bills with cheaper alternatives—save hundreds"
                delay={0.4}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How It Works
            </h3>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Get started in minutes, save for years
            </p>
            
            <HowItWorksTimeline />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-effect p-12 text-center border-2 border-primary/20">
              <h3 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to Save Money? 💰
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who never miss a bill and save an average of $500/year
              </p>
              <Button
                size="lg"
                className="gradient-primary text-white text-lg px-8 py-6 h-auto rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                onClick={handleConnectEmail}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Built with AI agents at Self-Evolving Agents Hack
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 FinGinie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
