"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Info, Search, X, RefreshCcw } from "lucide-react";

export default function FullCricketScorecard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const commentary = [
    { over: "19.6", text: "Nitish Kumar Reddy to Tanzim Hasan Sakib: 1 run." },
    {
      over: "19.5",
      text: "Nitish Kumar Reddy to Towhid Hridoy: 1 run. Catch Drop.",
    },
    { over: "19.4", text: "Nitish Kumar Reddy to Towhid Hridoy: 0 run." },
    { over: "19.3", text: "Nitish Kumar Reddy to Tanzim Hasan Sakib: 1 run." },
    {
      over: "19.2",
      text: "Nitish Kumar Reddy to Towhid Hridoy: 4 runs. Beautiful cover drive!",
    },
    { over: "19.1", text: "Nitish Kumar Reddy to Tanzim Hasan Sakib: 1 run." },
  ];

  const filteredCommentary = commentary.filter((ball) =>
    ball.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
            <span className="font-medium">Scorecard</span>
          </div>
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-800 transition-colors h-auto p-0"
          >
            View Full Score Card
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Match Summary */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <img src="/ind-flag.svg" alt="India" className="w-8 h-6" />
                <span className="font-medium text-lg">IND</span>
              </div>
              <div className="font-semibold text-2xl">297/6</div>
              <div className="text-sm text-muted-foreground">Over 20.0</div>
            </div>
            <div className="text-lg font-medium">vs</div>
            <div className="text-center">
              <div className="flex items-center gap-2">
                <img src="/ban-flag.svg" alt="Bangladesh" className="w-8 h-6" />
                <span className="font-medium text-lg">BAN</span>
              </div>
              <div className="font-semibold text-2xl">164/7*</div>
              <div className="text-sm text-muted-foreground">Over 20.0</div>
            </div>
          </div>

          <div className="text-center font-medium text-lg text-green-600 bg-green-50 py-2 rounded-lg">
            India won by 133 runs
          </div>

          <Tabs defaultValue="batting" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="batting">Batting</TabsTrigger>
              <TabsTrigger value="bowling">Bowling</TabsTrigger>
            </TabsList>
            <TabsContent value="batting">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batsman</TableHead>
                    <TableHead className="text-right">R</TableHead>
                    <TableHead className="text-right">B</TableHead>
                    <TableHead className="text-right">4s</TableHead>
                    <TableHead className="text-right">6s</TableHead>
                    <TableHead className="text-right">SR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Tanzim Hasan Sakib*</TableCell>
                    <TableCell className="text-right">8</TableCell>
                    <TableCell className="text-right">8</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">0</TableCell>
                    <TableCell className="text-right">100.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Towhid Hridoy</TableCell>
                    <TableCell className="text-right">63</TableCell>
                    <TableCell className="text-right">42</TableCell>
                    <TableCell className="text-right">5</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right">150.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="bowling">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bowler</TableHead>
                    <TableHead className="text-right">O</TableHead>
                    <TableHead className="text-right">M</TableHead>
                    <TableHead className="text-right">R</TableHead>
                    <TableHead className="text-right">W</TableHead>
                    <TableHead className="text-right">Econ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Nitish Kumar Reddy*</TableCell>
                    <TableCell className="text-right">3.0</TableCell>
                    <TableCell className="text-right">0</TableCell>
                    <TableCell className="text-right">31</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">10.33</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mayank Yadav</TableCell>
                    <TableCell className="text-right">3.2</TableCell>
                    <TableCell className="text-right">0</TableCell>
                    <TableCell className="text-right">32</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right">9.60</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          {/* Ball Timeline */}
          <div className="space-y-2">
            <h3 className="font-medium">Last 24 Balls</h3>
            <div className="flex flex-wrap gap-1">
              {[
                1, 1, 0, 1, 1, 4, 1, 1, 0, 0, 4, 0, 0, 4, 1, 6, 0, 1, 2, 1, 0,
                4, 1, 0,
              ].map((runs, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-medium border rounded-full
                    ${
                      runs === 0
                        ? "bg-red-100"
                        : runs === 4
                        ? "bg-blue-100"
                        : runs === 6
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                >
                  {runs}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Extra: 11 (b 0, lb 4, wd 6, nb 1, P 0)
            </div>
          </div>

          {/* Commentary Timeline */}
          <div className="space-y-4">
            <h3 className="font-medium">Commentary</h3>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search commentary"
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {filteredCommentary.map((ball, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{ball.over}</div>
                    <div className="text-sm">{ball.text}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="w-full max-w-xs"
              onClick={() => alert("Refreshing scorecard...")}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh Scorecard
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
