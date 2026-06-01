"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useParams } from "next/navigation"
import { useChainId } from "wagmi"
import { ArrowLeft, ExternalLink, Shield, CircleAlert } from "lucide-react"
import { useInvoice } from "@/hooks/use-invoice-nft"
import { getInvoiceNFTAddress } from "@/lib/contracts/addresses"
import { TerminalNav } from "@/components/terminal-nav"
import { StatusBar } from "@/components/ui/status-bar"
import { Button } from "@/components/ui/button"

function formatDate(value: Date | undefined) {
  return value ? value.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "Unknown"
}

function InvoiceDetailContent() {
  const params = useParams<{ tokenId: string }>()
  const chainId = useChainId()
  const contractAddress = getInvoiceNFTAddress(chainId)
  const tokenId = useMemo(() => {
    const raw = params?.tokenId
    const parsed = raw ? Number(raw) : NaN
    return Number.isFinite(parsed) ? parsed : undefined
  }, [params?.tokenId])

  const { invoice, isLoading, error } = useInvoice(tokenId)

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-grid noise-overlay scan-line pb-8">
      <TerminalNav />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4" />
              back to portfolio
            </Button>
          </Link>
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#666666]">
            invoice detail
          </div>
        </div>

        <div className="terminal-card p-6 md:p-8">
          {isLoading ? (
            <div className="text-sm text-[#666666]">loading invoice...</div>
          ) : error || !invoice ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#ef4444]">
                <CircleAlert className="w-4 h-4" />
                <h1 className="text-lg font-bold">Invoice not found</h1>
              </div>
              <p className="text-sm text-[#666666]">
                Token #{tokenId ?? "unknown"} is not available on the connected chain yet. If you just minted it, wait for confirmation and refresh the page.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/mint">
                  <Button>
                    mint another invoice
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="secondary">
                    view portfolio
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#666666] mb-2">
                    vasmo invoice #{tokenId}
                  </div>
                  <h1 className="text-2xl font-bold text-[#10b981]">
                    {invoice.statusLabel}
                  </h1>
                  <p className="text-sm text-[#666666] mt-2">
                    Privacy-preserving invoice commitment stored on Mantle Sepolia.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded border border-[#10b981]/20 bg-[#10b981]/10 px-4 py-2 text-sm">
                  <Shield className="w-4 h-4 text-[#10b981]" />
                  <span className="text-[#d7fff1]">chain secured</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[#1f1f1f] bg-[#111111] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#666666] mb-2">commitments</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#666666]">data</span>
                      <span className="font-mono text-right break-all">{invoice.dataCommitment}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#666666]">amount</span>
                      <span className="font-mono text-right break-all">{invoice.amountCommitment}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-[#1f1f1f] bg-[#111111] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#666666] mb-2">timeline</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#666666]">due date</span>
                      <span>{formatDate(invoice.dueDate)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#666666]">created</span>
                      <span>{formatDate(invoice.createdAt)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#666666]">issuer</span>
                      <span className="font-mono text-right break-all">{invoice.issuer}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#1f1f1f] bg-[#111111] p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#666666] mb-3">risk profile</div>
                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                  <div>
                    <div className="text-[#666666]">risk score</div>
                    <div className="mt-1 text-lg font-bold">{invoice.riskScore}/100</div>
                  </div>
                  <div>
                    <div className="text-[#666666]">payment probability</div>
                    <div className="mt-1 text-lg font-bold">{invoice.paymentProbability}/100</div>
                  </div>
                  <div>
                    <div className="text-[#666666]">owner</div>
                    <div className="mt-1 font-mono break-all">{invoice.owner ?? "unavailable"}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/dashboard/mint?invoice=${tokenId}`}>
                  <Button>
                    mint another
                  </Button>
                </Link>
                <a
                  href={`https://explorer.mantle.xyz/address/${contractAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-[#1f1f1f] px-4 py-2 text-sm text-[#d6d6d6] hover:border-[#10b981]/40 hover:text-white transition-colors"
                >
                  explorer
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <StatusBar status="online" network="MANTLE SEPOLIA" />
    </div>
  )
}

export default function InvoiceDetailPage() {
  return <InvoiceDetailContent />
}
