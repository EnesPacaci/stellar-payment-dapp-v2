import { useState, useEffect } from 'react'
import useStore from '../store'

const STEPS = [
  { id: 'connect', label: 'Connect your wallet', icon: '🔌' },
  { id: 'xlm', label: 'Get testnet XLM', icon: '💎' },
  { id: 'campaign', label: 'Select a campaign', icon: '📋' },
  { id: 'donate', label: 'Make a donation', icon: '🎯' },
  { id: 'vote', label: 'Vote on milestones', icon: '🗳️' },
  { id: 'nft', label: 'Check your NFTs', icon: '🏆' },
]

export default function OnboardingGuide() {
  const { publicKey, balance, selectedCampaign, donationCount, nftTokens } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const [fundingXlm, setFundingXlm] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('onboarding_seen')
    if (!seen) {
      setIsOpen(true)
      localStorage.setItem('onboarding_seen', 'true')
    }
  }, [])

  const hasVoted = selectedCampaign?.milestones?.some(m => m.hasVoted) || false

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 'connect': return !!publicKey
      case 'xlm': return balance && parseFloat(balance) > 0
      case 'campaign': return !!selectedCampaign
      case 'donate': return donationCount > 0
      case 'vote': return hasVoted
      case 'nft': return nftTokens.length > 0
      default: return false
    }
  }

  const completedCount = STEPS.filter(s => isStepComplete(s.id)).length
  const totalSteps = STEPS.length

  const handleFriendbot = async () => {
    if (!publicKey) return
    setFundingXlm(true)
    try {
      const res = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`)
      if (!res.ok) throw new Error('Friendbot request failed')
      await res.json()
      setTimeout(() => window.location.reload(), 1500)
    } catch (err) {
      console.error('Friendbot error:', err)
    } finally {
      setFundingXlm(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-cyan-500 text-slate-900 w-10 h-10 rounded-full shadow-lg hover:bg-cyan-400 transition-colors text-lg font-bold flex items-center justify-center"
        title="Quick Start Guide"
      >
        ?
      </button>
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-80 bg-slate-800 border-l border-slate-700 z-50 shadow-xl overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white">Quick Start Guide</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 border border-slate-600 px-2 py-1 rounded-md hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>

          <div className="mb-4 bg-slate-900 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1.5">
              Progress: {completedCount}/{totalSteps}
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {STEPS.map((step) => {
              const done = isStepComplete(step.id)
              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border transition-colors ${
                    done
                      ? 'bg-slate-900/50 border-green-700/30'
                      : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <span className="text-base mt-0.5 shrink-0">
                    {done ? '✅' : step.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium ${done ? 'text-green-400' : 'text-slate-300'}`}>
                      {step.label}
                    </div>
                    {step.id === 'xlm' && !done && publicKey && (
                      <button
                        onClick={handleFriendbot}
                        disabled={fundingXlm}
                        className="mt-1.5 text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-600/30 px-2 py-0.5 rounded hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                      >
                        {fundingXlm ? 'Requesting...' : 'Get 10,000 free XLM'}
                      </button>
                    )}
                    {step.id === 'campaign' && !done && (
                      <div className="mt-1.5 text-[10px] text-slate-500">
                        Click any campaign card below to select it.
                      </div>
                    )}
                    {step.id === 'vote' && !done && selectedCampaign && (
                      <div className="mt-1.5 text-[10px] text-slate-500">
                        After donating, find a milestone and click Vote.
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 text-[10px] text-slate-600 text-center">
            You are on <span className="text-cyan-400">Stellar Testnet</span>
          </div>
        </div>
      </div>
    </>
  )
}
