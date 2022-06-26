import { useReward } from "react-rewards";

export default function useConfetti() {
  const { reward: show } = useReward("reward-target", "emoji", {
    emoji: ["💛", "💚", "💙", "🧡", "💜", "❤️"],
    lifetime: 160,
    elementSize: 14,
    elementCount: 25,
    spread: 60,
  });

  return { show };
}
