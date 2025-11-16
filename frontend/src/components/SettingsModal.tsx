import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Mail, Bell, Calendar, Bot, Download, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useIngestSampleEmails } from "@/hooks/useApi";

export const SettingsModal = () => {
  const [open, setOpen] = useState(false);
  const ingestMutation = useIngestSampleEmails();

  const handleIngest = async () => {
    try {
      await ingestMutation.mutateAsync();
    } catch (error) {
      console.error("Ingest failed:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg glass-effect">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-effect">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your BillSense experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Import Data */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-muted-foreground" />
              <Label>Import Sample Data</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Load sample bills for testing and demonstration
            </p>
            <Button 
              onClick={handleIngest}
              disabled={ingestMutation.isPending}
              className="w-full"
            >
              {ingestMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ingesting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Ingest Sample Data
                </>
              )}
            </Button>
            {ingestMutation.isSuccess && (
              <p className="text-sm text-success">✓ Data ingested successfully!</p>
            )}
            {ingestMutation.isError && (
              <p className="text-sm text-destructive">✗ Failed to ingest data</p>
            )}
          </div>
          {/* Email Connection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label>Email Connection</Label>
              </div>
              <Badge className="gradient-success text-white">Connected</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              john.doe@example.com
            </p>
          </div>

          {/* Calendar Connection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Label>Connected Calendar</Label>
              </div>
              <Badge variant="secondary">Google Calendar</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Sync Calendar
            </Button>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <Label>Notification Preferences</Label>
            </div>
            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-bills" className="text-sm">New bills detected</Label>
                <Switch id="new-bills" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-reminders" className="text-sm">Payment reminders</Label>
                <Switch id="payment-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="savings-alerts" className="text-sm">Savings opportunities</Label>
                <Switch id="savings-alerts" defaultChecked />
              </div>
            </div>
          </div>

          {/* Agent Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-muted-foreground" />
              <Label>AI Agent Controls</Label>
            </div>
            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="agent-1" className="text-sm">🔍 Agent 1 - Email Scanner</Label>
                <Switch id="agent-1" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="agent-2" className="text-sm">📅 Agent 2 - Calendar Sync</Label>
                <Switch id="agent-2" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="agent-3" className="text-sm">💡 Agent 3 - Savings Finder</Label>
                <Switch id="agent-3" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
