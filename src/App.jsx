import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Header, ImageSlider, EmojiPicker, DoodleCanvas, ActionButtons, MessageBox } from './components';
import IconPicker, { ICONS } from './components/IconPicker';
import FlaticonSearch from './components/FlaticonSearch';
const MIN_IMAGES = 3;
const MAX_IMAGES = 10;

export default function App() {
  // --- State Management ---
  const [numImages, setNumImages] = useState(MIN_IMAGES);
  const [type, setType] = useState('emoji'); // 'emoji' or 'icon'
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectedFlaticons, setSelectedFlaticons] = useState([]);
  const [doodles, setDoodles] = useState([]);
  const [message, setMessage] = useState('');
  const canvasRef = useRef(null);

  // No need for html2canvas script anymore

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGenerateDoodle = useCallback(() => {
    if (type === 'emoji' && !selectedEmojis.length) {
      showMessage('Please select at least one emoji!');
      return;
    }
    if (type === 'icon' && !selectedIcons.length && !selectedFlaticons.length) {
      showMessage('Please select at least one icon!');
      return;
    }
    setDoodles([]);
  }, [type, selectedEmojis, selectedIcons, selectedFlaticons]);

  const handleDownloadDoodle = () => {
    if (type === 'emoji' && !selectedEmojis.length) {
      showMessage('Please select at least one emoji before downloading!');
      return;
    }
    if (type === 'icon' && !selectedIcons.length && !selectedFlaticons.length) {
      showMessage('Please select at least one icon before downloading!');
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'doodle.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      showMessage('Could not download image. Canvas not found.');
    }
  };

  return (
    <div className="min-h-screen h-full font-sans">
      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                .card {
                    background: linear-gradient(120deg, #f0f9ff 60%, #e0f2fe 100%);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
                    border-radius: 2rem;
                    border: 1px solid #bae6fd;
                }
            `}</style>
      <Header />
      <div className='flex h-full gap-8'>
        <div className="card h-full flex-1 p-6 md:p-8 w-full max-w-2xl mx-auto ">
          <div className="mb-4 flex gap-4 items-center">
            <label className="font-semibold text-blue-700">Type:</label>
            <select
              className="rounded-lg border border-blue-200 px-3 py-1 text-blue-700 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={type}
              onChange={e => { setType(e.target.value); }}
            >
              <option value="emoji">Emoji</option>
              <option value="icon">Icon</option>
            </select>
          </div>
          {type === 'emoji' ? (
            <EmojiPicker selectedEmojis={selectedEmojis} onEmojiSelect={setSelectedEmojis} />
          ) : (
            <>
              <IconPicker selectedIcons={selectedIcons} onIconSelect={setSelectedIcons} />
              <div className="my-4" />
              <FlaticonSearch selectedIcons={selectedFlaticons} onIconSelect={setSelectedFlaticons} />
            </>
          )}
          <ActionButtons onGenerate={handleGenerateDoodle} onDownload={handleDownloadDoodle} />
          <MessageBox message={message} />
        </div>
        <div className=" h-full flex-2">
          <DoodleCanvas
            selectedEmojis={selectedEmojis}
            selectedIcons={selectedIcons}
            selectedFlaticons={selectedFlaticons}
            type={type}
            canvasRef={canvasRef}
          />
        </div>
      </div>
    </div>
  );
}
