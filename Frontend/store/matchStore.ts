import { create } from "zustand";

interface MatchState {
  matchInfo: {
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
    }>;
    bowling: Array<{
      name: string;
      overs: string;
      maidens: number;
      runs: number;
      wickets: number;
    }>;
    ballTimeline: number[];
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
  };
  striker: string;
  nonStriker: string;
  currentBowler: string;
  updateMatchInfo: (matchInfo: MatchState["matchInfo"]) => void;
  addRuns: (runs: number) => void;
  addExtra: (type: "wide" | "noBall" | "bye" | "legBye", runs?: number) => void;
  addWicket: () => void;
  addBallToTimeline: (runs: number) => void;
  addCommentary: (text: string) => void;
  updateOvers: () => void;
  setStriker: (name: string) => void;
  setNonStriker: (name: string) => void;
  setCurrentBowler: (name: string) => void;
  swapBatsmen: () => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  matchInfo: {
    team1: {
      name: "IND",
      score: "0/0",
      overs: "00.0",
      flagUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsILCHCa-YRabNlW_ph9ALALiIvGi76lrz-A&s",
    },
    team2: {
      name: "BAN",
      score: "0/0",
      overs: "00.0",
      flagUrl:
        "https://t4.ftcdn.net/jpg/01/04/47/13/240_F_104471360_1xohRUSRjfdGxoaRDtLg2z4ztBHkT21K.jpg",
    },
    result: "India is batting",
    batting: [
      {
        name: "Rohit Sharma",
        runs: 0,
        balls: 0,
        fours: 0,
      },
      {
        name: "Shubman Gill",
        runs: 0,
        balls: 0,
        fours: 0,
      },
    ],
    bowling: [
      {
        name: "Taskin Ahmed",
        overs: "0.0",
        maidens: 0,
        runs: 0,
        wickets: 0,
      },
    ],
    ballTimeline: [],
    extras: {
      byes: 0,
      legByes: 0,
      wides: 0,
      noBalls: 0,
      penalty: 0,
      total: 0,
    },
    commentary: [],
  },
  striker: "",
  nonStriker: "",
  currentBowler: "",
  updateMatchInfo: (matchInfo) => set({ matchInfo }),
  addRuns: (runs) =>
    set((state) => ({
      matchInfo: {
        ...state.matchInfo,
        team1: {
          ...state.matchInfo.team1,
          score: `${
            parseInt(state.matchInfo.team1.score.split("/")[0]) + runs
          }/${state.matchInfo.team1.score.split("/")[1]}`,
        },
        batting: state.matchInfo.batting.find((b) => b.name === state.striker)
          ? state.matchInfo.batting.map((batsman) =>
              batsman.name === state.striker
                ? {
                    ...batsman,
                    runs: batsman.runs + runs,
                    balls: batsman.balls + 1,
                  }
                : batsman
            )
          : [
              ...state.matchInfo.batting,
              {
                name: state.striker,
                runs: runs,
                balls: 1,
                fours: 0,
              },
            ],
        bowling: state.matchInfo.bowling.map((bowler) =>
          bowler.name === state.currentBowler
            ? { ...bowler, runs: bowler.runs + runs }
            : bowler
        ),
        ballTimeline: [...state.matchInfo.ballTimeline, runs],
      },
    })),
  addExtra: (type, runs = 1) =>
    set((state) => ({
      matchInfo: {
        ...state.matchInfo,
        extras: {
          ...state.matchInfo.extras,
          [type === "wide"
            ? "wides"
            : type === "noBall"
            ? "noBalls"
            : type === "bye"
            ? "byes"
            : "legByes"]:
            state.matchInfo.extras[
              type === "wide"
                ? "wides"
                : type === "noBall"
                ? "noBalls"
                : type === "bye"
                ? "byes"
                : "legByes"
            ] + runs,
          total: state.matchInfo.extras.total + runs,
        },
      },
    })),
  addWicket: () =>
    set((state) => ({
      matchInfo: {
        ...state.matchInfo,
        team1: {
          ...state.matchInfo.team1,
          score: `${state.matchInfo.team1.score.split("/")[0]}/${
            parseInt(state.matchInfo.team1.score.split("/")[1]) + 1
          }`,
        },
      },
    })),
  addBallToTimeline: (runs) =>
    set((state) => ({
      matchInfo: {
        ...state.matchInfo,
        ballTimeline: [...state.matchInfo.ballTimeline, runs],
      },
    })),
  addCommentary: (text) =>
    set((state) => ({
      matchInfo: {
        ...state.matchInfo,
        commentary: [
          {
            over: state.matchInfo.team1.overs,
            text,
            runs: state.matchInfo.ballTimeline[
              state.matchInfo.ballTimeline.length - 1
            ],
          },
          ...state.matchInfo.commentary,
        ],
      },
    })),
  updateOvers: () =>
    set((state) => {
      const updatedBowling = [...state.matchInfo.bowling];
      const currentBowlerIndex = updatedBowling.findIndex(
        (bowler) => bowler.name === state.currentBowler
      );

      if (currentBowlerIndex === -1) {
        updatedBowling.push({
          name: state.currentBowler,
          overs: "0.1",
          maidens: 0,
          runs: 0,
          wickets: 0,
        });
      } else {
        updatedBowling[currentBowlerIndex] = {
          ...updatedBowling[currentBowlerIndex],
          overs: (
            parseFloat(updatedBowling[currentBowlerIndex].overs) + 0.1
          ).toFixed(1),
        };
      }

      return {
        matchInfo: {
          ...state.matchInfo,
          team1: {
            ...state.matchInfo.team1,
            overs: ((parseFloat(state.matchInfo.team1.overs) + 0.1) % 1 === 0.6
              ? Math.floor(parseFloat(state.matchInfo.team1.overs) + 0.4) + 1
              : parseFloat(state.matchInfo.team1.overs) + 0.1
            ).toFixed(1),
          },
          bowling: updatedBowling,
        },
      };
    }),
  setStriker: (name) => set({ striker: name }),
  setNonStriker: (name) => set({ nonStriker: name }),
  swapBatsmen: () =>
    set((state) => ({
      striker: state.nonStriker,
      nonStriker: state.striker,
    })),
  setCurrentBowler: (name) => set({ currentBowler: name }),
}));
