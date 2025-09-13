// SafeSchool Security System - Programming Concepts Demonstration
// Variables and Data Types (String, Integer, Boolean, Array/List)
let currentSection = 'dashboard'; // String variable
let totalStudents = 250; // Integer variable
let systemActive = true; // Boolean variable
let recentActivity = []; // Array/List for storing activity data
let filteredStudents = []; // Array for search results
let currentTime = new Date(); // Date object

// Application Data Structures (Demonstrating Lists and Objects)
const schoolData = {
  "students": [
    {"id": "KV001", "name": "Aarav Sharma", "class": "10A", "present": true, "checkInTime": "08:15 AM", "parentContact": "+91-9876543210", "attendancePercentage": 92},
    {"id": "KV002", "name": "Diya Patel", "class": "10A", "present": true, "checkInTime": "08:20 AM", "parentContact": "+91-9876543211", "attendancePercentage": 88},
    {"id": "KV003", "name": "Arjun Kumar", "class": "10B", "present": false, "checkInTime": null, "parentContact": "+91-9876543212", "attendancePercentage": 76},
    {"id": "KV004", "name": "Priya Singh", "class": "9A", "present": true, "checkInTime": "08:10 AM", "parentContact": "+91-9876543213", "attendancePercentage": 95},
    {"id": "KV005", "name": "Rohit Gupta", "class": "9B", "present": true, "checkInTime": "08:25 AM", "parentContact": "+91-9876543214", "attendancePercentage": 84},
    {"id": "KV006", "name": "Ananya Reddy", "class": "8A", "present": false, "checkInTime": null, "parentContact": "+91-9876543215", "attendancePercentage": 90},
    {"id": "KV007", "name": "Karthik Menon", "class": "8B", "present": true, "checkInTime": "08:18 AM", "parentContact": "+91-9876543216", "attendancePercentage": 87},
    {"id": "KV008", "name": "Sneha Joshi", "class": "11A", "present": true, "checkInTime": "08:12 AM", "parentContact": "+91-9876543217", "attendancePercentage": 93},
    {"id": "KV009", "name": "Vikram Yadav", "class": "11B", "present": false, "checkInTime": null, "parentContact": "+91-9876543218", "attendancePercentage": 78},
    {"id": "KV010", "name": "Kavya Nair", "class": "12A", "present": true, "checkInTime": "08:22 AM", "parentContact": "+91-9876543219", "attendancePercentage": 96}
  ],
  "incidents": [
    {"id": "INC001", "type": "Bullying", "description": "Student reported verbal harassment in playground", "priority": "High", "status": "In Progress", "timestamp": "2025-01-21 10:30 AM", "reporter": "Teacher - Ms. Gupta", "location": "Playground"},
    {"id": "INC002", "type": "Safety Hazard", "description": "Broken stair railing on second floor", "priority": "Medium", "status": "Open", "timestamp": "2025-01-21 09:15 AM", "reporter": "Maintenance Staff", "location": "Second Floor Stairs"},
    {"id": "INC003", "type": "Medical Emergency", "description": "Student fell during sports period", "priority": "High", "status": "Resolved", "timestamp": "2025-01-20 02:45 PM", "reporter": "Sports Teacher", "location": "Sports Ground"},
    {"id": "INC004", "type": "Suspicious Activity", "description": "Unknown person near school boundary", "priority": "High", "status": "Open", "timestamp": "2025-01-21 11:00 AM", "reporter": "Security Guard", "location": "Main Gate"},
    {"id": "INC005", "type": "Equipment Damage", "description": "Computer lab projector not working", "priority": "Low", "status": "In Progress", "timestamp": "2025-01-21 08:30 AM", "reporter": "Computer Teacher", "location": "Computer Lab"}
  ],
  "visitors": [
    {"id": "VIS001", "name": "Dr. Rajesh Mehta", "purpose": "Parent-Teacher Meeting", "checkIn": "09:30 AM", "checkOut": null, "contactPerson": "Ms. Priya Singh", "visitorBadge": "V001"},
    {"id": "VIS002", "name": "Ms. Sunita Agarwal", "purpose": "Admission Inquiry", "checkIn": "10:15 AM", "checkOut": "11:00 AM", "contactPerson": "Admissions Office", "visitorBadge": "V002"},
    {"id": "VIS003", "name": "Mr. Amit Verma", "purpose": "Vendor Meeting", "checkIn": "11:30 AM", "checkOut": null, "contactPerson": "Administrative Office", "visitorBadge": "V003"},
    {"id": "VIS004", "name": "Inspector Sharma", "purpose": "Safety Inspection", "checkIn": "08:45 AM", "checkOut": "10:30 AM", "contactPerson": "Principal", "visitorBadge": "V004"}
  ],
  "emergencyContacts": [
    {"type": "Fire Department", "number": "101", "name": "Delhi Fire Services"},
    {"type": "Police", "number": "100", "name": "Delhi Police"},
    {"type": "Medical Emergency", "number": "108", "name": "Ambulance Service"},
    {"type": "School Principal", "number": "+91-9876543200", "name": "Dr. Vandana Sharma"},
    {"type": "Vice Principal", "number": "+91-9876543201", "name": "Mr. Suresh Kumar"},
    {"type": "Security Head", "number": "+91-9876543202", "name": "Mr. Rajesh Singh"}
  ],
  "attendanceHistory": [
    {"date": "2025-01-21", "totalStudents": 250, "present": 235, "absent": 15},
    {"date": "2025-01-20", "totalStudents": 250, "present": 242, "absent": 8},
    {"date": "2025-01-19", "totalStudents": 250, "present": 238, "absent": 12},
    {"date": "2025-01-18", "totalStudents": 250, "present": 245, "absent": 5},
    {"date": "2025-01-17", "totalStudents": 250, "present": 240, "absent": 10}
  ]
};

// Global chart variables
let attendanceChart = null;
let incidentChart = null;

// Algorithm Demonstration: Linear Search Function
function findStudentById(studentId) {
  // Linear search algorithm demonstration
  for (let i = 0; i < schoolData.students.length; i++) {
    if (schoolData.students[i].id === studentId) {
      return schoolData.students[i]; // Return found student
    }
  }
  return null; // Student not found
}

// Algorithm Demonstration: Bubble Sort for Incidents by Priority
function sortIncidentsByPriority(incidents) {
  let sortedIncidents = [...incidents]; // Create copy of array
  let n = sortedIncidents.length;
  
  // Priority mapping: High = 3, Medium = 2, Low = 1
  const priorityValue = {"High": 3, "Medium": 2, "Low": 1};
  
  // Bubble sort algorithm
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (priorityValue[sortedIncidents[j].priority] < priorityValue[sortedIncidents[j + 1].priority]) {
        // Swap elements
        let temp = sortedIncidents[j];
        sortedIncidents[j] = sortedIncidents[j + 1];
        sortedIncidents[j + 1] = temp;
      }
    }
  }
  return sortedIncidents;
}

// Function: Calculate Attendance Percentage
function calculateAttendancePercentage(present, total) {
  if (total === 0) return 0; // Conditional statement to prevent division by zero
  return Math.round((present / total) * 100);
}

// Function: Update Real-time Clock (Demonstrating setInterval and DOM manipulation)
function updateTime() {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    currentTime = new Date(); // Update current time variable
    const timeString = currentTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    timeElement.textContent = timeString;
  }
}

// Event Listener: DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('SafeSchool Security System Initializing...');
  initializeApplication();
});

// Main Initialization Function
function initializeApplication() {
  setupNavigation();
  setupDashboard();
  displayStudentsList();
  displayIncidentsList();
  displayVisitorsList();
  displayEmergencyContacts();
  
  // Start real-time clock
  updateTime();
  setInterval(updateTime, 1000); // Update every second
  
  // Initialize charts after a delay to ensure DOM is ready
  setTimeout(function() {
    initializeCharts();
  }, 500);
  
  // Load recent activity
  loadRecentActivity();
  
  console.log('Application initialized successfully');
}

// Navigation Setup Function
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-item');
  
  // Loop through navigation buttons (for loop demonstration)
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      if (targetSection) { // Conditional statement
        navigateToSection(targetSection);
        updateActiveNavButton(this);
      }
    });
  }
}

// Navigation Function
function navigateToSection(sectionId) {
  // Hide all sections using a loop
  const allSections = document.querySelectorAll('.section');
  for (let i = 0; i < allSections.length; i++) {
    allSections[i].classList.remove('active');
  }
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) { // Conditional check
    targetSection.classList.add('active');
    currentSection = sectionId; // Update global variable
    
    // Special handling for analytics section
    if (sectionId === 'analytics' && (!attendanceChart || !incidentChart)) {
      setTimeout(initializeCharts, 100);
    }
  }
}

// Function: Update Active Navigation Button
function updateActiveNavButton(activeButton) {
  // Remove active class from all buttons
  const navButtons = document.querySelectorAll('.nav-item');
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove('active');
  }
  
  // Add active class to clicked button
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Dashboard Setup Function
function setupDashboard() {
  // Calculate statistics using loops and conditionals
  let presentCount = 0;
  let absentCount = 0;
  
  // Count present and absent students (loop demonstration)
  for (let i = 0; i < schoolData.students.length; i++) {
    if (schoolData.students[i].present) { // Conditional statement
      presentCount++;
    } else {
      absentCount++;
    }
  }
  
  // Update dashboard statistics
  updateStatistic('students-present', presentCount);
  updateStatistic('students-absent', absentCount);
  updateStatistic('active-incidents', getActiveIncidentsCount());
  updateStatistic('current-visitors', getCurrentVisitorsCount());
}

// Helper Functions for Statistics
function updateStatistic(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
  }
}

function getActiveIncidentsCount() {
  let activeCount = 0;
  // Loop through incidents to count active ones
  for (let i = 0; i < schoolData.incidents.length; i++) {
    if (schoolData.incidents[i].status !== 'Resolved') { // Conditional
      activeCount++;
    }
  }
  return activeCount;
}

function getCurrentVisitorsCount() {
  let currentCount = 0;
  // Count visitors currently in school (checkOut is null)
  for (let i = 0; i < schoolData.visitors.length; i++) {
    if (schoolData.visitors[i].checkOut === null) { // Conditional
      currentCount++;
    }
  }
  return currentCount;
}

// Student Management Functions
function displayStudentsList() {
  const studentsList = document.getElementById('students-list');
  if (!studentsList) return;
  
  let html = '';
  
  // Use loop to generate HTML for each student
  for (let i = 0; i < schoolData.students.length; i++) {
    const student = schoolData.students[i];
    const statusClass = student.present ? 'present' : 'absent';
    const statusText = student.present ? 'Present' : 'Absent';
    const checkInDisplay = student.checkInTime || 'Not checked in';
    
    html += `
      <div class="student-item" data-student-id="${student.id}">
        <div class="student-id">${student.id}</div>
        <div class="student-name">${student.name}</div>
        <div class="student-class">${student.class}</div>
        <div class="student-checkin">${checkInDisplay}</div>
        <div class="student-attendance">${student.attendancePercentage}%</div>
        <div class="attendance-status ${statusClass}">${statusText}</div>
      </div>
    `;
  }
  
  studentsList.innerHTML = html;
}

// Search Function (Linear Search Algorithm Demonstration)
function searchStudents() {
  const searchInput = document.getElementById('student-search');
  const searchTerm = searchInput.value.toLowerCase();
  
  if (searchTerm === '') {
    displayStudentsList(); // Show all students if search is empty
    return;
  }
  
  // Linear search implementation
  let foundStudents = [];
  for (let i = 0; i < schoolData.students.length; i++) {
    const student = schoolData.students[i];
    // Check if name or ID matches search term
    if (student.name.toLowerCase().includes(searchTerm) || 
        student.id.toLowerCase().includes(searchTerm)) {
      foundStudents.push(student);
    }
  }
  
  // Display search results
  displayFilteredStudents(foundStudents);
  
  // Add activity log
  addActivity('🔍', `Searched for students: "${searchTerm}" - Found ${foundStudents.length} results`);
}

// Filter Function (Demonstrating multiple conditions)
function filterStudents() {
  const classFilter = document.getElementById('class-filter').value;
  const statusFilter = document.getElementById('status-filter').value;
  
  let filteredStudents = [];
  
  // Apply filters using nested conditionals
  for (let i = 0; i < schoolData.students.length; i++) {
    const student = schoolData.students[i];
    let includeStudent = true;
    
    // Class filter condition
    if (classFilter !== 'all' && student.class !== classFilter) {
      includeStudent = false;
    }
    
    // Status filter condition
    if (statusFilter !== 'all') {
      if (statusFilter === 'present' && !student.present) {
        includeStudent = false;
      } else if (statusFilter === 'absent' && student.present) {
        includeStudent = false;
      }
    }
    
    if (includeStudent) {
      filteredStudents.push(student);
    }
  }
  
  displayFilteredStudents(filteredStudents);
}

// Function to Display Filtered Students
function displayFilteredStudents(students) {
  const studentsList = document.getElementById('students-list');
  if (!studentsList) return;
  
  let html = '';
  
  if (students.length === 0) {
    html = '<div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">No students found matching the criteria.</div>';
  } else {
    // Generate HTML for filtered students
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const statusClass = student.present ? 'present' : 'absent';
      const statusText = student.present ? 'Present' : 'Absent';
      const checkInDisplay = student.checkInTime || 'Not checked in';
      
      html += `
        <div class="student-item" data-student-id="${student.id}">
          <div class="student-id">${student.id}</div>
          <div class="student-name">${student.name}</div>
          <div class="student-class">${student.class}</div>
          <div class="student-checkin">${checkInDisplay}</div>
          <div class="student-attendance">${student.attendancePercentage}%</div>
          <div class="attendance-status ${statusClass}">${statusText}</div>
        </div>
      `;
    }
  }
  
  studentsList.innerHTML = html;
}

// Incident Management Functions
function displayIncidentsList() {
  // Sort incidents by priority using bubble sort algorithm
  const sortedIncidents = sortIncidentsByPriority(schoolData.incidents);
  const incidentsList = document.getElementById('incidents-list');
  
  if (!incidentsList) return;
  
  let html = '';
  
  // Generate HTML for each incident using loop
  for (let i = 0; i < sortedIncidents.length; i++) {
    const incident = sortedIncidents[i];
    const priorityClass = incident.priority.toLowerCase();
    const statusClass = incident.status.toLowerCase().replace(' ', '-');
    
    html += `
      <div class="incident-item ${priorityClass}" data-incident-id="${incident.id}">
        <div class="incident-header">
          <h4 class="incident-title">${incident.type}</h4>
          <div class="incident-meta">
            <span class="incident-priority ${priorityClass}">${incident.priority}</span>
            <span class="incident-status ${statusClass}">${incident.status}</span>
          </div>
        </div>
        <p class="incident-description">${incident.description}</p>
        <div class="incident-footer">
          <span>Location: ${incident.location}</span>
          <span>Reporter: ${incident.reporter}</span>
          <span>${incident.timestamp}</span>
        </div>
      </div>
    `;
  }
  
  incidentsList.innerHTML = html;
}

// Filter Incidents Function
function filterIncidents() {
  const statusFilter = document.getElementById('incident-status-filter').value;
  const priorityFilter = document.getElementById('incident-priority-filter').value;
  
  let filteredIncidents = [];
  
  // Apply filters using conditional statements
  for (let i = 0; i < schoolData.incidents.length; i++) {
    const incident = schoolData.incidents[i];
    let includeIncident = true;
    
    // Status filter
    if (statusFilter !== 'all' && incident.status !== statusFilter) {
      includeIncident = false;
    }
    
    // Priority filter
    if (priorityFilter !== 'all' && incident.priority !== priorityFilter) {
      includeIncident = false;
    }
    
    if (includeIncident) {
      filteredIncidents.push(incident);
    }
  }
  
  // Display filtered and sorted incidents
  displayFilteredIncidents(filteredIncidents);
}

function displayFilteredIncidents(incidents) {
  const sortedIncidents = sortIncidentsByPriority(incidents);
  const incidentsList = document.getElementById('incidents-list');
  
  if (!incidentsList) return;
  
  let html = '';
  
  if (incidents.length === 0) {
    html = '<div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">No incidents found matching the criteria.</div>';
  } else {
    for (let i = 0; i < sortedIncidents.length; i++) {
      const incident = sortedIncidents[i];
      const priorityClass = incident.priority.toLowerCase();
      const statusClass = incident.status.toLowerCase().replace(' ', '-');
      
      html += `
        <div class="incident-item ${priorityClass}" data-incident-id="${incident.id}">
          <div class="incident-header">
            <h4 class="incident-title">${incident.type}</h4>
            <div class="incident-meta">
              <span class="incident-priority ${priorityClass}">${incident.priority}</span>
              <span class="incident-status ${statusClass}">${incident.status}</span>
            </div>
          </div>
          <p class="incident-description">${incident.description}</p>
          <div class="incident-footer">
            <span>Location: ${incident.location}</span>
            <span>Reporter: ${incident.reporter}</span>
            <span>${incident.timestamp}</span>
          </div>
        </div>
      `;
    }
  }
  
  incidentsList.innerHTML = html;
}

// Visitor Management Functions
function displayVisitorsList() {
  displayCurrentVisitors();
  displayAllVisitors();
}

function displayCurrentVisitors() {
  const currentVisitorsList = document.getElementById('current-visitors-list');
  if (!currentVisitorsList) return;
  
  let html = '';
  let currentVisitors = [];
  
  // Find current visitors (checkOut is null)
  for (let i = 0; i < schoolData.visitors.length; i++) {
    if (schoolData.visitors[i].checkOut === null) {
      currentVisitors.push(schoolData.visitors[i]);
    }
  }
  
  if (currentVisitors.length === 0) {
    html = '<div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">No visitors currently in school.</div>';
  } else {
    for (let i = 0; i < currentVisitors.length; i++) {
      const visitor = currentVisitors[i];
      html += `
        <div class="visitor-card">
          <div class="visitor-name">${visitor.name}</div>
          <div class="visitor-purpose">${visitor.purpose}</div>
          <div class="visitor-contact">Contact: ${visitor.contactPerson}</div>
          <div class="visitor-badge">Badge: ${visitor.visitorBadge}</div>
          <div style="margin-top: 8px; font-size: 12px; color: var(--color-text-secondary);">
            Check-in: ${visitor.checkIn}
          </div>
        </div>
      `;
    }
  }
  
  currentVisitorsList.innerHTML = html;
}

function displayAllVisitors() {
  const allVisitorsList = document.getElementById('all-visitors-list');
  if (!allVisitorsList) return;
  
  let html = '';
  
  for (let i = 0; i < schoolData.visitors.length; i++) {
    const visitor = schoolData.visitors[i];
    const checkOut = visitor.checkOut || 'Still in school';
    
    html += `
      <div class="visitor-row">
        <div>${visitor.name}</div>
        <div>${visitor.purpose}</div>
        <div>${visitor.checkIn}</div>
        <div>${checkOut}</div>
        <div>${visitor.visitorBadge}</div>
      </div>
    `;
  }
  
  allVisitorsList.innerHTML = html;
}

// Emergency Contacts Display
function displayEmergencyContacts() {
  const contactsList = document.getElementById('emergency-contacts-list');
  if (!contactsList) return;
  
  let html = '';
  
  for (let i = 0; i < schoolData.emergencyContacts.length; i++) {
    const contact = schoolData.emergencyContacts[i];
    html += `
      <div class="contact-card">
        <div class="contact-info">
          <h4>${contact.type}</h4>
          <p>${contact.name}</p>
        </div>
        <div class="contact-number">${contact.number}</div>
      </div>
    `;
  }
  
  contactsList.innerHTML = html;
}

// Chart Initialization Functions
function initializeCharts() {
  createAttendanceChart();
  createIncidentChart();
}

function createAttendanceChart() {
  const ctx = document.getElementById('attendanceChart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (attendanceChart) {
    attendanceChart.destroy();
  }
  
  // Prepare data from attendance history
  const labels = [];
  const presentData = [];
  const absentData = [];
  
  // Use loop to process attendance history data
  for (let i = 0; i < schoolData.attendanceHistory.length; i++) {
    const record = schoolData.attendanceHistory[i];
    labels.push(record.date);
    presentData.push(record.present);
    absentData.push(record.absent);
  }
  
  attendanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.reverse(), // Show chronological order
      datasets: [{
        label: 'Present',
        data: presentData.reverse(),
        backgroundColor: '#1FB8CD',
        borderColor: '#1FB8CD',
        borderWidth: 2,
        fill: false
      }, {
        label: 'Absent',
        data: absentData.reverse(),
        backgroundColor: '#B4413C',
        borderColor: '#B4413C',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Weekly Attendance Trend'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function createIncidentChart() {
  const ctx = document.getElementById('incidentChart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (incidentChart) {
    incidentChart.destroy();
  }
  
  // Count incidents by type using loops and conditionals
  const incidentTypes = {};
  for (let i = 0; i < schoolData.incidents.length; i++) {
    const incident = schoolData.incidents[i];
    if (incidentTypes[incident.type]) {
      incidentTypes[incident.type]++;
    } else {
      incidentTypes[incident.type] = 1;
    }
  }
  
  const labels = Object.keys(incidentTypes);
  const data = Object.values(incidentTypes);
  
  incidentChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Incident Types Distribution'
        }
      }
    }
  });
}

// Activity Feed Functions
function loadRecentActivity() {
  // Initialize with some recent activities
  const activities = [
    {icon: '👨‍🎓', text: 'Kavya Nair checked in late at 08:22 AM', time: '5 minutes ago'},
    {icon: '🚨', text: 'New incident reported: Suspicious Activity at Main Gate', time: '15 minutes ago'},
    {icon: '👥', text: 'Mr. Amit Verma registered as visitor', time: '30 minutes ago'},
    {icon: '✅', text: 'System check completed successfully', time: '1 hour ago'},
    {icon: '📊', text: 'Daily attendance: 94% (235/250 students)', time: '2 hours ago'}
  ];
  
  displayActivityFeed(activities);
}

function displayActivityFeed(activities) {
  const activityFeed = document.getElementById('activity-feed');
  if (!activityFeed) return;
  
  let html = '';
  
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    html += `
      <div class="activity-item">
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-content">
          <div class="activity-text">${activity.text}</div>
          <div class="activity-time">${activity.time}</div>
        </div>
      </div>
    `;
  }
  
  activityFeed.innerHTML = html;
}

function addActivity(icon, text) {
  const activityFeed = document.getElementById('activity-feed');
  if (!activityFeed) return;
  
  const newActivity = document.createElement('div');
  newActivity.className = 'activity-item';
  newActivity.innerHTML = `
    <div class="activity-icon">${icon}</div>
    <div class="activity-content">
      <div class="activity-text">${text}</div>
      <div class="activity-time">Just now</div>
    </div>
  `;
  
  // Insert at the beginning of the feed
  activityFeed.insertBefore(newActivity, activityFeed.firstChild);
  
  // Keep only the latest 10 activities
  const activities = activityFeed.querySelectorAll('.activity-item');
  if (activities.length > 10) {
    activityFeed.removeChild(activities[activities.length - 1]);
  }
}

// Modal Functions
function openIncidentForm() {
  const modal = document.getElementById('incident-modal');
  if (modal) {
    modal.classList.remove('hidden');
    // Clear form
    document.getElementById('incident-form').reset();
  }
}

function closeIncidentForm() {
  const modal = document.getElementById('incident-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function submitIncident() {
  // Get form data
  const type = document.getElementById('incident-type').value;
  const priority = document.getElementById('incident-priority').value;
  const location = document.getElementById('incident-location').value;
  const description = document.getElementById('incident-description').value;
  const reporter = document.getElementById('incident-reporter').value;
  
  // Validate form (conditional statements)
  if (!type || !priority || !location || !description || !reporter) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Create new incident object
  const newIncident = {
    id: `INC${String(schoolData.incidents.length + 1).padStart(3, '0')}`,
    type: type,
    description: description,
    priority: priority,
    status: 'Open',
    timestamp: new Date().toLocaleString('en-IN'),
    reporter: reporter,
    location: location
  };
  
  // Add to incidents array
  schoolData.incidents.push(newIncident);
  
  // Update display
  displayIncidentsList();
  
  // Update dashboard stats
  setupDashboard();
  
  // Add activity
  addActivity('🚨', `New ${priority.toLowerCase()} priority incident reported: ${type} at ${location}`);
  
  // Close modal
  closeIncidentForm();
  
  // Show success message
  alert('Incident reported successfully!');
}

function openVisitorForm() {
  const modal = document.getElementById('visitor-modal');
  if (modal) {
    modal.classList.remove('hidden');
    // Clear form
    document.getElementById('visitor-form').reset();
  }
}

function closeVisitorForm() {
  const modal = document.getElementById('visitor-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function submitVisitor() {
  // Get form data
  const name = document.getElementById('visitor-name').value;
  const purpose = document.getElementById('visitor-purpose').value;
  const contact = document.getElementById('visitor-contact').value;
  const phone = document.getElementById('visitor-phone').value;
  
  // Validate required fields
  if (!name || !purpose || !contact) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Generate visitor badge
  const badgeNumber = `V${String(schoolData.visitors.length + 1).padStart(3, '0')}`;
  
  // Create new visitor object
  const newVisitor = {
    id: `VIS${String(schoolData.visitors.length + 1).padStart(3, '0')}`,
    name: name,
    purpose: purpose,
    checkIn: new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit', hour12: true}),
    checkOut: null,
    contactPerson: contact,
    visitorBadge: badgeNumber,
    phone: phone
  };
  
  // Add to visitors array
  schoolData.visitors.push(newVisitor);
  
  // Update displays
  displayVisitorsList();
  setupDashboard();
  
  // Add activity
  addActivity('👥', `New visitor registered: ${name} for ${purpose}`);
  
  // Close modal
  closeVisitorForm();
  
  // Show success message with badge info
  alert(`Visitor registered successfully!\nBadge Number: ${badgeNumber}\nPlease print visitor badge.`);
}

// Emergency Alert Functions
function triggerEmergency(type) {
  const modal = document.getElementById('emergency-modal');
  const title = document.getElementById('emergency-title');
  const message = document.getElementById('emergency-message');
  
  if (!modal || !title || !message) return;
  
  // Set emergency type and message based on type using conditionals
  let emergencyTitle = '';
  let emergencyMessage = '';
  
  if (type === 'fire') {
    emergencyTitle = '🔥 FIRE EMERGENCY ALERT';
    emergencyMessage = 'Fire emergency alert will be triggered. This will sound the fire alarm and notify the fire department immediately.';
  } else if (type === 'medical') {
    emergencyTitle = '🚑 MEDICAL EMERGENCY ALERT';
    emergencyMessage = 'Medical emergency alert will be triggered. This will notify medical services and school personnel immediately.';
  } else if (type === 'security') {
    emergencyTitle = '🚨 SECURITY ALERT';
    emergencyMessage = 'Security alert will be triggered. This will notify security personnel and police immediately.';
  } else if (type === 'lockdown') {
    emergencyTitle = '🔒 LOCKDOWN ALERT';
    emergencyMessage = 'Lockdown alert will be triggered. This will secure all entrances and notify authorities immediately.';
  }
  
  title.textContent = emergencyTitle;
  message.textContent = emergencyMessage;
  
  // Store emergency type for confirmation
  modal.setAttribute('data-emergency-type', type);
  
  // Show modal
  modal.classList.remove('hidden');
}

function confirmEmergency() {
  const modal = document.getElementById('emergency-modal');
  const emergencyType = modal.getAttribute('data-emergency-type');
  
  // Log emergency activation
  console.log(`EMERGENCY ACTIVATED: ${emergencyType.toUpperCase()}`);
  
  // Add emergency incident
  const emergencyIncident = {
    id: `INC${String(schoolData.incidents.length + 1).padStart(3, '0')}`,
    type: 'Emergency Alert',
    description: `${emergencyType.charAt(0).toUpperCase() + emergencyType.slice(1)} emergency alert activated`,
    priority: 'High',
    status: 'In Progress',
    timestamp: new Date().toLocaleString('en-IN'),
    reporter: 'Security System',
    location: 'School-wide'
  };
  
  schoolData.incidents.push(emergencyIncident);
  
  // Update displays
  displayIncidentsList();
  setupDashboard();
  
  // Add activity
  addActivity('🚨', `EMERGENCY ALERT: ${emergencyType.toUpperCase()} emergency activated`);
  
  // Close modal
  modal.classList.add('hidden');
  
  // Show confirmation
  alert(`${emergencyType.toUpperCase()} emergency has been activated!\nAuthorities have been notified.\nPlease follow emergency procedures.`);
}

function cancelEmergency() {
  const modal = document.getElementById('emergency-modal');
  modal.classList.add('hidden');
}

// Report Generation Function
function generateReport() {
  const reportType = document.getElementById('report-type').value;
  const reportPeriod = document.getElementById('report-period').value;
  
  let reportData = '';
  
  // Generate report based on type using conditional statements
  if (reportType === 'attendance') {
    reportData = generateAttendanceReport(reportPeriod);
  } else if (reportType === 'incidents') {
    reportData = generateIncidentsReport(reportPeriod);
  } else if (reportType === 'visitors') {
    reportData = generateVisitorsReport(reportPeriod);
  } else if (reportType === 'safety') {
    reportData = generateSafetyReport(reportPeriod);
  }
  
  // Display report (in a real application, this would generate a PDF or CSV)
  alert(`${reportType.toUpperCase()} REPORT (${reportPeriod.toUpperCase()})\n\n${reportData}`);
  
  // Add activity
  addActivity('📊', `Generated ${reportType} report for ${reportPeriod}`);
}

function generateAttendanceReport(period) {
  let presentCount = 0;
  let absentCount = 0;
  
  // Calculate attendance statistics
  for (let i = 0; i < schoolData.students.length; i++) {
    if (schoolData.students[i].present) {
      presentCount++;
    } else {
      absentCount++;
    }
  }
  
  const totalStudents = schoolData.students.length;
  const attendanceRate = calculateAttendancePercentage(presentCount, totalStudents);
  
  return `Total Students: ${totalStudents}
Present: ${presentCount}
Absent: ${absentCount}
Attendance Rate: ${attendanceRate}%

Class-wise Breakdown:
(This would show detailed class-wise statistics in a full implementation)`;
}

function generateIncidentsReport(period) {
  const totalIncidents = schoolData.incidents.length;
  let openIncidents = 0;
  let resolvedIncidents = 0;
  
  // Count incidents by status
  for (let i = 0; i < schoolData.incidents.length; i++) {
    if (schoolData.incidents[i].status === 'Resolved') {
      resolvedIncidents++;
    } else {
      openIncidents++;
    }
  }
  
  return `Total Incidents: ${totalIncidents}
Open/In Progress: ${openIncidents}
Resolved: ${resolvedIncidents}
Resolution Rate: ${Math.round((resolvedIncidents / totalIncidents) * 100)}%

Most Common Types:
(This would show incident type statistics in a full implementation)`;
}

function generateVisitorsReport(period) {
  let currentVisitors = 0;
  const totalVisitors = schoolData.visitors.length;
  
  // Count current visitors
  for (let i = 0; i < schoolData.visitors.length; i++) {
    if (schoolData.visitors[i].checkOut === null) {
      currentVisitors++;
    }
  }
  
  return `Total Visitors: ${totalVisitors}
Currently In School: ${currentVisitors}
Checked Out: ${totalVisitors - currentVisitors}

Most Common Purposes:
(This would show visitor purpose statistics in a full implementation)`;
}

function generateSafetyReport(period) {
  return `SAFETY SUMMARY REPORT

Security System Status: All Active
Emergency Response Time: 3.2 minutes average
Safety Training Completion: 87%
Incident Resolution Rate: 60%

Key Metrics:
- No major security breaches
- Emergency systems tested and operational
- Staff training up to date
- Parent satisfaction: 4.6/5.0

Recommendations:
- Continue monthly safety drills
- Update emergency contact information
- Review incident response procedures`;
}

// Make functions globally available for HTML onclick handlers
window.searchStudents = searchStudents;
window.filterStudents = filterStudents;
window.filterIncidents = filterIncidents;
window.openIncidentForm = openIncidentForm;
window.closeIncidentForm = closeIncidentForm;
window.submitIncident = submitIncident;
window.openVisitorForm = openVisitorForm;
window.closeVisitorForm = closeVisitorForm;
window.submitVisitor = submitVisitor;
window.triggerEmergency = triggerEmergency;
window.confirmEmergency = confirmEmergency;
window.cancelEmergency = cancelEmergency;
window.generateReport = generateReport;

// Programming Concepts Summary:
// 1. Variables: currentSection, totalStudents, systemActive, recentActivity, etc.
// 2. Data Types: Strings, Integers, Booleans, Arrays, Objects
// 3. Functions: Modular, reusable code for different features
// 4. Loops: for loops for processing arrays and generating HTML
// 5. Conditionals: if-else statements for decision making
// 6. Algorithms: Linear search (findStudentById), Bubble sort (sortIncidentsByPriority)
// 7. Data Structures: Arrays for lists, Objects for structured data
// 8. DOM Manipulation: Dynamic content updates and event handling
// 9. Real-time Updates: setInterval for clock updates
// 10. Form Handling: Data collection and validation

console.log('SafeSchool Security System JavaScript loaded successfully');
console.log('Programming concepts demonstrated: Variables, Functions, Loops, Conditionals, Arrays, Objects, Algorithms');