
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { translations } from "@/lib/i18n";
import { SessionCreator } from "@/components/SessionCreator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Settings } from "lucide-react";

export const AdminDashboard = () => {
  const { toast } = useToast();
  const [showConfigs, setShowConfigs] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={() => setShowConfigs(!showConfigs)}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{translations.en.admin.createSession}</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionCreator />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* We'll implement the sessions list in the next step */}
              <p className="text-sm text-muted-foreground">Loading sessions...</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {showConfigs && (
        <Card>
          <CardHeader>
            <CardTitle>Configurations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* We'll implement the configurations management in the next step */}
              <p className="text-sm text-muted-foreground">Loading configurations...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
