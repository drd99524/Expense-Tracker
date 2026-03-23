"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent
} from "react";
import { cn } from "@/lib/cn";
import {
  budgetPeriods,
  formatCurrency,
  type BudgetPeriod,
  type BudgetTheme
} from "@/features/budget/lib/budget-theme";
import type { DashboardSnapshot } from "../data/dashboard-preview";

type SpendingGraphCardProps = {
  snapshot: DashboardSnapshot;
  selectedPeriod: BudgetPeriod;
  onPeriodChange: (period: BudgetPeriod) => void;
  theme: BudgetTheme;
};

const chartWidth = 320;
const chartHeight = 180;
const baseline = 142;
const sidePadding = 18;
const topPadding = 22;

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function createSmoothPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const controlX1 = current.x + (next.x - current.x) * 0.38;
    const controlX2 = current.x + (next.x - current.x) * 0.62;

    path += ` C ${controlX1} ${current.y}, ${controlX2} ${next.y}, ${next.x} ${next.y}`;
  }

  return path;
}

function createAreaPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";

  const first = points[0];
  const last = points[points.length - 1];

  return `${createSmoothPath(points)} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
}

function useLiquidSeries(targetSeries: readonly number[]) {
  const [displaySeries, setDisplaySeries] = useState<number[]>(
    Array.from(targetSeries)
  );
  const latestSeriesRef = useRef<number[]>(Array.from(targetSeries));

  useEffect(() => {
    const fromSeries = latestSeriesRef.current;
    const toSeries = Array.from(targetSeries);
    const startedAt = performance.now();
    let frameId = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / 520, 1);
      const eased = easeOutCubic(progress);

      const nextSeries = toSeries.map((value, index) => {
        const from = fromSeries[index] ?? fromSeries[fromSeries.length - 1] ?? value;

        return from + (value - from) * eased;
      });

      latestSeriesRef.current = nextSeries;
      setDisplaySeries(nextSeries);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [targetSeries]);

  useEffect(() => {
    let frameId = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const seconds = (now - start) / 1000;

      setDisplaySeries((current) =>
        current.map((value, index) => {
          const target = latestSeriesRef.current[index] ?? value;
          const wave =
            Math.sin(seconds * 1.7 + index * 0.7) * target * 0.01 +
            Math.cos(seconds * 1.1 + index * 0.45) * target * 0.006;

          return target + wave;
        })
      );

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return displaySeries;
}

export function SpendingGraphCard({
  snapshot,
  selectedPeriod,
  onPeriodChange,
  theme
}: SpendingGraphCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const series = useLiquidSeries(snapshot.chartPoints);

  useEffect(() => {
    setActiveIndex(null);
  }, [selectedPeriod]);

  const points = useMemo(() => {
    const max = Math.max(...series, 1);
    const min = Math.min(...series, 0);
    const range = Math.max(max - min, 1);

    return series.map((value, index) => {
      const normalized = (value - min) / range;
      const x =
        sidePadding +
        (index * (chartWidth - sidePadding * 2)) / (series.length - 1);
      const y =
        baseline - normalized * (baseline - topPadding);

      return {
        x,
        y,
        value: Math.round(snapshot.chartPoints[index] ?? value)
      };
    });
  }, [series, snapshot.chartPoints]);

  const linePath = useMemo(() => createSmoothPath(points), [points]);
  const areaPath = useMemo(() => createAreaPath(points), [points]);
  const activePoint = activeIndex === null ? null : points[activeIndex];

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * chartWidth;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    points.forEach((point, index) => {
      const distance = Math.abs(point.x - pointerX);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }

  return (
    <section
      className={`overflow-hidden rounded-[30px] border bg-[#060606]/85 p-4 ${theme.subtleBorderClass} ${theme.glowClass}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            Spending Graph
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {formatCurrency(snapshot.totalSpent)}
          </h2>
        </div>

        <div
          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass}`}
        >
          {theme.label}
        </div>
      </div>

      <div className="mt-4 rounded-[26px] border border-white/8 bg-black/45 p-4">
        <div className="relative h-[220px] w-full">
          {activePoint ? (
            <div
              className={`pointer-events-none absolute right-2 top-2 z-10 rounded-2xl border bg-black/80 px-3 py-2 text-right ${theme.subtleBorderClass}`}
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Point value
              </p>
              <p className={`mt-1 text-sm font-semibold ${theme.accentTextClass}`}>
                {formatCurrency(activePoint.value)}
              </p>
            </div>
          ) : null}

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-full w-full"
            preserveAspectRatio="none"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setActiveIndex(null)}
          >
            <defs>
              <linearGradient id="dashboard-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={theme.graphStart} />
                <stop offset="100%" stopColor={theme.graphEnd} />
              </linearGradient>
              <linearGradient id="dashboard-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={theme.graphFill} />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {[42, 76, 110].map((line) => (
              <line
                key={line}
                x1="0"
                x2={chartWidth}
                y1={line}
                y2={line}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="5 8"
              />
            ))}

            <path d={areaPath} fill="url(#dashboard-fill)" />

            <path
              d={linePath}
              fill="none"
              stroke="url(#dashboard-line)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point, index) => (
              <g key={index}>
                {activeIndex === index ? (
                  <>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="11"
                      fill={theme.graphStart}
                      fillOpacity="0.18"
                    />
                    <line
                      x1={point.x}
                      x2={point.x}
                      y1={point.y}
                      y2={baseline}
                      stroke={theme.graphEnd}
                      strokeOpacity="0.35"
                      strokeDasharray="4 7"
                    />
                  </>
                ) : null}

                <circle
                  cx={point.x}
                  cy={point.y}
                  r={activeIndex === index ? "4.2" : "3"}
                  fill={theme.graphStart}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {budgetPeriods.map((period) => (
            <button
              key={period.id}
              type="button"
              onClick={() => onPeriodChange(period.id)}
              className={cn(
                "w-full rounded-full px-0 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-200",
                selectedPeriod === period.id
                  ? `${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass} border`
                  : "border border-white/10 bg-white/[0.03] text-white/50"
              )}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
