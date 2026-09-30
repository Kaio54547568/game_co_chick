import React, { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface OpeningCutsceneProps {
  playerName: string;
  onFinish: () => void;
}

const scenes = [
  {
    image: '/assets/game/story/opening-path.png',
    eyebrow: 'Một chuyến đi mới',
    line: 'Những con chữ từng làm ngôi làng sáng lên.',
  },
  {
    image: '/assets/game/story/lost-words.png',
    eyebrow: 'Rồi một ngày',
    line: 'Nhiều từ biến mất. Mọi người cần bạn giúp tìm lại.',
  },
  {
    image: '/assets/game/story/opening-path.png',
    eyebrow: 'Bắt đầu từ đây',
    line: 'Gặp Hồng Y Tông Chủ ở đầu đường. Mỗi bài học đưa bạn đi xa hơn.',
  },
];

export const OpeningCutscene: React.FC<OpeningCutsceneProps> = ({ playerName, onFinish }) => {
  const [index, setIndex] = useState(0);
  const next = () => index < scenes.length - 1 ? setIndex(index + 1) : onFinish();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onFinish();
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onFinish]);

  const scene = scenes[index];
  return (
    <div className="cutscene fixed inset-0 z-[80] bg-[#07110f] text-white" role="dialog" aria-modal="true" aria-label="Câu chuyện mở đầu">
      <img key={index} src={scene.image} alt="Khung cảnh ngôi làng" className="cutscene-art absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06100f] via-[#06100f]/10 to-black/30" />
      <button onClick={onFinish} className="absolute right-4 top-4 z-10 flex min-h-11 items-center gap-1 rounded-full bg-black/45 px-4 text-sm text-white backdrop-blur-md" style={{ top: 'max(1rem, env(safe-area-inset-top))' }}>
        Bỏ qua <X size={15} />
      </button>
      <div className="absolute bottom-0 left-0 right-0 mx-auto flex w-full max-w-3xl flex-col items-start gap-4 px-6 pb-8 sm:px-10 sm:pb-12" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <div className="flex gap-1.5" aria-label={`Cảnh ${index + 1} trên ${scenes.length}`}>
          {scenes.map((_, i) => <span key={i} className={`h-1 rounded-full transition-all ${i === index ? 'w-8 bg-amber-300' : 'w-3 bg-white/40'}`} />)}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-amber-200">{scene.eyebrow}</p>
        <h2 className="max-w-2xl text-2xl font-semibold leading-snug drop-shadow-lg sm:text-4xl">
          {index === 2 ? `${playerName}, ${scene.line.charAt(0).toLowerCase()}${scene.line.slice(1)}` : scene.line}
        </h2>
        <button onClick={next} className="mt-1 flex min-h-12 items-center gap-3 rounded-full bg-amber-300 px-6 font-bold text-stone-950 active:scale-95">
          {index === scenes.length - 1 ? 'Bắt đầu chơi' : 'Tiếp'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
