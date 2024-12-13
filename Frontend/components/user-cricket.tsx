"use client";
import { useEffect } from "react";
import { useFullMatchStore } from "@/store/matchStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info, Search, X } from "lucide-react";
import { toast } from "sonner";
import { FullMatchInfo } from "@/lib/types";

export default function UserCricketScorecard() {
  const { matchInfo, setMatchInfo } = useFullMatchStore();

  useEffect(() => {
    const ws = new WebSocket("wss://cricket-scoring-assignment.onrender.com");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      toast.success("WebSocket connection established");  
    };

    ws.onmessage = (event) => {
      try {
        const newMatchInfo: FullMatchInfo = JSON.parse(event.data);

        setMatchInfo(newMatchInfo);
        toast.success("Match info updated");
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.log(error);
      toast.error("WebSocket connection error");
    };

    ws.onclose = () => {
      toast.error("Connection lost. Attempting to reconnect...");
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronDown className="h-5 w-5" />
            <span className="font-semibold ">Scorecard</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="rounded-md overflow-hidden border-[1px]">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={matchInfo.team1.flagUrl}
                  alt={matchInfo.team1.name}
                  className="w-6 h-4"
                />
                <span className="font-medium">{matchInfo.team1.name}</span>
              </div>
              <div className="flex flex-col items-center border rounded-md p-2">
                <div className="font-semibold">{matchInfo.team1.score}</div>
                <div className="text-sm text-muted-foreground">
                  Over {matchInfo.team1.overs}
                </div>
              </div>
            </div>
            <div className="text-sm font-medium">vs</div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={matchInfo.team2.flagUrl}
                  alt={matchInfo.team2.name}
                  className="w-6 h-4"
                />
                <span className="font-medium">{matchInfo.team2.name}</span>
              </div>
              <div className="flex flex-col items-center border rounded-md p-2">
                <div className="font-semibold">{matchInfo.team2.score}</div>
                <div className="text-sm text-muted-foreground">
                  Over {matchInfo.team2.overs}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-center bg-foreground/5 font-semibold py-2">
            {matchInfo.result}
          </div>
        </div>

        <Table>
          <TableHeader className="bg-foreground/5">
            <TableRow>
              <TableHead>Batsman</TableHead>
              <TableHead className="text-right">R</TableHead>
              <TableHead className="text-right">B</TableHead>
              <TableHead className="text-right">4s</TableHead>
              <TableHead className="text-right">6s</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchInfo.batting.length === 0 ? (
              <>
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No batsmen yet
                  </TableCell>
                </TableRow>
              </>
            ) : (
              matchInfo.batting.map((batter, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={
                      batter.name === matchInfo.striker ? "text-green-500" : ""
                    }
                  >
                    {batter.name}
                    {(batter.name === matchInfo.striker ||
                      batter.name === matchInfo.nonStriker) &&
                      "*"}
                  </TableCell>
                  <TableCell className="text-right">{batter.runs}</TableCell>
                  <TableCell className="text-right">{batter.balls}</TableCell>
                  <TableCell className="text-right">{batter.fours}</TableCell>
                  <TableCell className="text-right">{batter.sixes}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Table>
          <TableHeader className="bg-foreground/5">
            <TableRow>
              <TableHead>Bowler</TableHead>
              <TableHead className="text-right">O</TableHead>
              <TableHead className="text-right">M</TableHead>
              <TableHead className="text-right">R</TableHead>
              <TableHead className="text-right">W</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchInfo.bowling.map((bowler, index) => (
              <TableRow key={index}>
                <TableCell>{bowler.name}</TableCell>
                <TableCell className="text-right">{bowler.overs}</TableCell>
                <TableCell className="text-right">{bowler.maidens}</TableCell>
                <TableCell className="text-right">{bowler.runs}</TableCell>
                <TableCell className="text-right">{bowler.wickets}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="space-y-2 ">
          <div
            className="flex gap-1 overflow-x-hidden max-w-full scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
            ref={(el) => {
              if (el) {
                el.scrollLeft = el.scrollWidth;
              }
            }}
          >
            {matchInfo.ballTimeline.map((runs, index) => (
              <div
                key={index}
                className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-xs border rounded"
              >
                {runs}
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Extra: {matchInfo.extras.total} (b {matchInfo.extras.byes}, lb{" "}
            {matchInfo.extras.legByes}, wd {matchInfo.extras.wides}, nb{" "}
            {matchInfo.extras.noBalls}, P {matchInfo.extras.penalty})
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-5">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="default size"
              className="flex-1 text-sm border rounded px-2 py-1"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="min-h-[200px] max-h-[200px] overflow-y-hidden flex flex-col gap-1">
            {matchInfo.commentary.map((ball, index) => (
              <div
                key={index}
                className="flex items-start gap-2 rounded-lg transition-colors ease-in-out duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-xs font-medium">
                  {ball.runs}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold ">{ball.over}</div>
                  <div className="text-sm">{ball.text}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
