import { check, sleep } from 'k6'
import http from 'k6/http'

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '1m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 1 minutes.
    { duration: '2m', target: 200 }, // stay at higher 200 users for 3 minutes
    { duration: '3m', target: 0 }, // ramp-down to 0 users
  ],
}

export default function () {
  const responses = http.batch([
    ['GET', 'http://exresult-voteapp.sample.local/raw'],
    ['GET', 'http://exresult-voteapp.sample.local/raw2']
  ]);
  sleep(1)
  check(responses[0], {
    'raw endpoint status was 200': (r) => r.status === 200
  });
  
  check(responses[1], {
    'raw2 endpoint status was 200': (r) => r.status === 200
  })
}
