import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Download, Share2, Code, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface AnswerActionsProps {
  messageId: string;
  content: string;
}

const AnswerActions = ({ messageId, content }: AnswerActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleThumbsUp = () => {
    setLiked(!liked);
    setDisliked(false);
    toast.success(liked ? 'Feedback removed' : 'Thanks for the positive feedback!');
  };

  const handleThumbsDown = () => {
    setDisliked(!disliked);
    setLiked(false);
    toast.success(disliked ? 'Feedback removed' : 'Thanks for the feedback!');
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `answer-${messageId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Answer downloaded successfully');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(content);
    toast.success('Answer copied to clipboard');
  };

  const handleCode = () => {
    const formattedContent = `\`\`\`\n${content}\n\`\`\``;
    navigator.clipboard.writeText(formattedContent);
    toast.success('Answer copied as code format');
  };

  const handleHelp = () => {
    toast.info('Action buttons help you interact with AI responses - give feedback, save, or share answers');
  };

  return (
    <div className="flex items-center gap-1 pt-3 mt-3 border-t border-border/50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThumbsUp}
            className={`h-8 w-8 p-0 hover:bg-accent ${
              liked ? 'text-success bg-success/10' : 'text-muted-foreground'
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{liked ? 'Remove positive feedback' : 'Good response'}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThumbsDown}
            className={`h-8 w-8 p-0 hover:bg-accent ${
              disliked ? 'text-destructive bg-destructive/10' : 'text-muted-foreground'
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{disliked ? 'Remove negative feedback' : 'Poor response'}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent"
          >
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download answer</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCode}
            className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent"
          >
            <Code className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy as code</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHelp}
            className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Help with actions</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AnswerActions;