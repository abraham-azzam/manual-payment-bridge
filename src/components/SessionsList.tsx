
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PaymentSession } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Clock, CreditCard } from "lucide-react";

export const SessionsList = () => {
  const [sessions, setSessions] = useState<PaymentSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial sessions
    const fetchSessions = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_sessions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setSessions(data || []);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        toast({
          title: "Error fetching sessions",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('payment_sessions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payment_sessions'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSessions(prev => [payload.new as PaymentSession, ...prev].slice(0, 10));
          } else if (payload.eventType === 'UPDATE') {
            setSessions(prev => 
              prev.map(session => 
                session.id === payload.new.id ? payload.new as PaymentSession : session
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setSessions(prev => 
              prev.filter(session => session.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading sessions...</p>;
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground">No sessions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${
              session.status === 'completed' ? 'bg-green-100 text-green-600' :
              session.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
              session.status === 'failed' ? 'bg-red-100 text-red-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">
                {session.amount} {session.currency.toUpperCase()}
              </p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              session.status === 'completed' ? 'bg-green-100 text-green-600' :
              session.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
              session.status === 'failed' ? 'bg-red-100 text-red-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
