import { useRef, useState, useEffect, Fragment } from 'react'

export default function MilestoneTimeline({ milestones = [] }) {
  const containerRef = useRef(null)
  const [needsScroll, setNeedsScroll] = useState(false)

  useEffect(() => {
    const check = () => {
      if (containerRef.current) {
        setNeedsScroll(containerRef.current.scrollWidth > containerRef.current.clientWidth + 2)
      }
    }
    check()
    const ro = new ResizeObserver(check)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [milestones.length])

  const getStatus = (status) => {
    const st = typeof status === 'number' ? status : 0
    if (st === 0) return { dot: 'bg-slate-500', line: 'bg-slate-600', label: 'text-slate-400', full: 'Pending', short: 'P' }
    if (st === 1) return { dot: 'bg-yellow-400', line: 'bg-yellow-500', label: 'text-yellow-400', full: 'Active', short: 'A' }
    if (st === 2) return { dot: 'bg-green-400', line: 'bg-green-500', label: 'text-green-400', full: 'Done', short: 'D' }
    if (st === 3) return { dot: 'bg-red-400', line: 'bg-red-500', label: 'text-red-400', full: 'Failed', short: 'F' }
    return { dot: 'bg-slate-500', line: 'bg-slate-600', label: 'text-slate-400', full: 'Pending', short: 'P' }
  }

  const approvedCount = milestones.filter(m => (typeof m.status === 'number' ? m.status : 0) === 2).length
  const count = milestones.length
  if (!count) return null

  const isCompact = count > 5

  return (
    <div className="mb-3">
      <div ref={containerRef} className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pb-1 -mx-1 px-1">
        {isCompact ? (
          <div className="flex items-start" style={{ width: `${count * 52}px` }}>
            {milestones.map((ms, i) => {
              const cfg = getStatus(ms.status)
              const msXLM = (Number(ms.amount) / 10_000_000).toFixed(0)
              const desc = ms.description.length > 5 ? ms.description.slice(0, 5) + '..' : ms.description
              const isLast = i === milestones.length - 1

              return (
                <Fragment key={i}>
                  <div className="flex flex-col items-center shrink-0" style={{ width: '48px' }}>
                    <div className="w-4 h-4 rounded-full bg-slate-800 ring-[3px] ring-slate-800 shrink-0 relative">
                      <div className={`absolute inset-0.5 rounded-full ${cfg.dot}`} />
                    </div>
                    <div className={`text-[9px] font-semibold ${cfg.label} mt-1 leading-none`}>{cfg.short}</div>
                    <div className="text-[9px] text-slate-500 text-center leading-none mt-0.5 px-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap">{desc}</div>
                    <div className={`text-[9px] font-mono ${cfg.label} leading-none mt-0.5`}>{msXLM}</div>
                  </div>
                  {!isLast && <div className={`h-0.5 shrink-0 mt-[7px] ${cfg.line}`} style={{ width: '4px' }} />}
                </Fragment>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center w-full">
            {milestones.map((ms, i) => {
              const cfg = getStatus(ms.status)
              const msXLM = (Number(ms.amount) / 10_000_000).toFixed(0)
              const desc = ms.description.length > 16 ? ms.description.slice(0, 16) + '..' : ms.description
              const isLast = i === milestones.length - 1

              return (
                <Fragment key={i}>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-slate-800 ring-[3px] ring-slate-800 shrink-0 relative">
                      <div className={`absolute inset-0.5 rounded-full ${cfg.dot}`} />
                    </div>
                    <div className={`text-xs font-semibold ${cfg.label} mt-1 leading-none`}>{cfg.full}</div>
                    <div className="text-[10px] text-slate-500 text-center leading-none mt-0.5 px-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap">{desc}</div>
                    <div className={`text-[10px] font-mono ${cfg.label} leading-none mt-0.5`}>{msXLM}</div>
                  </div>
                  {!isLast && <div className={`h-0.5 shrink-0 mx-1 ${cfg.line}`} style={{ flex: '1 1 0' }} />}
                </Fragment>
              )
            })}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
        <span>{approvedCount}/{count} completed</span>
        {needsScroll && (
          <>
            <span className="text-slate-700">|</span>
            <span className="text-slate-600">Scroll →</span>
          </>
        )}
      </div>
    </div>
  )
}
