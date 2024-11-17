// "use client";
//
// import React, { forwardRef, useEffect, useRef, useState } from "react";
//
// // Hook for managing card measurements
// const useCardMeasurements = (cardsCount: number) => {
//   const [cardHeights, setCardHeights] = useState<number[]>([]);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//
//   useEffect(() => {
//     const updateHeights = () => {
//       const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
//       setCardHeights(heights);
//     };
//
//     updateHeights();
//     window.addEventListener("resize", updateHeights);
//     return () => window.removeEventListener("resize", updateHeights);
//   }, []);
//
//   return { cardHeights, cardRefs };
// };
//
// // Main Card Component with forwardRef
// const Card = forwardRef<
//   HTMLDivElement,
//   {
//     card: CardType;
//     index: number;
//     style: React.CSSProperties;
//   }
// >(({ card, style }, ref) => (
//   <div
//     ref={ref}
//     className="absolute w-full origin-top rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out"
//     style={style}
//   >
//     <CardContent subtitle={card.subtitle} description={card.description} />
//     <CardFooter tag={card.tag} links={card.links} />
//   </div>
// ));
//
// Card.displayName = "Card";
//
// // Position calculation utilities
// const calculatePositions = {
//   expanded: (index: number, cardHeights: number[]) => {
//     let position = 0;
//     for (let i = 0; i < index; i++) {
//       position += cardHeights[i] + SPACING;
//     }
//     return position;
//   },
//
//   stacked: (index: number, initialHeight: number, currentHeight: number) => {
//     const stackPosition = index * STACK_PEEK;
//     const shift = currentHeight - initialHeight;
//     return stackPosition - shift;
//   },
//
//   totalHeight: (isHovered: boolean, cardHeights: number[]) => {
//     if (isHovered) {
//       return cardHeights.reduce((sum, height) => sum + height, 0) + (CARDS.length - 1) * SPACING;
//     }
//     return cardHeights[0] + (CARDS.length - 1) * STACK_PEEK;
//   },
// };
//
// // Main Component
//
// export default CardStack;
