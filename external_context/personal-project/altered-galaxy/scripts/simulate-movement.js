/**
 * SCRIPT: simulate-movement.js
 * PURPOSE: To simulate and debug movement logic for Carriers and Fleets without running the full server.
 *          Diagnoses overshoot issues and acceleration spikes using a rectangular path.
 * USAGE: npm run script:simulate
 */

// Mock Entity
let fleet = { 
    x: 0, 
    y: 0, 
    vx: 0, 
    vy: 0, 
    targetX: 0, 
    targetY: 0, 
    maxSpeed: 400, // Matches server MAX_SPEED
    path: [
        {x: 1000, y: 0},
        {x: 1000, y: 1000},
        {x: 0, y: 1000},
        {x: 0, y: 0}
    ] 
};

const TICK_RATE = 30;
const DT = 1 / TICK_RATE;
const MAX_ACCEL = 150; // Matches server MAX_ACCEL
const ARRIVAL_RADIUS = 50;
const DECEL_RADIUS = 300;
const STOP_THRESHOLD = 4;

// Initialize first target
let next = fleet.path.shift();
fleet.targetX = next.x;
fleet.targetY = next.y;

console.log("--- SIMULATION START: RECTANGLE LAP ---");
console.log(`Route: (0,0) -> (1000,0) -> (1000,1000) -> (0,1000) -> (0,0)`);

for (let i = 0; i < 600; i++) { // Run for 20 seconds (600 ticks)
    const dx = fleet.targetX - fleet.x;
    const dy = fleet.targetY - fleet.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Waypoint Passing Logic (Lookahead)
    const vecToTarget = { x: dx, y: dy };
    const vel = { x: fleet.vx, y: fleet.vy };
    const dot = vecToTarget.x * vel.x + vecToTarget.y * vel.y;
                            
    if ((dist < ARRIVAL_RADIUS || (dist < ARRIVAL_RADIUS * 2 && dot < 0)) && fleet.path.length > 0) {
        console.log(`[Tick ${i}] *** WAYPOINT REACHED (${fleet.targetX}, ${fleet.targetY}) ***`);
        const nextPoint = fleet.path.shift();
        fleet.targetX = nextPoint.x;
        fleet.targetY = nextPoint.y;
        // Note: We do NOT zero velocity here, preserving momentum for the turn
    } else if (dist < STOP_THRESHOLD && fleet.path.length === 0) {
        console.log(`[Tick ${i}] *** FINAL DESTINATION REACHED (${fleet.targetX}, ${fleet.targetY}) ***`);
        break;
    }

    let ax = 0;
    let ay = 0;
    const applyAccel = (fx, fy) => {
        ax = Math.max(-MAX_ACCEL * 2, Math.min(MAX_ACCEL * 2, fx));
        ay = Math.max(-MAX_ACCEL * 2, Math.min(MAX_ACCEL * 2, fy));
    };

    // Physics Logic (Mirrors physicsSystem.ts)
    const isFinalWaypoint = fleet.path.length === 0;
    
    // Calculate turn angle for Cornering Logic
    let decelRadius = DECEL_RADIUS;
    let targetSpeedMultiplier = 1.0;
    
    if (!isFinalWaypoint && fleet.path.length > 0) {
            const nextPoint = fleet.path[0];
            const vecCurrent = { x: fleet.targetX - fleet.x, y: fleet.targetY - fleet.y };
            const vecNext = { x: nextPoint.x - fleet.targetX, y: nextPoint.y - fleet.targetY };
            
            const magCurrent = Math.sqrt(vecCurrent.x*vecCurrent.x + vecCurrent.y*vecCurrent.y);
            const magNext = Math.sqrt(vecNext.x*vecNext.x + vecNext.y*vecNext.y);
            
            if (magCurrent > 0 && magNext > 0) {
                // Dot product
                const dot = (vecCurrent.x * vecNext.x + vecCurrent.y * vecNext.y) / (magCurrent * magNext);
                const angle = Math.acos(Math.max(-1, Math.min(1, dot))); // radians
                
                const angleDeg = angle * (180 / Math.PI);
                
                // Straight Shot (0-20 deg)
                if (angleDeg < 20) {
                    decelRadius = 0; // Do not brake
                } 
                // Standard Turn (20-90 deg)
                else if (angleDeg < 90) {
                    decelRadius = DECEL_RADIUS * 0.5; // Brake slightly
                    targetSpeedMultiplier = 0.75;
                }
                // Hairpin (> 90 deg)
                else {
                    decelRadius = DECEL_RADIUS * 1.5; // Brake earlier
                    targetSpeedMultiplier = 0.2; // Brake harder
                }
            }
    }
    
    if (isFinalWaypoint) {
         if (dist < DECEL_RADIUS) {
            // Arrival Damping
            const desiredSpeed = fleet.maxSpeed * (dist / DECEL_RADIUS);
            const nx = dx / dist;
            const ny = dy / dist;
            const desiredVx = nx * desiredSpeed;
            const desiredVy = ny * desiredSpeed;
            applyAccel((desiredVx - fleet.vx)*2, (desiredVy - fleet.vy)*2);
         } else {
             const nx = dx / dist;
             const ny = dy / dist;
             const desiredVx = nx * fleet.maxSpeed;
             const desiredVy = ny * fleet.maxSpeed;
             applyAccel(desiredVx - fleet.vx, desiredVy - fleet.vy);
         }
    } else {
         // Cruising / Turning
         const nx = dx / dist;
         const ny = dy / dist;
         
         let targetSpeed = fleet.maxSpeed;
         
         // Apply Cornering Brake
         if (decelRadius > 0 && dist < decelRadius) {
                targetSpeed = fleet.maxSpeed * targetSpeedMultiplier + (fleet.maxSpeed * (1-targetSpeedMultiplier) * (dist / decelRadius));
         }

         const desiredVx = nx * targetSpeed;
         const desiredVy = ny * targetSpeed;
         
         const forceMult = targetSpeed < fleet.maxSpeed ? 2 : 1;
         applyAccel((desiredVx - fleet.vx) * forceMult, (desiredVy - fleet.vy) * forceMult);
    }

    fleet.vx += ax * DT;
    fleet.vy += ay * DT;
    
    // Clamp Max Speed
    const speed = Math.sqrt(fleet.vx*fleet.vx + fleet.vy*fleet.vy);
    if (speed > fleet.maxSpeed) {
        fleet.vx = (fleet.vx / speed) * fleet.maxSpeed;
        fleet.vy = (fleet.vy / speed) * fleet.maxSpeed;
    }
    
    fleet.x += fleet.vx * DT;
    fleet.y += fleet.vy * DT;

    // Log every 5 ticks to reduce noise, but keep granularity high enough
    if (i % 5 === 0) {
        console.log(`Tick ${i}: Pos(${fleet.x.toFixed(0)},${fleet.y.toFixed(0)}) Speed=${speed.toFixed(0)} Dist=${dist.toFixed(0)} Target=(${fleet.targetX},${fleet.targetY})`);
    }
}

console.log("--- SIMULATION END ---");