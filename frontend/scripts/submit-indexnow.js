/**
 * submit-indexnow.js
 *
 * Submits all sitemap URLs to the IndexNow protocol (Bing, Yep/Ahrefs, Yandex, Seznam).
 * IndexNow API key verification file: frontend/public/01dbebf45e62cecf114777cacee572a8.txt
 * Live URL: https://usfahindustry.com/01dbebf45e62cecf114777cacee572a8.txt
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __rootDir = path.resolve(path.dirname(__filename), '..')

const HOST = 'usfahindustry.com'
const KEY = '01dbebf45e62cecf114777cacee572a8'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

// Parse URLs from sitemap.xml
function getSitemapUrls() {
  const sitemapPath = path.join(__rootDir, 'public', 'sitemap.xml')
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`sitemap.xml not found at ${sitemapPath}`)
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8')
  const urls = []
  const regex = /<loc>(https:\/\/[^<]+)<\/loc>/g
  let match
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1])
  }
  return urls
}

function postJson(urlStr, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr)
    const postData = JSON.stringify(data)

    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent': 'UsfahIndustry-IndexNow/1.0',
        },
        timeout: 15000,
      },
      (res) => {
        let responseBody = ''
        res.on('data', (chunk) => (responseBody += chunk))
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            body: responseBody,
          })
        })
      }
    )

    req.on('error', (err) => reject(err))
    req.on('timeout', () => {
      req.destroy()
      reject(new Error(`Timeout connecting to ${urlStr}`))
    })

    req.write(postData)
    req.end()
  })
}

async function submit() {
  const urls = getSitemapUrls()
  console.log(`[IndexNow] Found ${urls.length} URLs in sitemap.xml`)
  console.log(`[IndexNow] Key: ${KEY}`)
  console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`)

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://search.seznam.cz/indexnow',
    'https://yandex.com/indexnow',
  ]

  for (const endpoint of endpoints) {
    try {
      console.log(`[IndexNow] Submitting to ${endpoint}...`)
      const res = await postJson(endpoint, payload)
      // Status code meaning:
      // 200: OK (URLs submitted)
      // 202: Accepted (key verification pending or valid)
      // 400: Invalid format
      // 403: Key invalid or key file not found
      // 422: URLs not in host
      // 429: Too many requests
      const isSuccess = res.statusCode === 200 || res.statusCode === 202
      console.log(
        `  ${isSuccess ? 'âœ…' : 'âŒ'} ${endpoint} -> Status ${res.statusCode} (${res.statusMessage || ''}) ${res.body ? '- ' + res.body.trim() : ''}`
      )
    } catch (err) {
      console.error(`  âŒ Failed submitting to ${endpoint}:`, err.message)
    }
  }
}

submit()
