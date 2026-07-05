import useStore from '../store'

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  if (isNaN(then)) return ''
  const seconds = Math.floor((now - then) / 1000)
  if (seconds < 10) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function buildLeaderboard(recentDonors) {
  const grouped = {}
  recentDonors.forEach((d) => {
    const amt = Number(d.amount) || 0
    grouped[d.address] = (grouped[d.address] || 0) + amt
  })
  return Object.entries(grouped)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([address, total]) => ({ address, total }))
}

const RANK_COLORS = ['text-yellow-400', 'text-slate-300', 'text-orange-400']
const RANK_BG = ['bg-yellow-500/20', 'bg-slate-300/20', 'bg-orange-400/20']

export default function RecentDonations() {
  const recentDonors = useStore((s) => s.recentDonors)
  const donationCount = useStore((s) => s.donationCount)
  const publicKey = useStore((s) => s.publicKey)

  const topDonors = buildLeaderboard(recentDonors)
  const maxAmount = topDonors[0]?.total || 1

  return (
    <div className="mt-6 pt-5 border-t border-slate-700">
      {topDonors.length > 0 && (
        <div className="mb-4 pb-4 border-b border-slate-700/50">
          <div className="text-sm font-semibold text-slate-300 mb-3">Top Donors</div>
          <div className="space-y-2.5">
            {topDonors.map((d, i) => {
              const isYou = publicKey && d.address === publicKey
              const pct = (d.total / maxAmount) * 100
              const xlm = (d.total / 10_000_000).toFixed(0)

              return (
                <div key={d.address} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${RANK_BG[i]} flex items-center justify-center shrink-0`}>
                    <span className={`text-[10px] font-bold ${RANK_COLORS[i]}`}>{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {isYou ? <span className="text-cyan-400 font-semibold">You</span> : `${d.address.slice(0, 6)}...${d.address.slice(-4)}`}
                      </span>
                      <span className="text-[10px] font-semibold text-cyan-400 font-mono shrink-0 ml-2">{xlm} XLM</span>
                    </div>
                    <div className="w-full h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-semibold text-slate-300">
          Recent Donations
        </div>
        {donationCount > 0 && (
          <div className="text-[10px] text-slate-500">
            {donationCount} total
          </div>
        )}
      </div>
      {recentDonors.length > 0 ? (
        recentDonors.map((d, i) => {
          const isYou = publicKey && d.address === publicKey
          return (
            <div
              key={d.tx || i}
              className="flex justify-between items-center py-2 border-b border-slate-800 last:border-b-0"
            >
              <div>
                <div className="text-xs font-mono">
                  {isYou ? (
                    <span className="text-cyan-400 font-semibold">You</span>
                  ) : (
                    <span className="text-slate-400">
                      {d.address.slice(0, 6)}...{d.address.slice(-4)}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-600">
                  {timeAgo(d.time)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-cyan-400">
                  {(parseFloat(d.amount) / 10_000_000).toFixed(2)} XLM
                </div>
                {d.tx && (
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${d.tx}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-slate-600 hover:text-cyan-400 transition-colors"
                  >
                    view tx
                  </a>
                )}
              </div>
            </div>
          )
        })
      ) : (
        <div className="text-xs text-slate-600 text-center py-4">
          No donations yet. Be the first!
        </div>
      )}
    </div>
  )
}
