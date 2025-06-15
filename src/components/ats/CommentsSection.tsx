
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, ThumbsUp, Reply } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
}

interface CommentsSectionProps {
  analysisId?: string;
}

const CommentsSection = ({ analysisId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Johnson",
      content: "Great analysis! The keyword suggestions were really helpful for my tech resume.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 5,
      replies: [
        {
          id: "1-1",
          author: "Mike Chen",
          content: "I agree! The ATS optimization tips made a huge difference.",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 2,
          replies: []
        }
      ]
    },
    {
      id: "2",
      author: "David Rodriguez",
      content: "The match score feature is incredibly accurate. Helped me improve from 65% to 85%!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 8,
      replies: []
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
    toast.success("Comment added successfully!");
  };

  const handleAddReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: "You",
      content: replyContent,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };
    
    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    }));
    
    setReplyContent("");
    setReplyTo(null);
    toast.success("Reply added successfully!");
  };

  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
            )
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Community Discussion
        </CardTitle>
        <CardDescription>
          Share your experience and get advice from other users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment */}
        <div className="space-y-3">
          <Textarea
            placeholder="Share your thoughts or ask a question..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Post Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(comment.id)}
                      className="h-6 px-2 text-xs"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="h-6 px-2 text-xs"
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              {replyTo === comment.id && (
                <div className="ml-11 space-y-2">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[60px] text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyContent.trim()}
                    >
                      Reply
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReplyTo(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-11 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="border-l-2 border-gray-200 pl-3">
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{reply.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-xs">{reply.author}</span>
                            <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                          </div>
                          <p className="text-xs text-gray-700">{reply.content}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(reply.id, true, comment.id)}
                            className="h-5 px-2 text-xs mt-1"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsSection;
