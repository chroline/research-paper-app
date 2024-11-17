"use client";

import React, { useEffect, useRef, useState } from "react";

import Paper from "@/lib/types/paper";
import { cn } from "@/lib/utils";

import { PaperCard } from "@/components/paper-card";

const SPACING = 12;
const STACK_PEEK = 12;
const SCALE_FACTOR = 0.05;

const useCardMeasurements = () => {
  const [cardHeights, setCardHeights] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateHeights = () => {
      const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
      setCardHeights(heights);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [cardRefs.current]);

  return { cardHeights, cardRefs };
};

const calculatePositions = {
  expanded: (index: number, cardHeights: number[]) => {
    let position = 0;
    for (let i = 0; i < index; i++) {
      position += cardHeights[i] + SPACING;
    }
    return position;
  },

  stacked: (index: number) => {
    const stackPosition = index * STACK_PEEK;
    return stackPosition;
  },

  totalHeight: (isHovered: boolean, cardHeights: number[]) => {
    if (isHovered) {
      return cardHeights.reduce((sum, height) => sum + height, 0) + (cardHeights.length - 1) * SPACING;
    }
    return cardHeights[0] + (cardHeights.length - 1) * STACK_PEEK;
  },
};

export const PaperCardStack = ({ papers }: { papers: Paper[] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { cardHeights, cardRefs } = useCardMeasurements();

  useEffect(() => {
    // Force a height recalculation after initial render
    const timer = setTimeout(() => {
      const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
      if (heights.some(height => height > 0)) {
        window.dispatchEvent(new Event("resize"));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("pt-0 transition-all", isHovered ? "pt-2" : "")}>
      <div
        className="relative inline-block w-full transition-all duration-200 ease-in-out"
        style={{
          height: calculatePositions.totalHeight(isHovered, cardHeights),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {papers.map((paper, index) => {
          const initialHeight = cardHeights[0];
          const currentHeight = cardHeights[index];

          const cardStyle = {
            top: 0,
            zIndex: papers.length - index,
            transform: isHovered
              ? `translateY(${calculatePositions.expanded(index, cardHeights)}px)`
              : `translateY(${calculatePositions.stacked(index)}px) scale(${1 - index * SCALE_FACTOR})`,
            transformOrigin: "bottom",
            height: isHovered ? currentHeight : initialHeight,
          };

          return (
            <div
              key={paper.id}
              style={cardStyle}
              className={cn(
                "absolute w-full origin-bottom transition-all duration-300 ease-in-out",
                isHovered ? "pt-1" : "overflow-hidden rounded-xl shadow"
              )}
            >
              <div
                className={"absolute bottom-0 rounded-xl shadow transition-all hover:-translate-y-1 hover:shadow-md"}
              >
                <div
                  ref={(el: HTMLDivElement) => {
                    cardRefs.current[index] = el;
                  }}
                >
                  <PaperCard paper={paper} animateHover={false} small />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
