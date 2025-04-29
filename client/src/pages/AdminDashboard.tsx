import { useState } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { AlertCircle, CheckCircle, Clock, Mail, MessageSquare, User, CalendarClock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface FormSubmission {
  id: number;
  type: string;
  data: Record<string, any>;
  createdAt: string;
  email: string;
  phoneNumber: string;
  viewed: boolean;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const { data: submissions = [], isLoading, refetch } = useQuery<FormSubmission[]>({
    queryKey: ['/api/admin/submissions'],
    queryFn: getQueryFn({ on401: "throw" }),
  });
  
  const markAsViewedMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('PUT', `/api/admin/submissions/${id}/view`);
      return await res.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Marked as viewed",
        description: "This submission has been marked as viewed",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark submission as viewed",
      });
    },
  });
  
  // Filter submissions based on active tab
  const filteredSubmissions = submissions.filter(submission => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !submission.viewed;
    return submission.type === activeTab;
  });
  
  // Count submissions by type
  const unreadCount = submissions.filter(s => !s.viewed).length;
  const contactCount = submissions.filter(s => s.type === "contact").length;
  const quoteCount = submissions.filter(s => s.type === "quote").length;
  const authCount = submissions.filter(s => s.type === "login" || s.type === "signup").length;
  
  const handleMarkAsViewed = (id: number) => {
    markAsViewedMutation.mutate(id);
  };
  
  const getSubmissionIcon = (type: string) => {
    switch (type) {
      case "contact": return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "quote": return <AlertCircle className="h-5 w-5 text-purple-500" />;
      case "login": return <User className="h-5 w-5 text-green-500" />;
      case "signup": return <User className="h-5 w-5 text-teal-500" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading submissions...</p>
      </div>
    );
  }
  
  return (
    <div className="container max-w-7xl mx-auto mt-24 pt-16 pb-10 px-4 sm:px-6">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="all" className="relative">
              All
              <Badge variant="secondary" className="ml-1">{submissions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              <Badge variant="destructive" className="ml-1">{unreadCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="contact" className="relative">
              Contact
              <Badge variant="secondary" className="ml-1">{contactCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="quote" className="relative">
              Quote
              <Badge variant="secondary" className="ml-1">{quoteCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="login" className="relative">
              Auth
              <Badge variant="secondary" className="ml-1">{authCount}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-6">
            {filteredSubmissions.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No form submissions found</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredSubmissions.map((submission) => (
                <Card key={submission.id} className={submission.viewed ? "opacity-80" : "border-blue-400"}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getSubmissionIcon(submission.type)}
                        <CardTitle className="ml-2 text-xl">
                          {submission.type.charAt(0).toUpperCase() + submission.type.slice(1)} Submission
                        </CardTitle>
                        {!submission.viewed && (
                          <Badge variant="default" className="ml-2">New</Badge>
                        )}
                      </div>
                      <CardDescription>
                        <div className="flex items-center text-sm">
                          <CalendarClock className="h-4 w-4 mr-1" />
                          {formatDate(submission.createdAt)}
                        </div>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      {submission.type === "contact" && (
                        <>
                          <p><strong>Name:</strong> {submission.data.name}</p>
                          <p><strong>Email:</strong> {submission.data.email}</p>
                          <p><strong>Subject:</strong> {submission.data.subject}</p>
                          <p><strong>Message:</strong> {submission.data.message}</p>
                        </>
                      )}
                      
                      {submission.type === "quote" && (
                        <>
                          <p><strong>Name:</strong> {submission.data.name || 'N/A'}</p>
                          <p><strong>Email:</strong> {submission.data.email || 'N/A'}</p>
                          <p><strong>Phone:</strong> {submission.data.phone || 'N/A'}</p>
                          <p><strong>Project Type:</strong> {submission.data.projectType || 'N/A'}</p>
                          <p><strong>Budget:</strong> {submission.data.budget || 'N/A'}</p>
                          <p><strong>Timeline:</strong> {submission.data.timeline || 'N/A'}</p>
                          <p><strong>Details:</strong> {submission.data.details || 'N/A'}</p>
                        </>
                      )}
                      
                      {(submission.type === "login" || submission.type === "signup") && (
                        <>
                          <p><strong>Username:</strong> {submission.data.username}</p>
                          {submission.data.email && <p><strong>Email:</strong> {submission.data.email}</p>}
                          {submission.data.name && <p><strong>Name:</strong> {submission.data.name}</p>}
                        </>
                      )}
                      
                      <div className="flex mt-4">
                        {submission.email && (
                          <div className="flex items-center mr-4 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4 mr-1" />
                            {submission.email}
                          </div>
                        )}
                        
                        {submission.phoneNumber && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-4 w-4 mr-1" />
                            {submission.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      {submission.viewed ? (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          Viewed
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          New submission
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {!submission.viewed && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkAsViewed(submission.id)}
                          disabled={markAsViewedMutation.isPending}
                        >
                          Mark as viewed
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}