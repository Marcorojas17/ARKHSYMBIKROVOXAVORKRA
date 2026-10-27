const requests = new Map();

export function checkRateLimit(ip, limit = 100, windowMs = 60000) {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(ip)) requests.set(ip, []);
    
    const timestamps = requests.get(ip).filter(t => t > windowStart);
    timestamps.push(now);
    requests.set(ip, timestamps);
    
    return timestamps.length <= limit;
}
