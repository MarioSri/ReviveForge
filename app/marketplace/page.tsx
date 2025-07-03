"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useChecklist, useCompleteStep, useProjects } from "@/lib/api"
import { useRef } from "react"
import FilterSidebar from "@/components/FilterSidebar"
import ProjectCard from "@/components/ProjectCard"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

const PAGE_SIZE = 12

export default function MarketplacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    tech: searchParams.getAll("tech"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minHealth: searchParams.get("minHealth") || "",
  })

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1)
    setFilters({
      q: searchParams.get("q") || "",
      tech: searchParams.getAll("tech"),
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minHealth: searchParams.get("minHealth") || "",
    })
  }, [searchParams])

  // Convert tech array to comma-separated string for ProjectsFilter
  const projectsFilters = {
    ...filters,
    tech: Array.isArray(filters.tech) ? filters.tech.join(",") : filters.tech,
  }
  const { data, isLoading, isError, refetch } = useProjects({
    ...projectsFilters,
    page,
    pageSize: PAGE_SIZE,
  })
  const completeStep = useCompleteStep("browse")
  const checklist = useChecklist()
  const sentRef = useRef(false)

  useEffect(() => {
    if (
      data?.data?.length > 0 &&
      !checklist.data?.includes("browse") &&
      !sentRef.current
    ) {
      completeStep.mutate()
      sentRef.current = true
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("Onboarding: auto-completed browse step")
      }
    }
  }, [data, checklist.data, completeStep])

  function handleFilterChange(newFilters: any) {
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((val) => params.append(k, String(val)))
      else if (v) params.set(k, String(v))
    })
    router.replace(`/marketplace?${params.toString()}`)
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(newPage))
    router.replace(`/marketplace?${params.toString()}`)
  }

  return (
    <div className="flex">
      <FilterSidebar filters={filters} onChange={handleFilterChange} />
      <div className="flex-1 p-6">
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-64">
            <span className="text-red-500 mb-2">Failed to load projects.</span>
            <button
              onClick={() => {
                refetch()
                toast.error("Retrying...")
              }}
              className="px-4 py-2 bg-gray-800 rounded text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.data?.map((p: any) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                aria-label="Previous page"
                className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                aria-label="Next page"
                className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
                onClick={() => handlePageChange(page + 1)}
                disabled={data?.data?.length < PAGE_SIZE}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
