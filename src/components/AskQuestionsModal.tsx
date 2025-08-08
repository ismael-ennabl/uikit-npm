import { useState, useEffect } from 'react';
import { Sparkles, Send, Plus, Book, Bookmark, ChevronDown, Trash2, RotateCcw, ArrowLeft, X, Copy, BookmarkCheck, Flame } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TYPOGRAPHY } from '@/styles/tokens';
import AnswerActions from './AnswerActions';

export interface Document {
  id: number;
  name: string;
  company: string;
  category: string;
  status: string;
}

interface AskQuestionsModalProps {
  open: boolean;
  onClose: () => void;
  documentCount: number;
  selectedDocuments?: Document[];
  onRemoveDocument?: (documentId: number) => void;
  onSelectFiles?: () => void;
}

const AskQuestionsModal = ({
  open,
  onClose,
  documentCount,
  selectedDocuments,
  onRemoveDocument,
  onSelectFiles
}: AskQuestionsModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('Last Month');
  const [activeChatId, setActiveChatId] = useState('current');
  const [chatHistory, setChatHistory] = useState<Array<{
    id: string;
    type: 'question' | 'answer';
    content: string;
    timestamp: Date;
  }>>([]);
  
  // Prompts Library state
  const [showPromptsLibrary, setShowPromptsLibrary] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const [sortOption, setSortOption] = useState('Frequently Used');
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(new Set());

  const generateContextualInput = (docs: Document[]) => {
    if (!docs || docs.length === 0) return '';
    if (docs.length === 1) {
      const doc = docs[0];
      return `I have selected 1 document: "${doc.name}" from ${doc.company} (${doc.category} category). Please analyze this document and tell me `;
    } else {
      const docList = docs.slice(0, 3).map(doc => `"${doc.name}" (${doc.company})`).join(', ');
      const additional = docs.length > 3 ? ` and ${docs.length - 3} more` : '';
      return `I have selected ${docs.length} documents: ${docList}${additional}. Please analyze these documents and tell me `;
    }
  };

  // Reset input when modal opens
  useEffect(() => {
    if (open) {
      setInputValue('');
    }
  }, [open]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setChatHistory([]);
      setActiveChatId('current');
      setShowPromptsLibrary(false);
    }
  }, [open]);

  // Mock data for prompts library
  const promptCategories = ['Trending', 'Saved', 'Policies', 'Binders', 'Certificates', 'ACCORD', 'Loss Runs'];
  
  const mockPrompts = [
    { id: '1', title: 'What are the key differences between these documents?', category: 'Docs', popularity: 95, usage: 150 },
    { id: '2', title: 'What policies do not have Dwelling Replacing cost coverage?', category: 'Policies', popularity: 89, usage: 134 },
    { id: '3', title: 'Which policies are maxed at $3M in coverage?', category: 'Policies', popularity: 78, usage: 98 },
    { id: '4', title: 'What policies do not have Replacement Cost coverage?', category: 'Policies', popularity: 72, usage: 87 },
    { id: '5', title: 'Are there any policies with a Secondary Insured as a trust?', category: 'Policies', popularity: 65, usage: 76 },
    { id: '6', title: 'What are the most common coverage types across all documents?', category: 'Docs', popularity: 82, usage: 112 },
    { id: '7', title: 'Show me all expired certificates', category: 'Certificates', popularity: 59, usage: 45 },
    { id: '8', title: 'List all ACCORD forms that need updates', category: 'ACCORD', popularity: 67, usage: 56 },
    { id: '9', title: 'Find loss runs with claims over $100k', category: 'Loss Runs', popularity: 73, usage: 89 },
    { id: '10', title: 'Which binders are pending renewal?', category: 'Binders', popularity: 61, usage: 52 }
  ];

  // Mock chat sessions for sidebar
  const chatSessions = [{
    id: '1',
    title: 'Policies that expire in the next 30 days',
    date: 'MAY',
    timestamp: new Date('2024-05-15')
  }, {
    id: '2',
    title: 'List all active accounts that require verification',
    date: 'MAY',
    timestamp: new Date('2024-05-14')
  }, {
    id: '3',
    title: 'Display all pending requests for approvals',
    date: 'MAY',
    timestamp: new Date('2024-05-13')
  }, {
    id: '4',
    title: 'Show me all policies that expire in the next 60 days',
    date: 'MAY',
    timestamp: new Date('2024-05-12')
  }, {
    id: '5',
    title: 'Expiring in 90 days',
    date: 'MAY',
    timestamp: new Date('2024-05-11')
  }];
  const suggestedQuestions = ["What are the key differences between these documents?", "What policies do not have Dwelling Replacing cost coverage?", "Which policies are maxed at $3M in coverage?", "What policies do not have Replacement Cost coverage?", "Are there any policies with a Secondary Insured as a trust?", "What are the most common coverage types across all documents?"];
  const handleSendQuestion = () => {
    if (!inputValue.trim()) return;

    // Add question to chat history
    const newQuestion = {
      id: `q-${Date.now()}`,
      type: 'question' as const,
      content: inputValue,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, newQuestion]);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const mockResponse = {
        id: `a-${Date.now()}`,
        type: 'answer' as const,
        content: `Based on my analysis of ${documentCount} documents, here's what I found regarding "${inputValue}"...`,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, mockResponse]);
    }, 1000);
    setInputValue('');
  };
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };
  const handleNewChat = () => {
    setChatHistory([]);
    setInputValue('');
    setActiveChatId('current');
  };
  const handleClearAllChats = () => {
    setChatHistory([]);
    setInputValue('');
    setActiveChatId('current');
  };
  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    // In a real app, you'd load the chat history for this session
  };
  const handleClearContext = () => {
    setInputValue('');
  };

  // Prompts Library handlers
  const handlePromptsLibraryOpen = () => {
    setShowPromptsLibrary(true);
  };

  const handlePromptsLibraryClose = () => {
    setShowPromptsLibrary(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePromptSave = (promptId: string) => {
    setSavedPrompts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(promptId)) {
        newSet.delete(promptId);
      } else {
        newSet.add(promptId);
      }
      return newSet;
    });
  };

  const handlePromptCopy = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  const handleApplyPrompt = (prompt: string) => {
    setInputValue(prompt);
    setShowPromptsLibrary(false);
  };

  const getFilteredPrompts = () => {
    let filtered = selectedCategory === 'Saved' 
      ? mockPrompts.filter(p => savedPrompts.has(p.id))
      : selectedCategory === 'Trending'
        ? mockPrompts
        : mockPrompts.filter(p => p.category === selectedCategory);

    // Sort prompts
    switch (sortOption) {
      case 'Frequently Used':
        return filtered.sort((a, b) => b.usage - a.usage);
      case 'Popular (for me)':
      case 'Popular (for everyone)':
        return filtered.sort((a, b) => b.popularity - a.popularity);
      case 'Newest to Oldest':
        return filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      default:
        return filtered;
    }
  };

  return <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-0 bg-page !rounded-[12px] overflow-hidden">
        <TooltipProvider>
        <div className="flex h-full min-h-0">
          {/* Left Sidebar */}
          <div className="w-80 border-r bg-page flex flex-col p-4 rounded-l-[12px]">
            {showPromptsLibrary ? (
              /* Prompts Library Sidebar */
              <div className="space-y-4">
                {/* Top Section: Trending and Saved with icons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => handleCategorySelect('Trending')}
                    variant="ghost"
                    className={`w-full justify-start gap-2 rounded-[12px] ${
                      selectedCategory === 'Trending' 
                        ? 'bg-brand-blue/10 text-brand-blue font-medium' 
                        : 'text-muted-foreground hover:bg-hover-primary'
                    }`}
                  >
                    <Flame className="h-4 w-4" />
                    Trending
                  </Button>
                  <Button
                    onClick={() => handleCategorySelect('Saved')}
                    variant="ghost"
                    className={`w-full justify-start gap-2 rounded-[12px] ${
                      selectedCategory === 'Saved' 
                        ? 'bg-brand-blue/10 text-brand-blue font-medium' 
                        : 'text-muted-foreground hover:bg-hover-primary'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                    Saved
                  </Button>
                </div>

                {/* Middle Section: Title */}
                <div className="py-2">
                  <h3 className="text-sm font-medium px-3 text-muted-foreground">Prompts by Category</h3>
                </div>

                {/* Bottom Section: Category buttons without icons */}
                <div className="space-y-2">
                  {['Policies', 'Binders', 'Certificates', 'ACCORD', 'Loss Runs'].map(category => (
                    <Button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      variant="ghost"
                      className={`w-full justify-start gap-2 rounded-[12px] ${
                        selectedCategory === category 
                          ? 'bg-brand-blue/10 text-brand-blue font-medium' 
                          : 'text-muted-foreground hover:bg-hover-primary'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              /* Regular Chat Sidebar */
              <>
            {/* Top Actions */}
            <div className="space-y-2 mb-6">
              <Button onClick={handleNewChat} className="w-full justify-start gap-2 bg-background hover:bg-hover-primary text-foreground border rounded-[12px]" variant="outline">
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
              
              <Button 
                onClick={handlePromptsLibraryOpen}
                variant="ghost" 
                  className="w-full justify-start gap-2 text-muted-foreground hover:bg-hover-primary rounded-[12px]"
              >
                <Book className="h-4 w-4" />
                Prompts Library
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-hover-primary rounded-[12px]">
                <Bookmark className="h-4 w-4" />
                Saved
              </Button>
            </div>

            {/* Recent Section */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">Recent</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:bg-hover-primary rounded-[12px]">
                      {activeFilter}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActiveFilter('Last Week')}>
                      Last Week
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter('Last Month')}>
                      Last Month
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter('Last 3 Months')}>
                      Last 3 Months
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Date Group with ScrollArea */}
              <ScrollArea className="flex-1">
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    MAY
                  </h4>
                  <div className="space-y-1">
                    {chatSessions.map(chat => <button key={chat.id} onClick={() => handleChatSelect(chat.id)} className={`w-full text-left p-2 rounded-[12px] text-sm hover:bg-hover-primary transition-colors ${activeChatId === chat.id ? 'bg-hover-primary' : ''}`}>
                        <div className="text-foreground truncate">
                          {chat.title}
                        </div>
                      </button>)}
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Clear All Button */}
            <Button onClick={handleClearAllChats} variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-hover-primary mt-auto rounded-[12px]">
              <Trash2 className="h-4 w-4" />
              Clear all chats
            </Button>
            </>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col rounded-r-[12px] min-h-0">
            {showPromptsLibrary ? (
              /* Prompts Library Content */
              <>
                {/* Prompts Library Header */}
                <div className="border-b p-4 bg-card rounded-tr-[12px] flex-shrink-0 sticky top-0 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={handlePromptsLibraryClose}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-hover-primary"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <h1 className={TYPOGRAPHY.h2}>Prompts Library</h1>
                    </div>
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-hover-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Prompts Content */}
                <div className="flex-1 bg-card overflow-hidden items-start p-2">
                  {/* Sort Controls */}
                  <div className="px-4 py-2 border-b bg-card sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                      <h2 className={TYPOGRAPHY.h3}>{selectedCategory}</h2>
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Frequently Used">Frequently Used</SelectItem>
                          <SelectItem value="Popular (for me)">Popular (for me)</SelectItem>
                          <SelectItem value="Popular (for everyone)">Popular (for everyone)</SelectItem>
                          <SelectItem value="Newest to Oldest">Newest to Oldest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Prompts List */}
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="p-4 space-y-2">
                      {getFilteredPrompts().map(prompt => (
                        <div
                          key={prompt.id}
                          className="group p-4 border rounded-[8px] hover:bg-hover-primary hover:border-border transition-all cursor-pointer"
                          onClick={() => handleApplyPrompt(prompt.title)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-foreground mb-1">
                                {prompt.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{prompt.category}</p>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePromptCopy(prompt.title);
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-hover-secondary"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePromptSave(prompt.id);
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-hover-secondary"
                              >
                                {savedPrompts.has(prompt.id) ? (
                                  <BookmarkCheck className="h-3 w-3 text-brand-blue" />
                                ) : (
                                  <Bookmark className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {getFilteredPrompts().length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No prompts found in this category
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Prompts Library Footer */}
                <div className="border-t p-4 bg-card flex-shrink-0 sticky bottom-0">
                  <div className="flex justify-end gap-3">
                    <Button
                      onClick={handlePromptsLibraryClose}
                      variant="outline"
                      className="rounded-[8px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePromptsLibraryClose}
                      className="bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 rounded-[8px]"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Regular Chat Interface */
              <>
                {/* Chat Header */}
                <div className="border-b p-4 bg-page rounded-tr-[12px] flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h1 className={TYPOGRAPHY.h2}>Ask Questions</h1>
                  </div>
                </div>

            {/* Scrollable Content Area */}
            <ScrollArea className="flex-1 h-0 scroll-smooth" style={{
              WebkitOverflowScrolling: 'touch'
            }}>
              <div className="p-6">
              <div className="space-y-6">
                {/* Welcome Message or Chat History */}
                {chatHistory.length === 0 ? <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      How may I help you?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {selectedDocuments && selectedDocuments.length > 0 ? `Ask me anything about your ${selectedDocuments.length} selected documents` : <>
                          Ask me anything about your {documentCount} documents{' '}
                          <button onClick={onSelectFiles} className="text-brand-blue hover:font-normal">
                            select files
                          </button>
                        </>}
                    </p>
                    {selectedDocuments && selectedDocuments.length > 0 && <div className="rounded-lg p-4 mb-4 text-left max-w-md mx-auto bg-neutral-50">
                        <h4 className="font-medium mb-2 text-gray-950">Selected Documents:</h4>
                        <div className={`space-y-1 text-sm text-blue-700 ${selectedDocuments.length > 3 ? 'max-h-32' : ''}`}>
                          <ScrollArea className={selectedDocuments.length > 3 ? 'h-32' : 'h-auto'}>
                            {selectedDocuments.map(doc => <div key={doc.id} className="flex justify-between items-center py-1">
                            <span className="truncate mr-2 text-foreground">{doc.name}</span>
                            <button onClick={() => onRemoveDocument?.(doc.id)} className="text-destructive hover:opacity-80 text-sm font-medium transition-colors shrink-0">
                              remove
                            </button>
                              </div>)}
                          </ScrollArea>
                        </div>
                        <button onClick={onSelectFiles} className="text-brand-blue text-sm mt-2 block">
                          add more
                        </button>
                      </div>}
                  </div> : <div className="space-y-4 pb-4">
                    {chatHistory.map((item, index) => <div key={index} className={`flex ${item.type === 'question' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-[12px] p-4 ${item.type === 'question' ? 'bg-brand-blue/10 text-foreground' : 'bg-muted text-foreground'}`}>
                          <p className="text-sm">{item.content}</p>
                          <span className="text-xs opacity-70 mt-2 block">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                          {item.type === 'answer' && <AnswerActions messageId={item.id} content={item.content} />}
                        </div>
                      </div>)}
                  </div>}

                {/* Suggested Questions */}
                {chatHistory.length === 0 && <div className="mt-8">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {selectedDocuments && selectedDocuments.length > 0 ? 'Suggested questions for your selection:' : 'Suggested questions:'}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {suggestedQuestions.map((question, index) => <Button key={index} variant="outline" className="text-left justify-start h-auto p-3 whitespace-normal rounded-[12px] text-wrap hover:bg-hover-primary" onClick={() => handleSuggestedQuestion(question)}>
                          {question}
                        </Button>)}
                      </div>
                    </div>}
              </div>
              </div>
            </ScrollArea>

            {/* Input Area - Fixed at Bottom */}
            <div className="border-t pt-4 flex-shrink-0 bg-page px-6 pb-6">
              <div className="flex gap-3">
                <Textarea placeholder={selectedDocuments && selectedDocuments.length > 0 ? "Ask anything about your selected documents..." : "Ask anything..."} value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyPress} className="flex-1 min-h-[60px] max-h-[120px] resize-none rounded-[12px] focus-visible:ring-brand-blue focus:border-brand-blue" rows={2} />
                <Button onClick={handleSendQuestion} disabled={!inputValue.trim()} className="self-end px-6 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 rounded">
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
            </>
            )}
          </div>
        </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>;
};

export default AskQuestionsModal;
