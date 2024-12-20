import CricketScorecard from "@/components/cricket-scorecard";
import CricketScoring from "@/components/cricket-scoring";

const AdminPage = () => {
  return (
    <>
      <div className="flex flex-wrap gap-3 items-center justify-center min-h-screen px-2 py-2 ">
        <CricketScoring />
        <CricketScorecard />
      </div>
    </>
  );
};

export default AdminPage;
