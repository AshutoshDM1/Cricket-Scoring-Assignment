import CricketScorecard from "@/components/cricket-scorecard";
// import FullCricketScorecard from "@/components/full-scorecard";

const ScorecardPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CricketScorecard />
      </div>
    </>
  );
};

export default ScorecardPage;
