"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DetectionResult {
  status: string
  predicted_class: string
  confidence: number
  processed_image: string
  timestamp: string
}

export default function VideoDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setResult(null)

      // Create video preview URL
      const url = URL.createObjectURL(selectedFile)
      setPreview(url)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/predict/video', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process video')
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Video Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Input 
                  type="file" 
                  accept="video/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {fileName && (
                  <p className="text-sm text-gray-500">
                    Selected: {fileName}
                  </p>
                )}
              </div>
              
              <Button type="submit" disabled={!file || loading}>
                {loading ? "Processing..." : "Analyze Video"}
              </Button>

              {loading && (
                <div className="space-y-2">
                  <Progress value={33} className="bg-primary/20" />
                  <p className="text-sm text-center text-gray-500">
                    Processing video frames...
                  </p>
                </div>
              )}
            </form>

            {preview && result && (
              <div className="grid md:grid-cols-2 gap-4">
                {/* Original Video Preview */}
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Original Video</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <video
                        src={preview}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Detection Result */}
                <Card className="overflow-hidden border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Detection Result</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result.processed_image}
                        alt="Detection Result"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center space-y-2 bg-primary/10 rounded-lg p-4">
                      <p className="text-2xl font-bold text-primary">
                        {result.predicted_class}
                      </p>
                      <p className="text-lg font-medium">
                        Confidence: {(result.confidence * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-500">
                        Analyzed at: {new Date(result.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {preview && !result && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-lg">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                    <video
                      src={preview}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
