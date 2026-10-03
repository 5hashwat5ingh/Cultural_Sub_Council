import React, { useEffect, useState } from "react";

export default function TypingText({
  text,
  className = "",
  delay = 0,
  speed = 70,
  cursor = true,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;

    const typingTimer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, speed);

    return () => clearInterval(typingTimer);
  }, [started, text, speed]);

  return (
    <h1 className={className}>
      {displayedText.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < displayedText.split("\n").length - 1 && <br />}
        </React.Fragment>
      ))}

      {cursor && (
        <span
          className="
            ml-1
            inline-block
            h-[0.85em]
            w-[3px]
            translate-y-[0.08em]
            animate-pulse
            bg-[#C6A15B]
          "
        />
      )}
    </h1>
  );
}