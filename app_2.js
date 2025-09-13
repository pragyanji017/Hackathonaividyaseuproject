// Global application data and state
const securityData = {
  students: [
    {id: "STD1000", name: "Arjun Kumar", grade: 12, authorized: true, behavior_score: 0.85, attendance_rate: 0.92, last_entry: "2025-09-12T14:30:00"},
    {id: "STD1001", name: "Priya Sharma", grade: 10, authorized: true, behavior_score: 0.92, attendance_rate: 0.95, last_entry: "2025-09-12T15:15:00"},
    {id: "STD1002", name: "Rahul Patel", grade: 11, authorized: true, behavior_score: 0.78, attendance_rate: 0.88, last_entry: "2025-09-12T16:00:00"},
    {id: "STD1003", name: "Sneha Singh", grade: 9, authorized: true, behavior_score: 0.88, attendance_rate: 0.94, last_entry: "2025-09-12T13:45:00"},
    {id: "STD1004", name: "Amit Gupta", grade: 12, authorized: true, behavior_score: 0.82, attendance_rate: 0.90, last_entry: "2025-09-12T14:20:00"}
  ],
  staff: [
    {id: "STF001", name: "Dr. Rajesh Sharma", department: "Mathematics", authorized: true, role: "Teacher"},
    {id: "STF002", name: "Ms. Priya Gupta", department: "Science", authorized: true, role: "Teacher"},
    {id: "STF003", name: "Mr. Amit Singh", department: "Security", authorized: true, role: "Security Guard"}
  ],
  visitors: [
    {id: "VIS001", name: "Parent Meeting", authorized: true, pass_expiry: "2025-09-13T18:00:00", purpose: "Parent-Teacher Meeting"},
    {id: "VIS002", name: "Delivery Person", authorized: false, pass_expiry: "2025-09-13T10:00:00", purpose: "Package Delivery"}
  ],
  security_incidents: [
    {id: "INC001", type: "Unauthorized Access", location: "Main Gate", threat_level: "HIGH", timestamp: "2025-09-13T09:15:00", resolved: false},
    {id: "INC002", type: "Suspicious Behavior", location: "Cafeteria", threat_level: "MEDIUM", timestamp: "2025-09-13T10:30:00", resolved: true},
    {id: "INC003", type: "Emergency", location: "Playground", threat_level: "CRITICAL", timestamp: "2025-09-13T11:00:00", resolved: false}
  ],
  access_logs: [
    {id: "LOG001", person_id: "STD1001", timestamp: "2025-09-13T08:00:00", location: "Main Gate", access_granted: true, method: "ID Card"},
    {id: "LOG002", person_id: "STF001", timestamp: "2025-09-13T07:45:00", location: "Main Gate", access_granted: true, method: "Biometric"},
    {id: "LOG003", person_id: "UNKNOWN", timestamp: "2025-09-13T09:15:00", location: "Side Entrance", access_granted: false, method: "Manual"}
  ]
};

// Global state variables
let currentSection = 'dashboard';
let entryChart = null;
let threatChart = null;
let behaviorChart = null;
let activityInterval = null;

// AI Settings
const aiSettings = {
  knn_k_value: 3,
  neural_network_threshold: 0.7,
  threat_detection_sensitivity: 0.8,
  behavior_analysis_enabled: true,
  real_time_monitoring: true
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing SecureSchool Security System...');
  initializeApplication();
});

function initializeApplication() {
  try {
    setupNavigation();
    setupDashboard();
    setupEntryManagement();
    setupIncidentDetection();
    setupPersonDatabase();
    setupSecurityAlerts();
    setupSystemSettings();
    
    // Initialize charts after a short delay
    setTimeout(() => {
      initializeCharts();
    }, 500);
    
    // Start real-time activity simulation
    startActivitySimulation();
    
    console.log('SecureSchool Security System initialized successfully');
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Navigation System
function setupNavigation() {
  console.log('Setting up navigation...');
  
  // Main navigation buttons
  const navButtons = document.querySelectorAll('.nav-btn');
  console.log('Found navigation buttons:', navButtons.length);
  
  navButtons.forEach((button, index) => {
    const targetSection = button.getAttribute('data-section');
    console.log(`Setting up nav button ${index}: ${targetSection}`);
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`Navigation clicked: ${targetSection}`);
      navigateToSection(targetSection);
      updateActiveNavButton(this);
    });
  });
  
  // Quick action buttons
  const quickActionButtons = document.querySelectorAll('[data-navigate]');
  console.log('Found quick action buttons:', quickActionButtons.length);
  
  quickActionButtons.forEach((button, index) => {
    const targetSection = button.getAttribute('data-navigate');
    console.log(`Setting up quick action button ${index}: ${targetSection}`);
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`Quick action clicked: ${targetSection}`);
      navigateToSection(targetSection);
      updateActiveNavButton(document.querySelector(`[data-section="${targetSection}"]`));
    });
  });
}

function navigateToSection(sectionId) {
  console.log(`Navigating to section: ${sectionId}`);
  
  // Hide all sections
  const allSections = document.querySelectorAll('.section');
  console.log('Found sections:', allSections.length);
  
  allSections.forEach(section => {
    section.classList.remove('active');
    console.log(`Hiding section: ${section.id}`);
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    currentSection = sectionId;
    console.log(`Successfully navigated to: ${sectionId}`);
    
    // Handle section-specific initialization
    if (sectionId === 'ai-analytics' && (!threatChart || !behaviorChart)) {
      setTimeout(initializeCharts, 100);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  } else {
    console.error(`Section not found: ${sectionId}`);
  }
}

function updateActiveNavButton(activeButton) {
  // Remove active class from all nav buttons
  document.querySelectorAll('.nav-btn').forEach(button => {
    button.classList.remove('active');
  });
  
  // Add active class to clicked button
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Dashboard Functions
function setupDashboard() {
  console.log('Setting up dashboard...');
  updateDashboardStats();
  displayActivityFeed();
}

function updateDashboardStats() {
  // Count active alerts
  const activeAlerts = securityData.security_incidents.filter(incident => !incident.resolved).length;
  const activeAlertsEl = document.getElementById('active-alerts');
  if (activeAlertsEl) {
    activeAlertsEl.textContent = activeAlerts;
  }
  
  // Count total people in database
  const totalPeople = securityData.students.length + securityData.staff.length + securityData.visitors.length;
  const peopleCountEl = document.getElementById('people-count');
  if (peopleCountEl) {
    peopleCountEl.textContent = totalPeople;
  }
  
  // Count today's entries (simulated)
  const entriesToday = securityData.access_logs.length + Math.floor(Math.random() * 20);
  const entriesTodayEl = document.getElementById('entries-today');
  if (entriesTodayEl) {
    entriesTodayEl.textContent = entriesToday;
  }
}

function displayActivityFeed() {
  const feedContainer = document.getElementById('activity-feed');
  if (!feedContainer) {
    console.error('Activity feed container not found');
    return;
  }
  
  const activities = generateRecentActivities();
  
  feedContainer.innerHTML = activities.map(activity => `
    <div class="feed-item">
      <span class="feed-time">${activity.time}</span>
      <span class="feed-message">${activity.message}</span>
    </div>
  `).join('');
}

function generateRecentActivities() {
  const now = new Date();
  const activities = [];
  
  // Generate activities based on actual data
  securityData.access_logs.slice(0, 5).forEach((log, index) => {
    const time = new Date(log.timestamp);
    const timeStr = time.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    const status = log.access_granted ? '✅' : '❌';
    const action = log.access_granted ? 'entered via' : 'denied at';
    
    activities.push({
      time: timeStr,
      message: `${status} ${log.person_id} ${action} ${log.location}`
    });
  });
  
  // Add some system activities
  activities.push(
    {time: '14:15', message: '🔍 AI Security scan completed - All clear'},
    {time: '14:05', message: '⚙️ System backup completed successfully'}
  );
  
  return activities.slice(0, 7);
}

function startActivitySimulation() {
  // Update activity feed every 30 seconds
  activityInterval = setInterval(() => {
    if (currentSection === 'dashboard') {
      displayActivityFeed();
    }
  }, 30000);
}

// Entry Management System
function setupEntryManagement() {
  console.log('Setting up entry management...');
  
  const processButton = document.getElementById('process-entry');
  if (processButton) {
    processButton.addEventListener('click', processEntryRequest);
  }
  
  displayEntriesLog();
}

function processEntryRequest() {
  console.log('Processing entry request...');
  
  const personIdEl = document.getElementById('person-id');
  const entryPointEl = document.getElementById('entry-point');
  const accessMethodEl = document.getElementById('access-method');
  
  if (!personIdEl || !entryPointEl || !accessMethodEl) {
    console.error('Entry form elements not found');
    return;
  }
  
  const personId = personIdEl.value.trim();
  const entryPoint = entryPointEl.value;
  const accessMethod = accessMethodEl.value;
  
  if (!personId) {
    alert('Please enter a Person ID');
    return;
  }
  
  // Simulate AI processing delay
  showProcessingAnimation();
  
  setTimeout(() => {
    const decision = makeSecurityDecision(personId, entryPoint, accessMethod);
    displaySecurityDecision(decision);
    logEntryAttempt(personId, entryPoint, accessMethod, decision.allowed);
  }, 2000);
}

function makeSecurityDecision(personId, entryPoint, accessMethod) {
  console.log(`Making security decision for: ${personId}`);
  
  // Binary search implementation to find person
  const person = binarySearchPerson(personId);
  
  let decision = {
    allowed: false,
    reason: '',
    confidence: 0,
    person: person
  };
  
  if (!person) {
    decision.reason = 'Person not found in security database';
    decision.confidence = 95;
    return decision;
  }
  
  // Check authorization
  if (!person.authorized) {
    decision.reason = 'Person is not authorized for access';
    decision.confidence = 98;
    return decision;
  }
  
  // Apply KNN classification for risk assessment
  const riskScore = applyKNNClassification(person, entryPoint, accessMethod);
  
  // Neural network simulation for behavior analysis
  const behaviorScore = simulateNeuralNetworkAnalysis(person);
  
  // Final decision based on AI analysis
  if (riskScore < 0.3 && behaviorScore > 0.7) {
    decision.allowed = true;
    decision.reason = 'Access granted - Low risk profile detected';
    decision.confidence = Math.min(95, Math.floor(behaviorScore * 100));
  } else if (riskScore < 0.6 && behaviorScore > 0.5) {
    decision.allowed = true;
    decision.reason = 'Access granted with monitoring - Medium risk profile';
    decision.confidence = Math.min(85, Math.floor(behaviorScore * 100));
  } else {
    decision.allowed = false;
    decision.reason = 'Access denied - High risk profile detected';
    decision.confidence = Math.min(90, Math.floor(riskScore * 100));
  }
  
  return decision;
}

// Binary Search Algorithm Implementation
function binarySearchPerson(personId) {
  console.log(`Binary searching for person: ${personId}`);
  
  // Combine and sort all people by ID for binary search
  const allPeople = [
    ...securityData.students.map(s => ({...s, category: 'student'})),
    ...securityData.staff.map(s => ({...s, category: 'staff'})),
    ...securityData.visitors.map(s => ({...s, category: 'visitor'}))
  ].sort((a, b) => a.id.localeCompare(b.id));
  
  let left = 0;
  let right = allPeople.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midId = allPeople[mid].id;
    
    console.log(`Binary search: comparing ${midId} with ${personId}`);
    
    if (midId === personId) {
      console.log(`Person found: ${allPeople[mid].name}`);
      return allPeople[mid];
    } else if (midId < personId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  console.log(`Person not found: ${personId}`);
  return null; // Person not found
}

// KNN Classification Algorithm
function applyKNNClassification(person, entryPoint, accessMethod) {
  // Simulate KNN with k=3 for threat classification
  const k = aiSettings.knn_k_value;
  
  // Sample historical data points (features: behavior_score, time_of_day, entry_point_risk)
  const historicalData = [
    {behavior_score: 0.9, time_risk: 0.1, location_risk: 0.2, threat_level: 0.1},
    {behavior_score: 0.8, time_risk: 0.3, location_risk: 0.1, threat_level: 0.2},
    {behavior_score: 0.7, time_risk: 0.2, location_risk: 0.4, threat_level: 0.4},
    {behavior_score: 0.6, time_risk: 0.5, location_risk: 0.3, threat_level: 0.6},
    {behavior_score: 0.5, time_risk: 0.4, location_risk: 0.6, threat_level: 0.7}
  ];
  
  // Calculate current risk factors
  const currentPoint = {
    behavior_score: person.behavior_score || 0.5,
    time_risk: calculateTimeRisk(),
    location_risk: calculateLocationRisk(entryPoint)
  };
  
  // Calculate distances to all historical points
  const distances = historicalData.map(point => {
    const dist = Math.sqrt(
      Math.pow(point.behavior_score - currentPoint.behavior_score, 2) +
      Math.pow(point.time_risk - currentPoint.time_risk, 2) +
      Math.pow(point.location_risk - currentPoint.location_risk, 2)
    );
    return {distance: dist, threat_level: point.threat_level};
  });
  
  // Sort by distance and take k nearest neighbors
  distances.sort((a, b) => a.distance - b.distance);
  const nearestNeighbors = distances.slice(0, k);
  
  // Calculate average threat level of k nearest neighbors
  const avgThreatLevel = nearestNeighbors.reduce((sum, neighbor) => sum + neighbor.threat_level, 0) / k;
  
  return avgThreatLevel;
}

// Neural Network Simulation
function simulateNeuralNetworkAnalysis(person) {
  // Simulate a simple neural network for behavior analysis
  const inputs = [
    person.behavior_score || 0.5,
    person.attendance_rate || 0.5,
    calculateTimeConsistency(person),
    calculateAccessPatternScore(person)
  ];
  
  // Simulated weights for hidden layer (4 inputs -> 3 hidden neurons)
  const hiddenWeights = [
    [0.8, 0.3, -0.2, 0.5],
    [-0.1, 0.9, 0.7, -0.3],
    [0.6, -0.4, 0.8, 0.2]
  ];
  
  // Simulated output weights (3 hidden -> 1 output)
  const outputWeights = [0.7, -0.3, 0.9];
  
  // Forward propagation simulation
  const hiddenOutputs = hiddenWeights.map(weights => {
    const sum = weights.reduce((acc, weight, index) => acc + (weight * inputs[index]), 0);
    return sigmoid(sum); // Apply sigmoid activation function
  });
  
  const finalSum = outputWeights.reduce((acc, weight, index) => acc + (weight * hiddenOutputs[index]), 0);
  const finalOutput = sigmoid(finalSum);
  
  return finalOutput;
}

// Helper functions for AI algorithms
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function calculateTimeRisk() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour <= 9) return 0.1; // Low risk during entry hours
  if (hour >= 15 && hour <= 17) return 0.2; // Low-medium risk during exit hours
  if (hour >= 10 && hour <= 14) return 0.3; // Medium risk during class hours
  return 0.8; // High risk during off-hours
}

function calculateLocationRisk(entryPoint) {
  const riskMap = {
    'Main Gate': 0.1,
    'Administration Office': 0.2,
    'Side Entrance': 0.4,
    'Emergency Exit': 0.9
  };
  return riskMap[entryPoint] || 0.5;
}

function calculateTimeConsistency(person) {
  // Simulate consistency score based on historical patterns
  return Math.random() * 0.3 + 0.7; // Random between 0.7-1.0
}

function calculateAccessPatternScore(person) {
  // Simulate access pattern normalcy
  return person.behavior_score || 0.5;
}

function showProcessingAnimation() {
  const decisionDiv = document.getElementById('ai-decision');
  if (decisionDiv) {
    decisionDiv.style.display = 'block';
    decisionDiv.innerHTML = `
      <div class="decision-header">
        <h4>🤖 AI Processing Entry Request...</h4>
      </div>
      <div class="processing-animation">
        <p>• Running binary search on person database...</p>
        <p>• Applying KNN classification (k=${aiSettings.knn_k_value})...</p>
        <p>• Neural network behavior analysis...</p>
        <p>• Calculating threat assessment...</p>
      </div>
    `;
  }
}

function displaySecurityDecision(decision) {
  const decisionDiv = document.getElementById('ai-decision');
  if (!decisionDiv) return;
  
  const resultClass = decision.allowed ? 'allowed' : 'denied';
  const resultText = decision.allowed ? '✅ ACCESS GRANTED' : '❌ ACCESS DENIED';
  
  decisionDiv.innerHTML = `
    <div class="decision-header">
      <h4>AI Security Decision</h4>
    </div>
    <div class="decision-content">
      <div class="decision-result ${resultClass}">${resultText}</div>
      <div class="decision-reason">${decision.reason}</div>
      <div class="confidence-score">
        <label>Confidence Score:</label>
        <div class="confidence-bar">
          <div class="confidence-fill" style="width: ${decision.confidence}%"></div>
        </div>
        <span>${decision.confidence}%</span>
      </div>
    </div>
  `;
}

function logEntryAttempt(personId, entryPoint, accessMethod, granted) {
  const newLog = {
    id: `LOG${Date.now()}`,
    person_id: personId,
    timestamp: new Date().toISOString(),
    location: entryPoint,
    access_granted: granted,
    method: accessMethod
  };
  
  securityData.access_logs.unshift(newLog);
  displayEntriesLog();
}

function displayEntriesLog() {
  const logContainer = document.getElementById('entries-log');
  if (!logContainer) return;
  
  const recentLogs = securityData.access_logs.slice(0, 10);
  
  logContainer.innerHTML = `
    <div class="log-entry log-header">
      <span>Person ID</span>
      <span>Location</span>
      <span>Method</span>
      <span>Time</span>
      <span>Status</span>
    </div>
    ${recentLogs.map(log => `
      <div class="log-entry">
        <span>${log.person_id}</span>
        <span>${log.location}</span>
        <span>${log.method}</span>
        <span>${new Date(log.timestamp).toLocaleTimeString()}</span>
        <span class="${log.access_granted ? 'access-granted' : 'access-denied'}">
          ${log.access_granted ? 'Granted' : 'Denied'}
        </span>
      </div>
    `).join('')}
  `;
}

// Incident Detection System
function setupIncidentDetection() {
  console.log('Setting up incident detection...');
  
  const analyzeBtn = document.getElementById('analyze-incident');
  const reportBtn = document.getElementById('report-incident');
  
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', analyzeIncident);
  }
  
  if (reportBtn) {
    reportBtn.addEventListener('click', reportIncident);
  }
  
  displayActiveIncidents();
}

function analyzeIncident() {
  const incidentTypeEl = document.getElementById('incident-type');
  const locationEl = document.getElementById('incident-location');
  const descriptionEl = document.getElementById('incident-description');
  
  if (!incidentTypeEl || !locationEl || !descriptionEl) {
    console.error('Incident form elements not found');
    return;
  }
  
  const incidentType = incidentTypeEl.value;
  const location = locationEl.value;
  const description = descriptionEl.value;
  
  if (!description.trim()) {
    alert('Please provide an incident description');
    return;
  }
  
  // Show analysis in progress
  const analysisDiv = document.getElementById('threat-analysis');
  if (analysisDiv) {
    analysisDiv.style.display = 'block';
    analysisDiv.innerHTML = `
      <h4>🤖 AI Threat Analysis in Progress...</h4>
      <p>Analyzing incident parameters with KNN classifier...</p>
    `;
    
    setTimeout(() => {
      const threatLevel = predictThreatLevel(incidentType, location, description);
      displayThreatAnalysis(threatLevel, incidentType, location);
    }, 1500);
  }
}

function predictThreatLevel(incidentType, location, description) {
  // Threat level mapping
  const typeRisk = {
    'Unauthorized Access': 0.8,
    'Suspicious Behavior': 0.6,
    'Emergency': 0.9,
    'Violation': 0.7,
    'Equipment Malfunction': 0.4,
    'False Alarm': 0.1
  };
  
  const locationRisk = {
    'Main Gate': 0.7,
    'Side Entrance': 0.8,
    'Emergency Exit': 0.9,
    'Cafeteria': 0.4,
    'Library': 0.3,
    'Playground': 0.5,
    'Classroom A-101': 0.3,
    'Administration Office': 0.6
  };
  
  const baseRisk = (typeRisk[incidentType] || 0.5) * 0.7 + (locationRisk[location] || 0.5) * 0.3;
  
  // Add randomness to simulate AI uncertainty
  const finalRisk = baseRisk + (Math.random() - 0.5) * 0.2;
  
  if (finalRisk >= 0.8) return 'CRITICAL';
  if (finalRisk >= 0.6) return 'HIGH';
  if (finalRisk >= 0.4) return 'MEDIUM';
  return 'LOW';
}

function displayThreatAnalysis(threatLevel, incidentType, location) {
  const analysisDiv = document.getElementById('threat-analysis');
  if (!analysisDiv) return;
  
  const knnAnalysis = `Applied KNN (k=${aiSettings.knn_k_value}) - Found ${Math.floor(Math.random() * 3) + 2} similar incidents`;
  const neuralScore = `Risk probability: ${(Math.random() * 0.3 + 0.6).toFixed(3)}`;
  
  analysisDiv.innerHTML = `
    <h4>AI Threat Level Prediction</h4>
    <div class="analysis-results">
      <div class="threat-level ${threatLevel.toLowerCase()}">${threatLevel} THREAT LEVEL</div>
      <div class="knn-details">
        <strong>KNN Analysis:</strong>
        <span>${knnAnalysis}</span>
      </div>
      <div class="neural-score">
        <strong>Neural Network Score:</strong>
        <span>${neuralScore}</span>
      </div>
    </div>
  `;
}

function reportIncident() {
  const incidentTypeEl = document.getElementById('incident-type');
  const locationEl = document.getElementById('incident-location');
  const descriptionEl = document.getElementById('incident-description');
  
  if (!incidentTypeEl || !locationEl || !descriptionEl) {
    console.error('Incident form elements not found');
    return;
  }
  
  const incidentType = incidentTypeEl.value;
  const location = locationEl.value;
  const description = descriptionEl.value;
  
  if (!description.trim()) {
    alert('Please provide an incident description');
    return;
  }
  
  const newIncident = {
    id: `INC${Date.now()}`,
    type: incidentType,
    location: location,
    threat_level: predictThreatLevel(incidentType, location, description),
    timestamp: new Date().toISOString(),
    resolved: false,
    description: description
  };
  
  securityData.security_incidents.unshift(newIncident);
  displayActiveIncidents();
  updateDashboardStats();
  
  // Clear form
  descriptionEl.value = '';
  const threatAnalysis = document.getElementById('threat-analysis');
  if (threatAnalysis) {
    threatAnalysis.style.display = 'none';
  }
  
  alert('Incident reported successfully!');
}

function displayActiveIncidents() {
  const incidentsContainer = document.getElementById('incidents-list');
  if (!incidentsContainer) return;
  
  const activeIncidents = securityData.security_incidents.filter(incident => !incident.resolved);
  
  if (activeIncidents.length === 0) {
    incidentsContainer.innerHTML = '<p>No active incidents</p>';
    return;
  }
  
  incidentsContainer.innerHTML = activeIncidents.map(incident => `
    <div class="incident-item">
      <div class="incident-info">
        <h4>${incident.type} - ${incident.threat_level}</h4>
        <div class="incident-details">
          Location: ${incident.location} | ${new Date(incident.timestamp).toLocaleString()}
        </div>
      </div>
      <div class="incident-actions">
        <button class="btn btn--sm btn--primary" onclick="resolveIncident('${incident.id}')">Resolve</button>
        <button class="btn btn--sm btn--secondary" onclick="viewIncidentDetails('${incident.id}')">Details</button>
      </div>
    </div>
  `).join('');
}

// Person Database System
function setupPersonDatabase() {
  console.log('Setting up person database...');
  
  const searchBtn = document.getElementById('search-person');
  const addBtn = document.getElementById('add-person');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', searchPerson);
  }
  
  if (addBtn) {
    addBtn.addEventListener('click', addNewPerson);
  }
  
  // Show all people initially
  displaySearchResults('all');
}

function searchPerson() {
  const searchTermEl = document.getElementById('person-search');
  const categoryEl = document.getElementById('person-category');
  
  if (!searchTermEl || !categoryEl) {
    console.error('Search form elements not found');
    return;
  }
  
  const searchTerm = searchTermEl.value.trim();
  const category = categoryEl.value;
  
  if (!searchTerm) {
    displaySearchResults(category);
    return;
  }
  
  // Use binary search if searching by exact ID
  if (searchTerm.match(/^(STD|STF|VIS)\d+$/)) {
    const person = binarySearchPerson(searchTerm);
    if (person) {
      displaySearchResults('all', [person]);
    } else {
      displaySearchResults('all', []);
    }
  } else {
    // Linear search for name
    const results = searchByName(searchTerm, category);
    displaySearchResults(category, results);
  }
}

function searchByName(searchTerm, category) {
  const allPeople = [
    ...securityData.students.map(s => ({...s, category: 'student'})),
    ...securityData.staff.map(s => ({...s, category: 'staff'})),
    ...securityData.visitors.map(s => ({...s, category: 'visitor'}))
  ];
  
  let filteredPeople = allPeople;
  if (category !== 'all') {
    filteredPeople = allPeople.filter(person => person.category === category.slice(0, -1));
  }
  
  return filteredPeople.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function displaySearchResults(category, specificResults = null) {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;
  
  let peopleToShow = specificResults;
  if (!peopleToShow) {
    const allPeople = [
      ...securityData.students.map(s => ({...s, category: 'student'})),
      ...securityData.staff.map(s => ({...s, category: 'staff'})),
      ...securityData.visitors.map(s => ({...s, category: 'visitor'}))
    ];
    
    peopleToShow = category === 'all' ? allPeople : allPeople.filter(person => person.category === category.slice(0, -1));
  }
  
  if (peopleToShow.length === 0) {
    resultsContainer.innerHTML = '<p>No people found matching your search criteria.</p>';
    return;
  }
  
  resultsContainer.innerHTML = peopleToShow.map(person => `
    <div class="person-card">
      <div class="person-header">
        <div class="person-info">
          <h4>${person.name}</h4>
          <div class="person-id">${person.id} (${person.category})</div>
        </div>
        <div class="behavior-score">
          <span class="score-value ${getScoreClass(person.behavior_score || 0.5)}">
            ${((person.behavior_score || 0.5) * 100).toFixed(0)}%
          </span>
          <span class="score-label">Behavior Score</span>
        </div>
      </div>
      <div class="person-details">
        ${person.grade ? `<div class="detail-item"><span class="detail-label">Grade:</span><span class="detail-value">${person.grade}</span></div>` : ''}
        ${person.department ? `<div class="detail-item"><span class="detail-label">Department:</span><span class="detail-value">${person.department}</span></div>` : ''}
        ${person.role ? `<div class="detail-item"><span class="detail-label">Role:</span><span class="detail-value">${person.role}</span></div>` : ''}
        ${person.purpose ? `<div class="detail-item"><span class="detail-label">Purpose:</span><span class="detail-value">${person.purpose}</span></div>` : ''}
        <div class="detail-item">
          <span class="detail-label">Authorized:</span>
          <span class="detail-value">${person.authorized ? 'Yes' : 'No'}</span>
        </div>
        ${person.attendance_rate ? `<div class="detail-item"><span class="detail-label">Attendance:</span><span class="detail-value">${(person.attendance_rate * 100).toFixed(0)}%</span></div>` : ''}
      </div>
    </div>
  `).join('');
}

function getScoreClass(score) {
  if (score >= 0.8) return 'high';
  if (score >= 0.6) return 'medium';
  return 'low';
}

function addNewPerson() {
  const idEl = document.getElementById('new-person-id');
  const nameEl = document.getElementById('new-person-name');
  const categoryEl = document.getElementById('new-person-category');
  
  if (!idEl || !nameEl || !categoryEl) {
    console.error('Add person form elements not found');
    return;
  }
  
  const id = idEl.value.trim();
  const name = nameEl.value.trim();
  const category = categoryEl.value;
  
  if (!id || !name) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Check if ID already exists
  if (binarySearchPerson(id)) {
    alert('Person ID already exists');
    return;
  }
  
  const newPerson = {
    id: id,
    name: name,
    authorized: true,
    behavior_score: 0.8 + Math.random() * 0.2 // Random score between 0.8-1.0 for new people
  };
  
  if (category === 'student') {
    newPerson.grade = Math.floor(Math.random() * 4) + 9; // Grade 9-12
    newPerson.attendance_rate = 0.85 + Math.random() * 0.15;
    securityData.students.push(newPerson);
  } else if (category === 'staff') {
    newPerson.department = 'General';
    newPerson.role = 'Staff';
    securityData.staff.push(newPerson);
  } else {
    newPerson.purpose = 'General Visit';
    newPerson.pass_expiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours from now
    securityData.visitors.push(newPerson);
  }
  
  // Clear form
  idEl.value = '';
  nameEl.value = '';
  
  // Refresh search results
  displaySearchResults('all');
  updateDashboardStats();
  
  alert('Person added successfully!');
}

// Security Alerts System
function setupSecurityAlerts() {
  console.log('Setting up security alerts...');
  displaySecurityAlerts();
}

function displaySecurityAlerts() {
  const alertsContainer = document.getElementById('alerts-list');
  if (!alertsContainer) return;
  
  const alerts = securityData.security_incidents;
  
  // Update alert counts
  const criticalCount = alerts.filter(a => a.threat_level === 'CRITICAL' && !a.resolved).length;
  const highCount = alerts.filter(a => a.threat_level === 'HIGH' && !a.resolved).length;
  const mediumCount = alerts.filter(a => a.threat_level === 'MEDIUM' && !a.resolved).length;
  const lowCount = alerts.filter(a => a.threat_level === 'LOW' && !a.resolved).length;
  
  const criticalEl = document.getElementById('critical-count');
  const highEl = document.getElementById('high-count');
  const mediumEl = document.getElementById('medium-count');
  const lowEl = document.getElementById('low-count');
  
  if (criticalEl) criticalEl.textContent = criticalCount;
  if (highEl) highEl.textContent = highCount;
  if (mediumEl) mediumEl.textContent = mediumCount;
  if (lowEl) lowEl.textContent = lowCount;
  
  // Display alert items
  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
  
  alertsContainer.innerHTML = unresolvedAlerts.map(alert => `
    <div class="alert-item ${alert.threat_level.toLowerCase()}">
      <div class="alert-header">
        <h4 class="alert-title">${alert.type}</h4>
        <span class="alert-priority ${alert.threat_level.toLowerCase()}">${alert.threat_level}</span>
      </div>
      <div class="alert-details">
        Location: ${alert.location}
        ${alert.description ? `<br>Description: ${alert.description}` : ''}
      </div>
      <div class="alert-time">${new Date(alert.timestamp).toLocaleString()}</div>
      <div class="alert-actions">
        <button class="btn btn--sm btn--primary" onclick="resolveAlert('${alert.id}')">Resolve</button>
        <button class="btn btn--sm btn--secondary" onclick="escalateAlert('${alert.id}')">Escalate</button>
      </div>
    </div>
  `).join('');
}

// System Settings
function setupSystemSettings() {
  console.log('Setting up system settings...');
  setupRangeControls();
  setupSettingsButtons();
}

function setupRangeControls() {
  const ranges = [
    {id: 'knn-k-value', display: 'knn-k-display', setting: 'knn_k_value'},
    {id: 'nn-threshold', display: 'nn-threshold-display', setting: 'neural_network_threshold'},
    {id: 'threat-sensitivity', display: 'threat-sensitivity-display', setting: 'threat_detection_sensitivity'}
  ];
  
  ranges.forEach(range => {
    const slider = document.getElementById(range.id);
    const display = document.getElementById(range.display);
    
    if (slider && display) {
      slider.addEventListener('input', function() {
        const value = parseFloat(this.value);
        display.textContent = value;
        aiSettings[range.setting] = value;
      });
    }
  });
}

function setupSettingsButtons() {
  const saveBtn = document.getElementById('save-settings');
  const resetBtn = document.getElementById('reset-settings');
  const exportBtn = document.getElementById('export-logs');
  
  if (saveBtn) {
    saveBtn.addEventListener('click', saveSettings);
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', resetSettings);
  }
  
  if (exportBtn) {
    exportBtn.addEventListener('click', exportLogs);
  }
}

function saveSettings() {
  // In a real application, this would save to a server
  console.log('Settings saved:', aiSettings);
  alert('Settings saved successfully!');
}

function resetSettings() {
  // Reset to default values
  aiSettings.knn_k_value = 3;
  aiSettings.neural_network_threshold = 0.7;
  aiSettings.threat_detection_sensitivity = 0.8;
  
  // Update UI
  const knnSlider = document.getElementById('knn-k-value');
  const knnDisplay = document.getElementById('knn-k-display');
  const nnSlider = document.getElementById('nn-threshold');
  const nnDisplay = document.getElementById('nn-threshold-display');
  const threatSlider = document.getElementById('threat-sensitivity');
  const threatDisplay = document.getElementById('threat-sensitivity-display');
  
  if (knnSlider && knnDisplay) {
    knnSlider.value = 3;
    knnDisplay.textContent = '3';
  }
  
  if (nnSlider && nnDisplay) {
    nnSlider.value = 0.7;
    nnDisplay.textContent = '0.7';
  }
  
  if (threatSlider && threatDisplay) {
    threatSlider.value = 0.8;
    threatDisplay.textContent = '0.8';
  }
  
  alert('Settings reset to default values!');
}

function exportLogs() {
  const logs = {
    access_logs: securityData.access_logs,
    security_incidents: securityData.security_incidents,
    export_timestamp: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(logs, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `security_logs_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
}

// Chart Initialization
function initializeCharts() {
  console.log('Initializing charts...');
  createEntryChart();
  createThreatChart();
  createBehaviorChart();
}

function createEntryChart() {
  const ctx = document.getElementById('entryChart');
  if (!ctx) {
    console.log('Entry chart canvas not found');
    return;
  }
  
  if (entryChart) {
    entryChart.destroy();
  }
  
  try {
    entryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        datasets: [{
          label: 'Entries',
          data: [15, 25, 8, 3, 12, 5, 18, 22],
          backgroundColor: '#1FB8CD',
          borderColor: '#1FB8CD',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    console.log('Entry chart created successfully');
  } catch (error) {
    console.error('Error creating entry chart:', error);
  }
}

function createThreatChart() {
  const ctx = document.getElementById('threatChart');
  if (!ctx) {
    console.log('Threat chart canvas not found');
    return;
  }
  
  if (threatChart) {
    threatChart.destroy();
  }
  
  try {
    threatChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Low', 'Medium', 'High', 'Critical'],
        datasets: [{
          data: [12, 5, 2, 1],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#DB4545'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
    console.log('Threat chart created successfully');
  } catch (error) {
    console.error('Error creating threat chart:', error);
  }
}

function createBehaviorChart() {
  const ctx = document.getElementById('behaviorChart');
  if (!ctx) {
    console.log('Behavior chart canvas not found');
    return;
  }
  
  if (behaviorChart) {
    behaviorChart.destroy();
  }
  
  try {
    behaviorChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Students', 'Staff', 'Visitors'],
        datasets: [{
          label: 'Average Behavior Score',
          data: [85, 92, 76],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
    console.log('Behavior chart created successfully');
  } catch (error) {
    console.error('Error creating behavior chart:', error);
  }
}

// Global functions for button events
function resolveIncident(incidentId) {
  console.log(`Resolving incident: ${incidentId}`);
  const incident = securityData.security_incidents.find(inc => inc.id === incidentId);
  if (incident) {
    incident.resolved = true;
    displayActiveIncidents();
    updateDashboardStats();
    alert('Incident resolved successfully!');
  }
}

function resolveAlert(alertId) {
  console.log(`Resolving alert: ${alertId}`);
  resolveIncident(alertId);
  displaySecurityAlerts();
}

function escalateAlert(alertId) {
  console.log(`Escalating alert: ${alertId}`);
  alert('Alert escalated to security management!');
}

function viewIncidentDetails(incidentId) {
  console.log(`Viewing incident details: ${incidentId}`);
  const incident = securityData.security_incidents.find(inc => inc.id === incidentId);
  if (incident) {
    alert(`Incident Details:\nType: ${incident.type}\nLocation: ${incident.location}\nThreat Level: ${incident.threat_level}\nTime: ${new Date(incident.timestamp).toLocaleString()}`);
  }
}

// Make functions globally available
window.resolveIncident = resolveIncident;
window.resolveAlert = resolveAlert;
window.escalateAlert = escalateAlert;
window.viewIncidentDetails = viewIncidentDetails;