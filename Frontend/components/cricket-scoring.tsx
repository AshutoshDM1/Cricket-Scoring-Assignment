"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { ToggleMode } from "./ToggleMode";
import { useMatchStore } from "@/store/matchStore";
import { BangladeshBowlers, IndiaPlayers } from "@/player";

export default function CricketScoring() {
  const [isMuted, setIsMuted] = useState(false);
  const striker = useMatchStore((state) => state.striker);
  const nonStriker = useMatchStore((state) => state.nonStriker);
  const setStriker = useMatchStore((state) => state.setStriker);
  const setNonStriker = useMatchStore((state) => state.setNonStriker);
  const swapBatsmen = useMatchStore((state) => state.swapBatsmen);
  const addRuns = useMatchStore((state) => state.addRuns);
  const addExtra = useMatchStore((state) => state.addExtra);
  const addWicket = useMatchStore((state) => state.addWicket);
  const addCommentary = useMatchStore((state) => state.addCommentary);
  const updateOvers = useMatchStore((state) => state.updateOvers);
  // const currentBowler = useMatchStore((state) => state.currentBowler);
  const setCurrentBowler = useMatchStore((state) => state.setCurrentBowler);

  const handleBallStart = () => {
    addCommentary("Ball started");
  };

  const handleRuns = (runs: number) => {
    addRuns(runs);
    updateOvers();
    addCommentary(`${runs} runs scored`);
  };

  const handleExtra = (
    type: "wide" | "noBall" | "bye" | "legBye",
    runs: number = 1
  ) => {
    addExtra(type, runs);
    addCommentary(`${type} - ${runs} runs`);
  };

  const handleWicket = () => {
    addWicket();
    updateOvers();
    addCommentary("WICKET!");
  };

  return (
    <div className="w-full max-w-5xl space-y-6 p-4 border rounded-md ">
      <div className="flex gap-4 items-end">
        <div className="space-y-2 flex-1">
          <Label>Batsman (Striker)</Label>
          <Select value={striker} onValueChange={setStriker}>
            <SelectTrigger>
              <SelectValue placeholder="Select striker" />
            </SelectTrigger>
            <SelectContent>
              {IndiaPlayers.map((player) => (
                <SelectItem key={player} value={player}>
                  {player}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="ghost" onClick={swapBatsmen} className="px-3 self-end">
          <ArrowRightLeft className="h-5 w-5 " />
        </Button>
        <div className="space-y-2 flex-1">
          <Label>Batsman (Non Striker)</Label>
          <Select value={nonStriker} onValueChange={setNonStriker}>
            <SelectTrigger>
              <SelectValue placeholder="Select non-striker" />
            </SelectTrigger>
            <SelectContent>
              {IndiaPlayers.map((player) => (
                <SelectItem key={player} value={player}>
                  {player}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 flex-1">
          <Label>Bowler</Label>
          <Select onValueChange={setCurrentBowler}>
            <SelectTrigger>
              <SelectValue placeholder="Select bowler" />
            </SelectTrigger>
            <SelectContent>
              {BangladeshBowlers.map((player) => (
                <SelectItem key={player} value={player}>
                  {player}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Score Controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label className="text-base">Score:</Label>
          <div className="text-sm text-muted-foreground">Extra:</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="mute" className="text-sm">
              Mute & Test Off
            </Label>
            <Switch id="mute" checked={isMuted} onCheckedChange={setIsMuted} />
          </div>
          <div className="flex items-center gap-2">
            <ToggleMode />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2  ">
        <div className="flex gap-2">
          <div className="grid grid-rows-3 gap-2 w-1/3 font-bold">
            <Button
              className="bg-green-600 hover:bg-green-700 py-10 text-white"
              onClick={handleBallStart}
            >
              Ball Start
            </Button>
            <Button
              className="bg-amber-700 hover:bg-amber-800 py-10 text-white"
              onClick={() => handleExtra("wide")}
            >
              Wide
            </Button>
            <Button
              className="bg-indigo-700 hover:bg-indigo-900 py-10 text-white"
              onClick={() => handleExtra("noBall")}
            >
              No Ball
            </Button>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 w-full gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 h-full text-white"
              onClick={() => handleRuns(0)}
            >
              0
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-900 h-full text-white"
              onClick={() => handleRuns(1)}
            >
              1
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 h-full text-white"
              onClick={handleWicket}
            >
              Wicket
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 h-full text-white"
              onClick={() => handleRuns(2)}
            >
              2
            </Button>
            <Button
              className="bg-emerald-400 hover:bg-emerald-500 h-full text-white"
              onClick={() => handleRuns(4)}
            >
              4
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500 h-full text-white"
              onClick={() => handleRuns(6)}
            >
              6
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 w-full">
          <Button
            className="bg-teal-800 hover:bg-teal-900 py-7 text-white"
            onClick={() => handleExtra("bye")}
          >
            Bye
          </Button>
          <Button
            className="bg-cyan-500 hover:bg-cyan-600 py-7 text-white"
            onClick={() => handleExtra("legBye")}
          >
            Leg Bye
          </Button>
          <Button className="bg-purple-700 hover:bg-purple-800 py-7 text-white">
            Bowler Stop
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 py-7 text-white">
            1 or 2
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600 py-7 text-white">
            2 or 4
          </Button>

          <Button className="bg-amber-800 hover:bg-amber-900 py-7 text-white">
            4 or 6
          </Button>
          <Button className="bg-purple-700 hover:bg-purple-800 py-7 text-white">
            Ball in Air
          </Button>

          <Button className="bg-teal-800 hover:bg-teal-900 py-7 text-white">
            Other
          </Button>
          <Button className="bg-purple-800 hover:bg-purple-900 py-7 text-white">
            3
          </Button>
          <Button className="bg-teal-800 hover:bg-teal-900 py-7 text-white">
            Boundary Check
          </Button>
          <Button className="bg-green-800 hover:bg-green-900 py-7 text-white">
            Appeal
          </Button>
          <Button className="bg-teal-800 hover:bg-teal-900 py-7 text-white">
            Catch Drop
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2 w-full">
          <Button className="bg-gray-600 hover:bg-gray-700 py-9 text-white">
            Third Umpire
          </Button>
          <Button className="bg-red-700 hover:bg-red-800 py-9 text-white">
            Review
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 py-9 text-white">
            Bye
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 py-9 text-white">
            Leg Bye
          </Button>
          <Button className="bg-green-800 hover:bg-green-900 py-9 text-white">
            Done
          </Button>
          <Button className="bg-blue-800 hover:bg-blue-900 py-9 text-white">
            Misfield
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 py-9 text-white">
            Overthrow
          </Button>
          <Button className="bg-red-800 hover:bg-red-900 py-9 text-white">
            Wicket Confirm
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center">
        <Button variant="outline" className="w-full max-w-xs">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Scoring
        </Button>
      </div>
    </div>
  );
}