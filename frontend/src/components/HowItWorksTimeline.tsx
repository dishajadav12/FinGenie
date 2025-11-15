import { Card } from "@/components/ui/card";
import { Mail, ScanSearch, Bell, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Mail,
    emoji: "📧",
    title: "Connect Gmail",
    description: "Quick & secure OAuth connection"
  },
  {
    icon: ScanSearch,
    emoji: "🔍",
    title: "AI Scans Emails",
    description: "Extracts bills automatically"
  },
  {
    icon: Bell,
    emoji: "🔔",
    title: "Get Reminders",
    description: "Never miss a due date"
  },
  {
    icon: DollarSign,
    emoji: "💰",
    title: "Save Money",
    description: "Find better deals instantly"
  }
];

export const HowItWorksTimeline = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="hidden md:flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl mb-4 shadow-lg">
                {step.emoji}
              </div>
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="flex-1 mx-4"
              >
                <div className="h-1 bg-gradient-to-r from-primary to-secondary relative">
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 text-secondary" />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile version - vertical cards */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-4 glass-effect border-2 border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl flex-shrink-0">
                  {step.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </Card>
            
            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowRight className="h-6 w-6 text-primary rotate-90" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
