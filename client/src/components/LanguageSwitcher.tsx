import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

// Flag images for languages (using emoji for simplicity)
const LANGUAGE_FLAGS: Record<string, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  zh: "🇨🇳",
};

// Language names
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  hi: "हिन्दी",
  zh: "中文",
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");
  
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
  };

  return (
    <div className="fixed bottom-5 right-24 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-lg border border-white/10 shadow-lg hover:bg-background/70 transition-all"
          >
            <Globe className="h-5 w-5 text-electric-blue" />
            <span className="sr-only">Change Language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass">
          {Object.keys(LANGUAGE_FLAGS).map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`flex items-center cursor-pointer ${
                currentLang === lang ? "text-electric-blue" : ""
              }`}
            >
              <span className="mr-2 text-lg">{LANGUAGE_FLAGS[lang]}</span>
              <span>{LANGUAGE_NAMES[lang]}</span>
              {currentLang === lang && (
                <span className="ml-2 h-2 w-2 rounded-full bg-electric-blue"></span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}