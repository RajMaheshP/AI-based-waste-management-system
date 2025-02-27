"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DetectionResult {
  status: string
  predicted_class: string
  confidence: number
  processed_image: string
  timestamp: string
}

export default function PhotoDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreview(url)
      setResult(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/predict/image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
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
          <CardTitle className="text-center text-2xl">Photo Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="cursor-pointer"
              />
              <Button type="submit" disabled={!file || loading}>
                {loading ? "Processing..." : "Analyze Photo"}
              </Button>
            </form>

            {preview && result && (
              <div className="grid md:grid-cols-2 gap-4">
                {/* Original Image */}
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Original Photo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Original"
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
                    <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
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
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview}
                      alt="Preview"
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
