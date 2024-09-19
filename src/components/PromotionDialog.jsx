import React from 'react';
import { Button } from "@/components/ui/button";

const PromotionDialog = ({ handlePromotion }) => (
  <div className="mt-4">
    <p className="text-[#d9dad7]">Choose promotion piece:</p>
    <div className="flex space-x-2">
      {['♕', '♖', '♗', '♘'].map((piece) => (
        <Button key={piece} onClick={() => handlePromotion(piece)} className="bg-[#3e4a61] text-[#d9dad7] hover:bg-[#c24d2c]">{piece}</Button>
      ))}
    </div>
  </div>
);

export default PromotionDialog;