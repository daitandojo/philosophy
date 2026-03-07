#!/bin/bash
echo "=== FINAL TEST: Hikmatia Access Control ==="
echo

# Start server
echo "1. Starting server..."
npm start > /tmp/final-test.log 2>&1 &
PID=$!
sleep 5

echo "2. Testing initial state (no cookie):"
echo "   Home page: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)"
echo "   Access page: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/access)"
echo "   Explore page: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/explore)"

echo "3. Testing wrong access code '1111':"
curl -s -X POST http://localhost:3000/api/access \
  -H "Content-Type: application/json" \
  -d '{"code":"1111"}' | grep -o '"success":[^,]*'

echo "4. Getting access with correct code '8433':"
curl -s -X POST http://localhost:3000/api/access \
  -H "Content-Type: application/json" \
  -d '{"code":"8433"}' \
  -c /tmp/final-cookie.txt > /dev/null
echo "   Cookie obtained"

echo "5. Testing with access cookie:"
echo "   Home page: $(curl -s -o /dev/null -w "%{http_code}" -b /tmp/final-cookie.txt http://localhost:3000/)"
echo "   Explore page: $(curl -s -o /dev/null -w "%{http_code}" -b /tmp/final-cookie.txt http://localhost:3000/explore)"
echo "   Blog page: $(curl -s -o /dev/null -w "%{http_code}" -b /tmp/final-cookie.txt http://localhost:3000/blog)"

echo "6. Testing static files (should always work):"
echo "   Favicon: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/favicon.ico)"
echo "   API access check: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/access)"

# Cleanup
kill $PID 2>/dev/null
rm -f /tmp/final-cookie.txt

echo
echo "=== TEST COMPLETE ==="
