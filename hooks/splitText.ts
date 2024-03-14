import { useEffect, useRef } from 'react';

interface UseSplitTextProps {
  text: string;
  splitWords?: boolean;
  applyClasses?: boolean;
  positionType?: 'relative' | 'absolute';
}

export const useSplitText = ({
  text,
  splitWords = false,
  applyClasses = false,
  positionType = 'relative',
}: UseSplitTextProps) => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    // Function to split text into words
    const splitTextIntoWords = (text: string) => {
      return text.split(' ');
    };

    // Function to measure the width of a word
    const measureWordWidth = (word: string) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.position = 'absolute';
      span.style.visibility = 'hidden';
      span.style.pointerEvents = 'none';
      textElement.appendChild(span);
      const width = span.offsetWidth;
      textElement.removeChild(span);
      return width;
    };

    // Split the text into words or characters
    const parts = splitWords ? splitTextIntoWords(text) : Array.from(text);

    // Loop through each part and wrap it in a span
    parts.forEach((part, index) => {
      const partSpan = document.createElement('span');
      partSpan.textContent = part;
      partSpan.style.position = positionType;
      if (applyClasses) {
        partSpan.classList.add(splitWords ? 'word' : 'char');
      }
      partSpan.style.display = 'inline-block'; // Display as inline-block for animation
      if (splitWords && index !== parts.length - 1) {
        const wordWidth = measureWordWidth(part);
        const nextWordWidth = index < parts.length - 1 ? measureWordWidth(parts[index + 1]) : 0;
        const spaceWidth = measureWordWidth(' ');
        const spaceCount = Math.ceil((textElement.offsetWidth - (wordWidth + nextWordWidth)) / spaceWidth);
        partSpan.style.marginRight = `${spaceCount * spaceWidth}px`; // Add spacing between words
      }
      textElement.appendChild(partSpan);
    });

    return () => {
      if (textElement) {
        textElement.innerHTML = '';
      }
    };
  }, [text, splitWords, applyClasses, positionType]);

  return textRef;
};

