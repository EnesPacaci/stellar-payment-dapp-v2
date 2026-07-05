import { useState } from 'react'
import useStore from '../store'

export default function CreateCampaign({ onSubmit }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [deadlineDays, setDeadlineDays] = useState('30')
  const [error, setError] = useState('')
  const [milestones, setMilestones] = useState([
    { amount: '', description: '' },
  ])
  const isSending = useStore((s) => s.isSending)
  const publicKey = useStore((s) => s.publicKey)
  const status = useStore((s) => s.status)

  const addMilestone = () => {
    setMilestones([...milestones, { amount: '', description: '' }])
  }

  const removeMilestone = (index) => {
    if (milestones.length <= 1) return
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const updateMilestone = (index, field, value) => {
    const updated = [...milestones]
    updated[index] = { ...updated[index], [field]: value }
    setMilestones(updated)
  }

  const distributeEqually = () => {
    const g = parseFloat(goal)
    if (!g || g <= 0 || milestones.length === 0) return
    const perMs = Math.floor(g / milestones.length)
    let remainder = g - perMs * milestones.length
    const updated = milestones.map((m, i) => ({
      ...m,
      amount: i === milestones.length - 1 ? (perMs + remainder).toString() : perMs.toString(),
    }))
    setMilestones(updated)
  }

  const milestoneTotal = milestones.reduce(
    (sum, m) => sum + (parseFloat(m.amount) || 0),
    0
  )
  const goalNum = parseFloat(goal) || 0
  const remaining = goalNum - milestoneTotal
  const isBalanced = goalNum > 0 && Math.abs(remaining) < 0.01
  const isOver = goalNum > 0 && remaining < -0.01
  const isUnder = goalNum > 0 && remaining > 0.01
  const milestonesMatch = isBalanced

  const fillRemaining = () => {
    if (!goalNum || goalNum <= 0) return
    const emptyIndices = milestones
      .map((m, i) => ({ i, empty: !m.amount || parseFloat(m.amount) <= 0 }))
      .filter((x) => x.empty)
    if (emptyIndices.length !== 1 || emptyIndices[0].i !== milestones.length - 1) return
    const updated = [...milestones]
    updated[milestones.length - 1] = { ...updated[milestones.length - 1], amount: remaining.toFixed(0) }
    setMilestones(updated)
  }

  const emptyMilestoneCount = milestones.filter((m) => !m.amount || parseFloat(m.amount) <= 0).length
  const canFillRemaining = goalNum > 0 && remaining > 0 && emptyMilestoneCount === 1 && (!milestones[milestones.length - 1].amount || parseFloat(milestones[milestones.length - 1].amount) <= 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (isSending) return
    if (!name.trim()) { setError('Campaign name is required.'); return }
    if (!goal || parseFloat(goal) <= 0) { setError('Valid funding goal is required.'); return }
    if (!deadlineDays || parseInt(deadlineDays) <= 0) { setError('Valid deadline is required.'); return }
    if (milestones.some((m) => !m.amount || parseFloat(m.amount) <= 0 || !m.description.trim())) {
      setError('All milestones must have a description and valid amount.'); return
    }
    if (!milestonesMatch) { setError('Milestone total must match the funding goal.'); return }

    const deadlineTs = Math.floor(Date.now() / 1000) + parseInt(deadlineDays) * 86400
    const msData = milestones.map((m) => ({
      amount: m.amount,
      description: m.description.trim(),
    }))
    onSubmit(name.trim(), goal, deadlineTs, msData)
  }

  return (
    <div className="bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-4">
        {isSending ? 'Creating Campaign...' : 'Create New Campaign'}
      </h3>

      {!publicKey ? (
        <p className="text-center text-slate-500 text-sm">
          Connect your wallet to create a campaign.
        </p>
      ) : isSending ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-5"></div>
          <p className="text-cyan-400 text-sm font-semibold mb-2">Transaction in progress...</p>
          {status && (
            <p className="text-slate-400 text-xs animate-pulse">{status}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Campaign Name
            </label>
            <input
              type="text"
              placeholder="e.g. Community Garden Fund"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              disabled={isSending}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm outline-none transition-colors focus:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Funding Goal (XLM)
            </label>
            <input
              type="number"
              placeholder="e.g. 1000"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              min="1"
              step="1"
              disabled={isSending}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-mono text-sm outline-none transition-colors focus:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Deadline (days from now)
            </label>
            <input
              type="number"
              placeholder="e.g. 30"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(e.target.value)}
              min="1"
              step="1"
              disabled={isSending}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-mono text-sm outline-none transition-colors focus:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-300">Milestones</label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {goalNum > 0 && milestones.length > 0 && (
                    <button
                      type="button"
                      onClick={distributeEqually}
                      disabled={isSending}
                      className="text-[10px] px-2 py-1 rounded border border-slate-700 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors disabled:opacity-50"
                    >
                      Equal
                    </button>
                  )}
                  {canFillRemaining && (
                    <button
                      type="button"
                      onClick={fillRemaining}
                      disabled={isSending}
                      className="text-[10px] px-2 py-1 rounded border border-slate-700 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors disabled:opacity-50"
                      title={`Fill last milestone with remaining ${remaining.toFixed(0)} XLM`}
                    >
                      Fill Last
                    </button>
                  )}
                </div>
                {goalNum > 0 && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isBalanced ? 'bg-green-500/10 text-green-400' : isOver ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {isBalanced ? 'Balanced ✅' : isOver ? `${Math.abs(remaining).toFixed(0)} over` : `${remaining.toFixed(0)} left`}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400">Phase {i + 1}</span>
                    <div className="flex items-center gap-2">
                      {milestones.length > 1 && !isSending && (
                        <button
                          type="button"
                          onClick={() => removeMilestone(i)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Description"
                    value={m.description}
                    onChange={(e) => updateMilestone(i, 'description', e.target.value)}
                    disabled={isSending}
                    className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800 text-white text-xs outline-none mb-2 focus:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    type="number"
                    placeholder="Amount (XLM)"
                    value={m.amount}
                    onChange={(e) => updateMilestone(i, 'amount', e.target.value)}
                    min="1"
                    disabled={isSending}
                    className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-800 text-white text-xs font-mono outline-none focus:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              ))}
            </div>

            {!isSending && (
              <button
                type="button"
                onClick={addMilestone}
                className="w-full mt-2 py-2 text-xs text-slate-400 border border-dashed border-slate-700 rounded-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
              >
                + Add Milestone
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={`w-full py-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${
              isSending
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-400 text-slate-900 cursor-pointer hover:bg-cyan-300'
            }`}
          >
            {isSending ? 'Creating...' : 'Create Campaign'}
          </button>
          {error && (
            <p className="mt-3 text-center text-xs text-red-400">{error}</p>
          )}
          {status && (
            <p className="mt-3 text-center text-xs text-slate-400 animate-pulse">{status}</p>
          )}
        </form>
      )}
    </div>
  )
}
