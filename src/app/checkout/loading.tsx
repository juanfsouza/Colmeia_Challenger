export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-700 text-lg">Preparando checkout...</p>
      </div>
    </div>
  )
}
