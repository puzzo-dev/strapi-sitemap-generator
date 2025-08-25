import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import {
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Link,
    MoreHorizontal,
    X,
    Copy,
    MessageCircle,
    Phone,
    Send
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SocialShareButtonsProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
    variant?: 'default' | 'compact' | 'dropdown';
}

interface SharePlatform {
    name: string;
    icon: React.ElementType;
    color: string;
    shareUrl: (url: string, title: string, description?: string) => string;
    ariaLabel: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
    url,
    title,
    description = '',
    className = '',
    variant = 'default'
}) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    // Encode URL and text for sharing
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const platforms: SharePlatform[] = [
        {
            name: 'Facebook',
            icon: Facebook,
            color: 'hover:bg-blue-600 hover:text-white',
            shareUrl: (url, title, desc) =>
                `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}${desc ? ` - ${encodedDescription}` : ''}`,
            ariaLabel: 'Share on Facebook'
        },
        {
            name: 'X',
            icon: Twitter, // Using Twitter icon for X (formerly Twitter)
            color: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
            shareUrl: (url, title, desc) =>
                `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${desc ? ` - ${encodedDescription}` : ''}`,
            ariaLabel: 'Share on X (formerly Twitter)'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            color: 'hover:bg-blue-700 hover:text-white',
            shareUrl: (url, title, desc) =>
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
            ariaLabel: 'Share on LinkedIn'
        },
        {
            name: 'WhatsApp',
            icon: Phone, // Phone icon for WhatsApp
            color: 'hover:bg-green-600 hover:text-white',
            shareUrl: (url, title, desc) =>
                `https://wa.me/?text=${encodedTitle}${desc ? ` - ${encodedDescription}` : ''} ${encodedUrl}`,
            ariaLabel: 'Share on WhatsApp'
        },
        {
            name: 'Telegram',
            icon: Send, // Send icon for Telegram
            color: 'hover:bg-blue-500 hover:text-white',
            shareUrl: (url, title, desc) =>
                `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}${desc ? ` - ${encodedDescription}` : ''}`,
            ariaLabel: 'Share on Telegram'
        },
        {
            name: 'Threads',
            icon: MessageCircle, // Better icon for Threads (messaging/discussion platform)
            color: 'hover:bg-gray-800 hover:text-white dark:hover:bg-gray-600',
            shareUrl: (url, title, desc) =>
                `https://www.threads.net/intent/post?text=${encodedTitle}${desc ? ` - ${encodedDescription}` : ''} ${encodedUrl}`,
            ariaLabel: 'Share on Threads'
        }
    ];

    const handlePlatformShare = (platform: SharePlatform) => {
        const shareUrl = platform.shareUrl(url, title, description);
        window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');

        toast({
            title: `Opening ${platform.name}`,
            description: `Sharing article on ${platform.name}`,
            variant: "default",
        });
    };

    const handleCopyLink = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
                toast({
                    title: "Link copied!",
                    description: "The article link has been copied to your clipboard.",
                    variant: "default",
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        toast({
                            title: "Link copied!",
                            description: "The article link has been copied to your clipboard.",
                            variant: "default",
                        });
                    } else {
                        throw new Error('Copy command failed');
                    }
                } catch (err) {
                    toast({
                        title: "Copy failed",
                        description: "Unable to copy link. Please manually copy the URL from your browser.",
                        variant: "destructive",
                    });
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        } catch (err) {
            toast({
                title: "Copy failed",
                description: "Unable to copy link. Please manually copy the URL from your browser.",
                variant: "destructive",
            });
        }
    };

    const handleNativeShare = async () => {
        const shareData = {
            title,
            text: description || title,
            url
        };

        try {
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                toast({
                    title: "Shared successfully!",
                    description: "The article has been shared.",
                    variant: "default",
                });
            } else {
                await handleCopyLink();
            }
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
                await handleCopyLink();
            }
        }
    };

    // Compact variant - dropdown menu
    if (variant === 'dropdown') {
        return (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className={`h-7 text-xs ${className}`}>
                        <Share2 className="h-3 w-3 mr-1.5" />
                        Share
                        <MoreHorizontal className="h-3 w-3 ml-1.5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    {platforms.map((platform) => {
                        const IconComponent = platform.icon;
                        return (
                            <DropdownMenuItem
                                key={platform.name}
                                onClick={() => handlePlatformShare(platform)}
                                className="flex items-center gap-1.5 cursor-pointer text-xs"
                            >
                                <IconComponent className="h-3 w-3" />
                                Share on {platform.name}
                            </DropdownMenuItem>
                        );
                    })}
                    <DropdownMenuItem
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 cursor-pointer text-xs"
                    >
                        <Copy className="h-3 w-3" />
                        Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleNativeShare}
                        className="flex items-center gap-1.5 cursor-pointer text-xs"
                    >
                        <Share2 className="h-3 w-3" />
                        More Options
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Compact variant - horizontal icons
    if (variant === 'compact') {
        return (
            <div className={`flex items-center gap-1 ${className}`}>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mr-1">Share:</span>
                {platforms.slice(0, 4).map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                        <Button
                            key={platform.name}
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePlatformShare(platform)}
                            className={`h-5 w-5 p-0 ${platform.color} transition-colors`}
                            aria-label={platform.ariaLabel}
                        >
                            <IconComponent className="h-2.5 w-2.5" />
                        </Button>
                    );
                })}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyLink}
                    className="h-5 w-5 p-0 hover:bg-gray-500 hover:text-white transition-colors"
                    aria-label="Copy link"
                >
                    <Link className="h-2.5 w-2.5" />
                </Button>
            </div>
        );
    }

    // Default variant - full buttons
    return (
        <div className={`space-y-2 ${className}`}>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Share this article:</h4>

            <div className="grid grid-cols-2 gap-1.5">
                {platforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                        <Button
                            key={platform.name}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePlatformShare(platform)}
                            className={`flex items-center justify-center gap-1.5 text-xs h-7 ${platform.color} transition-colors`}
                            aria-label={platform.ariaLabel}
                        >
                            <IconComponent className="h-3 w-3" />
                            {platform.name}
                        </Button>
                    );
                })}
            </div>

            <div className="flex gap-1.5">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs h-7 hover:bg-gray-500 hover:text-white transition-colors"
                >
                    <Link className="h-3 w-3" />
                    Copy Link
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNativeShare}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs h-7 hover:bg-blue-500 hover:text-white transition-colors"
                >
                    <Share2 className="h-3 w-3" />
                    More Options
                </Button>
            </div>
        </div>
    );
};

export default SocialShareButtons;
