// Simple logging middleware
export function logger(req, res, next) {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.url}`)
  next()
}

// Request timing middleware
export function requestTimer(req, res, next) {
  const start = Date.now()

  // Once the response is finished
  res.on("finish", () => {
    const duration = Date.now() - start
    console.log(`Request to ${req.url} took ${duration}ms`)
  })

  next()
}

