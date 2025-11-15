import { useState } from "react";
import { TrendingDown, ArrowRight, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface SavingsCardProps {
  currentVendor: string;
  currentPrice: number;
  alternativeVendor: string;
  alternativePrice: number;
  yearlySavings: number;
  confidenceScore: number;
  reasoning?: string[];
}

export const SavingsCard = ({
  currentVendor,
  currentPrice,
  alternativeVendor,
  alternativePrice,
  yearlySavings,
  confidenceScore,
  reasoning = [],
}: SavingsCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleSwitch = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-5 hover-lift glass-effect border-2 border-success/30">
        <div className="flex items-center justify-between mb-4">
          <Badge className="gradient-success text-white">
            <Sparkles className="mr-1 h-3 w-3" />
            Smart Savings
          </Badge>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">{confidenceScore}% match</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Current</p>
              <p className="font-semibold text-foreground">{currentVendor}</p>
              <p className="text-lg font-bold text-muted-foreground">${currentPrice}/mo</p>
            </div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm text-success">Better option</p>
              <p className="font-semibold text-foreground">{alternativeVendor}</p>
              <p className="text-lg font-bold text-success">${alternativePrice}/mo</p>
            </div>
          </div>

          <div className="bg-success/10 rounded-xl p-3 border border-success/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-success font-medium">Yearly savings</span>
              <TrendingDown className="h-4 w-4 text-success" />
            </div>
            <p className="text-3xl font-bold text-success animate-count-up">
              ${yearlySavings}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              That's ${Math.round(yearlySavings / 12)} saved per month!
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Confidence score</span>
              <span className="font-medium text-foreground">{confidenceScore}%</span>
            </div>
            <Progress value={confidenceScore} className="h-2" />
          </div>

          {reasoning.length > 0 && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="text-xs">Why this works</span>
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="text-xs text-muted-foreground space-y-1 mt-2 pl-4">
                      {reasoning.map((reason, idx) => (
                        <li key={idx} className="list-disc">{reason}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              className="flex-1 gradient-success text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              onClick={handleSwitch}
            >
              Switch Now 🚀
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Not Interested
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
