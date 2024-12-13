import { create } from "zustand";
import { FullMatchInfo } from "@/lib/types";
export interface MatchState {
  matchInfo: {
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
  canProceed: () => boolean;
  gameStarted: boolean;
  setGameStarted: (value: boolean) => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matchInfo: {
    gameStarted: false,
    team1: {
      name: "IND",
      score: "0/0",
      overs: "00.0",
      flagUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsILCHCa-YRabNlW_ph9ALALiIvGi76lrz-A&s",
    },
    team2: {
      name: "BAN",
      score: "171/8",
      overs: "20.0",
      flagUrl:
        "https://t4.ftcdn.net/jpg/01/04/47/13/240_F_104471360_1xohRUSRjfdGxoaRDtLg2z4ztBHkT21K.jpg",
    },
    result: "India is batting",
    batting: [],
    bowling: [],
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
    set((state) => {
      if (!get().canProceed()) return state;
      if (runs === 4) {
        const batsman = state.matchInfo.batting.find(
          (batsman) => batsman.name === state.striker
        );
        if (batsman) batsman.fours += 1;
      }
      if (runs === 6) {
        const batsman = state.matchInfo.batting.find(
          (batsman) => batsman.name === state.striker
        );
        if (batsman) batsman.sixes += 1;
      }
      return {
        matchInfo: {
          ...state.matchInfo,
          team1: {
            ...state.matchInfo.team1,
            score: `${
              parseInt(state.matchInfo.team1.score.split("/")[0]) + runs
            }/${state.matchInfo.team1.score.split("/")[1]}`,
          },
          batting: state.matchInfo.batting.map((batsman) =>
            batsman.name === state.striker
              ? {
                  ...batsman,
                  runs: batsman.runs + runs,
                  balls: batsman.balls + 1,
                }
              : batsman
          ),
          bowling: state.matchInfo.bowling.map((bowler) =>
            bowler.name === state.currentBowler
              ? { ...bowler, runs: bowler.runs + runs }
              : bowler
          ),
          ballTimeline: [...state.matchInfo.ballTimeline, runs],
        },
        striker: runs % 2 === 1 ? state.nonStriker : state.striker,
        nonStriker: runs % 2 === 1 ? state.striker : state.nonStriker,
      };
    }),
  addExtra: (type, runs = 1) =>
    set((state) => {
      if (!get().canProceed()) return state;

      return {
        matchInfo: {
          ...state.matchInfo,
          team1: {
            ...state.matchInfo.team1,
            score: `${
              parseInt(state.matchInfo.team1.score.split("/")[0]) + runs
            }/${parseInt(state.matchInfo.team1.score.split("/")[1])}`,
          },
          bowling: state.matchInfo.bowling.map((bowler) =>
            bowler.name === state.currentBowler
              ? { ...bowler, runs: bowler.runs + runs }
              : bowler
          ),
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
      };
    }),
  addWicket: () =>
    set((state) => {
      if (!get().canProceed()) return state;
      return {
        matchInfo: {
          ...state.matchInfo,
          ballTimeline: [...state.matchInfo.ballTimeline, "w"],
          batting: state.matchInfo.batting.map((batsman) =>
            batsman.name === state.striker
              ? { ...batsman, balls: batsman.balls + 1 }
              : batsman
          ),
          team1: {
            ...state.matchInfo.team1,
            score: `${state.matchInfo.team1.score.split("/")[0]}/${
              parseInt(state.matchInfo.team1.score.split("/")[1]) + 1
            }`,
          },
          bowling: state.matchInfo.bowling.map((bowler) =>
            bowler.name === state.currentBowler
              ? { ...bowler, wickets: bowler.wickets + 1 }
              : bowler
          ),
        },
      };
    }),
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
            ] as number,
          },
          ...state.matchInfo.commentary,
        ],
      },
    })),
  updateOvers: () =>
    set((state) => {
      const currentTeamOvers = parseFloat(state.matchInfo.team1.overs);
      const currentBowlerOvers = parseFloat(
        state.currentBowler
          ? state.matchInfo.bowling.find((b) => b.name === state.currentBowler)
              ?.overs || "0.0"
          : "0.0"
      );
      const newTeamOvers = ((currentTeamOvers * 10 + 1) / 10).toFixed(1);
      const newBowlerOvers = ((currentBowlerOvers * 10 + 1) / 10).toFixed(1);

      return {
        matchInfo: {
          ...state.matchInfo,
          team1: {
            ...state.matchInfo.team1,
            overs:
              parseFloat(newTeamOvers.split(".")[1]) === 6
                ? `${parseInt(newTeamOvers) + 1}.0`
                : newTeamOvers,
          },
          bowling: state.matchInfo.bowling.map((bowler) =>
            bowler.name === state.currentBowler
              ? {
                  ...bowler,
                  overs:
                    parseFloat(newBowlerOvers.split(".")[1]) === 6
                      ? `${parseInt(newBowlerOvers) + 1}.0`
                      : newBowlerOvers,
                }
              : bowler
          ),
        },
      };
    }),
  setStriker: (name) =>
    set((state) => {
      const battingArray = state.matchInfo.batting;
      if (!battingArray.some((batsman) => batsman.name === name)) {
        // If batsman doesn't exist, add them to the batting array
        battingArray.push({
          name: name,
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
        });
      }
      return {
        striker: name,
        matchInfo: {
          ...state.matchInfo,
          batting: battingArray,
        },
      };
    }),
  setNonStriker: (name) =>
    set((state) => {
      const battingArray = state.matchInfo.batting;
      if (!battingArray.some((batsman) => batsman.name === name)) {
        // If batsman doesn't exist, add them to the batting array
        battingArray.push({
          name: name,
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
        });
      }
      return {
        nonStriker: name,
        matchInfo: {
          ...state.matchInfo,
          batting: battingArray,
        },
      };
    }),
  swapBatsmen: () =>
    set((state) => ({
      striker: state.nonStriker,
      nonStriker: state.striker,
    })),
  setCurrentBowler: (name) =>
    set((state) => {
      const bowlingArray = state.matchInfo.bowling;
      if (!bowlingArray.some((bowler) => bowler.name === name)) {
        // If bowler doesn't exist, add them to the bowling array
        bowlingArray.push({
          name: name,
          overs: "0.0",
          maidens: 0,
          runs: 0,
          wickets: 0,
        });
      }
      return {
        currentBowler: name,
        matchInfo: {
          ...state.matchInfo,
          bowling: bowlingArray,
        },
      };
    }),
  canProceed: () => {
    const state = get();
    return (
      state.matchInfo.batting.length > 0 &&
      state.matchInfo.bowling.length > 0 &&
      state.striker !== "" &&
      state.nonStriker !== "" &&
      state.currentBowler !== ""
    );
  },
  gameStarted: false,
  setGameStarted: (value) => set({ gameStarted: value }),
}));

export const useFullMatchStore = create<{
  matchInfo: FullMatchInfo;
  setMatchInfo: (matchInfo: FullMatchInfo) => void;
}>((set) => ({
  matchInfo: {
    gameStarted: false,
    team1: {
      name: "IND",
      score: "0/0",
      overs: "00.0",
      flagUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsILCHCa-YRabNlW_ph9ALALiIvGi76lrz-A&s",
    },
    team2: {
      name: "BAN",
      score: "171/8",
      overs: "20.0",
      flagUrl:
        "https://t4.ftcdn.net/jpg/01/04/47/13/240_F_104471360_1xohRUSRjfdGxoaRDtLg2z4ztBHkT21K.jpg",
    },
    result: "India is batting",
    batting: [],
    bowling: [],
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
    striker: "",
    nonStriker: "",
    currentBowler: "",
  },
  setMatchInfo: (matchInfo) => set({ matchInfo }),
}));
