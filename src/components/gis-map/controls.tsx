'use client'

import MapView from '@arcgis/core/views/MapView'
import { useState } from 'react'

interface MapControlsProps {
  view: MapView | null
  zoom: number
}

export default function MapControls({ view, zoom }: MapControlsProps) {
  const [isPointsVisible, setIsPointsVisible] = useState(false)
  const [isAreaVisible, setIsAreaVisible] = useState(true)
  const [isDrawing, setIsDrawing] = useState(false)

  const togglePoints = () => {
    setIsPointsVisible(!isPointsVisible)
    // Implement toggle points visibility logic here
  }

  const toggleArea = () => {
    setIsAreaVisible(!isAreaVisible)
    // Implement toggle area visibility logic here
  }

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing)
    // Implement drawing mode logic here
  }

  const handleFindLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const input = event.currentTarget.value
      try {
        const coords = JSON.parse(input)
        if (Array.isArray(coords) && coords.length === 2) {
          const [lng, lat] = coords.map(Number)
          if (!isNaN(lng) && !isNaN(lat) && view) {
            view.goTo({
              center: [lng, lat],
              zoom: 15
            })
          } else {
            alert("Tọa độ không hợp lệ")
          }
        } else {
          alert("Vui lòng nhập tọa độ đúng định dạng [lng, lat]")
        }
      } catch (error) {
        alert("Lỗi khi phân tích tọa độ. Vui lòng nhập tọa độ dưới dạng [lng, lat]")
      }
    }
  }

  return (
    <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
      {/* <input
        className="px-2 py-1 border rounded"
        placeholder="Tìm một tọa độ"
        onKeyDown={handleFindLocation}
      />
      <Button variant="outline" onClick={togglePoints}>
        {isPointsVisible ? "Ẩn địa điểm" : "👁️ Hiển địa điểm"}
      </Button>
      <Button variant="outline" onClick={toggleArea}>
        {isAreaVisible ? "Ẩn vùng" : "👁️ Hiện vùng"}
      </Button>
      <Button variant="outline" onClick={toggleDrawing}>
        {isDrawing ? "✍️ Đang vẽ" : "✏️ Vẽ"}
      </Button> */}
      <span className="px-2 py-1 bg-white border rounded">Độ zoom: {zoom.toFixed(2)}</span>
    </div>
  )
}

