import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/context/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LanguageButtonProps } from '@/lib/types';


const LanguageButton: React.FC<LanguageButtonProps> = ({
  variant = "ghost",
  size = "icon",
  className = ""
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Globe className="h-5 w-5" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              {t('language.select', 'Select Language')}
            </DialogTitle>
          </DialogHeader>
          <RadioGroup
            defaultValue={currentLanguage}
            onValueChange={(value) => {
              setLanguage(value);
              setIsOpen(false);
            }}
            className="gap-4"
          >
            {supportedLanguages.map((lang) => (
              <div key={lang} className="flex items-center space-x-2">
                <RadioGroupItem value={lang} id={`lang-${lang}`} />
                <Label htmlFor={`lang-${lang}`} className="cursor-pointer">
                  {t(`language.${lang}`)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageButton;