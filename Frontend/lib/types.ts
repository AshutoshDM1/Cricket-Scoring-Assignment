export type FullMatchInfo = {
  gameStarted: boolean;
  team1: {
    name: string;
    score: string;
    overs: string;
    flagUrl: string;
  };
  team2: {
    name: string;
    score: string;
    overs: string;
    flagUrl: string;
  };
  result: string;
  batting: Array<{
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
  }>;
  bowling: Array<{
    name: string;
    overs: string;
    maidens: number;
    runs: number;
    wickets: number;
  }>;
  ballTimeline: (number | string)[];
  extras: {
    byes: number;
    legByes: number;
    wides: number;
    noBalls: number;
    penalty: number;
    total: number;
  };
  commentary: Array<{
    over: string;
    text: string;
    runs: number;
  }>;
  striker: string;
  nonStriker: string;
  currentBowler: string;
};
