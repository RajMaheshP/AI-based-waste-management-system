"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DetectionResult {
  status: string
  predicted_class: string
  confidence: number
  processed_image: string
  timestamp: string
}

export default function LiveDetection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  
  const [isStreaming, setIsStreaming] = useState(false)
  const [liveResult, setLiveResult] = useState<DetectionResult | null>(null)
  const [captureResult, setCaptureResult] = useState<DetectionResult | null>(null)
  const [error, setError] = useState<string>("")
  const [processing, setProcessing] = useState(false)

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480,
          facingMode: "environment" // Prefer back camera if available
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
      
      setIsStreaming(true)
      setError("")
      setCaptureResult(null)
      connectWebSocket()
    } catch (err) {
      setError("Failed to access camera. Please ensure you have granted permission.")
      console.error("Error accessing webcam:", err)
    }
  }

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    if (wsRef.current) {
      wsRef.current.close()
    }
    setIsStreaming(false)
    setLiveResult(null)
  }

  const captureAndDetect = async () => {
    if (!videoRef.current || !canvasRef.current) return
    setProcessing(true)

    try {
      // Clear previous result
      setCaptureResult(null)
      
      // Draw current frame to canvas
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (!context) return

      // Ensure we use the video dimensions
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight

      // Draw video frame to canvas
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => 
        canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.95)
      )

      // Create form data with blob
      const formData = new FormData()
      formData.append('file', blob, 'capture.jpg')

      // Send to backend
      const response = await fetch('http://localhost:8000/predict/image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const result = await response.json()
      setCaptureResult(result)

    } catch (error) {
      console.error('Error:', error)
      setError("Failed to process captured image")
    } finally {
      setProcessing(false)
    }
  }

  const connectWebSocket = () => {
    wsRef.current = new WebSocket('ws://localhost:8000/predict/live')
    
    wsRef.current.onopen = () => {
      console.log('WebSocket Connected')
      startVideoProcessing()
    }
    
    wsRef.current.onclose = () => {
      console.log('WebSocket Disconnected')
      if (isStreaming) {
        stopWebcam()
      }
    }
    
    wsRef.current.onerror = (error) => {
      console.error('WebSocket Error:', error)
      setError("Connection error. Please try again.")
      stopWebcam()
    }
    
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setLiveResult(data)
      } catch (e) {
        console.error('Error parsing WebSocket message:', e)
      }
    }
  }

  const startVideoProcessing = () => {
    if (!canvasRef.current || !videoRef.current || !wsRef.current) return
    
    const processFrame = () => {
      if (!isStreaming) return

      const context = canvasRef.current?.getContext('2d')
      if (!context) return

      context.drawImage(videoRef.current!, 0, 0, 640, 480)
      const imageData = canvasRef.current?.toDataURL('image/jpeg', 0.5)
      wsRef.current?.send(imageData || '')

      requestAnimationFrame(processFrame)
    }

    requestAnimationFrame(processFrame)
  }

  useEffect(() => {
    return () => {
      stopWebcam()
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Live Classification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="hidden"
            />
            {!isStreaming && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10">
                <p className="text-gray-600">Start camera to begin detection</p>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            {liveResult && isStreaming && (
              <div className="absolute top-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg">
                <p className="text-xl font-bold text-center">
                  {liveResult.predicted_class}
                  <span className="text-sm font-normal ml-2">
                    ({(liveResult.confidence * 100).toFixed(1)}%)
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={isStreaming ? stopWebcam : startWebcam}
              className="flex-1"
              variant="default"
            >
              {isStreaming ? "Stop Camera" : "Start Camera"}
            </Button>
            {isStreaming && (
              <Button 
                onClick={captureAndDetect}
                className="flex-1"
                variant="secondary"
                disabled={processing}
              >
                {processing ? "Processing..." : "Capture & Analyze"}
              </Button>
            )}
          </div>

          {captureResult && (
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-lg text-center">Analysis Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={captureResult.processed_image}
                    alt="Detection Result"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-primary">
                    {captureResult.predicted_class}
                  </p>
                  <p className="text-lg">
                    Confidence: {(captureResult.confidence * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">
                    Analyzed at: {new Date(captureResult.timestamp).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
