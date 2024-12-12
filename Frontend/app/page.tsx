import CricketScoring from "@/components/cricket-scoring";

import CricketScorecard from "@/components/cricket-scorecard";

export default function Home() {
  return (
    <div className="flex gap-3 items-center justify-center min-h-screen">
      <CricketScoring />
      <CricketScorecard />
    </div>
  );
}
