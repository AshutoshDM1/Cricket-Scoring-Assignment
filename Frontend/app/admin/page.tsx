import CricketScorecard from "@/components/cricket-scorecard";
import CricketScoring from "@/components/cricket-scoring";

const AdminPage = () => {
  return (
    <>
      <div className="flex gap-3 items-center justify-center min-h-screen">
        <CricketScoring />
        <CricketScorecard />
      </div>
    </>
  );
};

export default AdminPage;
