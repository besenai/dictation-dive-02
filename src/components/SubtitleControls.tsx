import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const LANGUAGES = [
  { code: 'en-US', name: 'English' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
];

const SPEECH_RATES = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

interface SubtitleControlsProps {
  currentIndex: number;
  totalSubtitles: number;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  onPlayAudio: () => void;
  onNext: () => void;
  onBack: () => void;
  onJumpTo: (index: number) => void;
  speechRate: number;
  onSpeechRateChange: (value: number) => void;
  onUserInput: (text: string) => void;
}

export const SubtitleControls = ({
  currentIndex,
  totalSubtitles,
  selectedLanguage,
  onLanguageChange,
  onPlayAudio,
  onNext,
  onBack,
  onJumpTo,
  speechRate,
  onSpeechRateChange,
}: SubtitleControlsProps) => {
  const [jumpToValue, setJumpToValue] = useState(currentIndex + 1);

  const handleJumpToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setJumpToValue(value);
    if (!isNaN(value) && value > 0 && value <= totalSubtitles) {
      onJumpTo(value - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg">
            <span className="text-sm font-medium text-gray-900">
              {currentIndex + 1} / {totalSubtitles}
            </span>
            <Input
              type="number"
              min={1}
              max={totalSubtitles}
              value={jumpToValue}
              onChange={handleJumpToChange}
              className="w-[80px] bg-white/80"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[140px] bg-white/80">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={onPlayAudio}
              className="bg-white/80 hover:bg-primary hover:text-white transition-colors"
            >
              Play Audio
            </Button>
            <Select 
              value={speechRate.toString()} 
              onValueChange={(value) => onSpeechRateChange(parseFloat(value))}
            >
              <SelectTrigger className="w-[60px] bg-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SPEECH_RATES.map((rate) => (
                  <SelectItem key={rate} value={rate.toString()}>
                    {rate}x
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={onBack} 
          variant="outline" 
          disabled={currentIndex === 0}
          className="bg-white/80 hover:bg-primary hover:text-white transition-colors"
        >
          Back
        </Button>
        <Button 
          onClick={onNext} 
          variant="outline" 
          disabled={currentIndex === totalSubtitles - 1}
          className="bg-white/80 hover:bg-primary hover:text-white transition-colors"
        >
          Next
        </Button>
      </div>
    </div>
  );
};