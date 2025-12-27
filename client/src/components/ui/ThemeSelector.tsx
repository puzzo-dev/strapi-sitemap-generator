import React from 'react';
import { useTheme } from './theme-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { Sun, Moon, Monitor, Clock } from 'lucide-react';

interface ThemeSelectorProps {
    compact?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ compact = false }) => {
    const { theme, setTheme, actualTheme } = useTheme();

    const getCurrentIcon = () => {
        if (theme === 'auto') {
            return <Clock className="h-4 w-4" />;
        }
        if (actualTheme === 'dark') {
            return <Moon className="h-4 w-4" />;
        }
        if (actualTheme === 'light') {
            return <Sun className="h-4 w-4" />;
        }
        return <Monitor className="h-4 w-4" />;
    };

    const getTimeStatus = () => {
        if (theme !== 'auto') return '';

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours + minutes / 60;

        const nightStart = 18.5; // 6:30 PM
        const nightEnd = 6.5;    // 6:30 AM

        const isNight = currentTime >= nightStart || currentTime < nightEnd;

        if (isNight) {
            const hoursUntilMorning = currentTime >= nightStart
                ? (24 - currentTime + nightEnd)
                : (nightEnd - currentTime);
            const nextSwitch = Math.ceil(hoursUntilMorning);
            return `Dark until 6:30 AM (${nextSwitch}h)`;
        } else {
            const hoursUntilNight = nightStart - currentTime;
            const nextSwitch = Math.ceil(hoursUntilNight);
            return `Light until 6:30 PM (${nextSwitch}h)`;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size={compact ? "sm" : "default"}
                    className="relative h-8 w-8 p-0 focus:ring-offset-0"
                    aria-label="Toggle theme"
                >
                    {getCurrentIcon()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                    onClick={() => setTheme('light')}
                    className="flex items-center gap-2"
                >
                    <Sun className="h-4 w-4" />
                    <span className="flex-1">Light</span>
                    {theme === 'light' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('dark')}
                    className="flex items-center gap-2"
                >
                    <Moon className="h-4 w-4" />
                    <span className="flex-1">Dark</span>
                    {theme === 'dark' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('system')}
                    className="flex items-center gap-2"
                >
                    <Monitor className="h-4 w-4" />
                    <span className="flex-1">System</span>
                    {theme === 'system' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('auto')}
                    className="flex items-center gap-2"
                >
                    <Clock className="h-4 w-4" />
                    <div className="flex-1">
                        <div>Auto (Time)</div>
                        {theme === 'auto' && (
                            <div className="text-xs text-muted-foreground mt-1">
                                {getTimeStatus()}
                            </div>
                        )}
                    </div>
                    {theme === 'auto' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeSelector;
