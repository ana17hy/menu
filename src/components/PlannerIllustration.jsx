import { CookingPot, Leaf, Salad, Soup, Utensils } from 'lucide-react';

export default function PlannerIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[24rem] animate-floaty">
      <div className="absolute inset-8 rounded-[3rem] bg-white/70 shadow-soft" />
      <div className="absolute left-7 top-8 grid h-20 w-20 place-items-center rounded-[2rem] bg-blush text-white shadow-petal">
        <CookingPot size={36} />
      </div>
      <div className="absolute right-7 top-16 grid h-16 w-16 place-items-center rounded-[1.7rem] bg-sage text-white shadow-soft">
        <Leaf size={30} />
      </div>
      <div className="absolute bottom-16 left-10 grid h-16 w-16 place-items-center rounded-[1.7rem] bg-butter text-clay shadow-soft">
        <Soup size={30} />
      </div>
      <div className="absolute bottom-9 right-10 grid h-20 w-20 place-items-center rounded-[2rem] bg-rosewood text-white shadow-petal">
        <Salad size={36} />
      </div>
      <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[10px] border-cream bg-linen text-rosewood shadow-soft">
        <Utensils size={48} />
      </div>
    </div>
  );
}
