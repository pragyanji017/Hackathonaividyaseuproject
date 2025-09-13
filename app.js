// Application Data - Demonstrating Variables & Data Types
const appData = {
    // Arrays/Lists - storing collections of data
    students: [
        {id: 1001, name: "Aarav Sharma", class: "10A", status: "Present", checkIn: "08:15", guardianContact: "+91-9876543210"},
        {id: 1002, name: "Diya Patel", class: "9B", status: "Present", checkIn: "08:20", guardianContact: "+91-9876543211"},
        {id: 1003, name: "Arjun Singh", class: "11C", status: "Absent", checkIn: "N/A", guardianContact: "+91-9876543212"},
        {id: 1004, name: "Kavya Reddy", class: "8A", status: "Present", checkIn: "08:10", guardianContact: "+91-9876543213"},
        {id: 1005, name: "Rohan Kumar", class: "12B", status: "Present", checkIn: "08:25", guardianContact: "+91-9876543214"},
        {id: 1006, name: "Ananya Gupta", class: "7C", status: "Present", checkIn: "08:18", guardianContact: "+91-9876543215"},
        {id: 1007, name: "Vikram Joshi", class: "10B", status: "Present", checkIn: "08:30", guardianContact: "+91-9876543216"},
        {id: 1008, name: "Priya Nair", class: "9A", status: "Late", checkIn: "09:15", guardianContact: "+91-9876543217"},
        {id: 1009, name: "Karan Mehta", class: "11A", status: "Present", checkIn: "08:12", guardianContact: "+91-9876543218"},
        {id: 1010, name: "Sneha Verma", class: "8B", status: "Present", checkIn: "08:22", guardianContact: "+91-9876543219"}
    ],
    
    // Array of alert objects
    alerts: [
        {id: 1, type: "Unauthorized Access", priority: "High", zone: "Main Gate", message: "Unknown person trying to enter school premises", time: "09:45", status: "Active"},
        {id: 2, type: "Medical Emergency", priority: "High", zone: "Playground", message: "Student injured during sports activity", time: "10:20", status: "Resolved"},
        {id: 3, type: "Suspicious Activity", priority: "Medium", zone: "Parking Area", message: "Unattended bag found near vehicles", time: "11:15", status: "Under Investigation"},
        {id: 4, type: "Fire Safety", priority: "Low", zone: "Kitchen", message: "Smoke detector maintenance required", time: "08:30", status: "Scheduled"},
        {id: 5, type: "Security Breach", priority: "High", zone: "Server Room", message: "Unauthorized access attempt detected", time: "12:05", status: "Active"}
    ],
    
    // Dictionary/Object for zone information
    zones: [
        {name: "Main Gate", status: "Yellow", capacity: "15/20", lastIncident: "09:45", securityLevel: "Medium"},
        {name: "Playground", status: "Green", capacity: "45/80", lastIncident: "10:20", securityLevel: "Normal"},
        {name: "Cafeteria", status: "Green", capacity: "32/60", lastIncident: "None", securityLevel: "Normal"},
        {name: "Library", status: "Green", capacity: "18/40", lastIncident: "None", securityLevel: "Normal"},
        {name: "Computer Lab", status: "Green", capacity: "25/30", lastIncident: "None", securityLevel: "Normal"},
        {name: "Parking Area", status: "Yellow", capacity: "28/35", lastIncident: "11:15", securityLevel: "Medium"},
        {name: "Administrative Block", status: "Green", capacity: "12/15", lastIncident: "None", securityLevel: "Normal"},
        {name: "Science Labs", status: "Green", capacity: "20/25", lastIncident: "None", securityLevel: "Normal"}
    ],
    
    // Array of emergency contacts
    emergencyContacts: [
        {type: "Police", number: "100", description: "Local Police Station"},
        {type: "Fire Department", number: "101", description: "Fire Emergency Services"},
        {type: "Ambulance", number: "102", description: "Medical Emergency"},
        {type: "School Principal", number: "+91-9876543220", description: "Dr. Rajesh Kumar"},
        {type: "Security Head", number: "+91-9876543221", description: "Mr. Suresh Patel"},
        {type: "School Nurse", number: "+91-9876543222", description: "Ms. Priya Sharma"}
    ],
    
    // Dictionary for security statistics
    securityStats: {
        totalStudents: 450,
        presentToday: 423,
        absentToday: 27,
        totalAlerts: 15,
        activeAlerts: 2,
        resolvedToday: 8,
        securityLevel: "Normal",
        lastUpdated: "12:30 PM"
    }
};

// Global Variables - Demonstrating different data types
let currentSection = 'dashboard'; // String
let nextAlertId = 6; // Integer
let isSystemOnline = true; // Boolean
let searchQuery = ''; // String for search functionality
let filteredStudents = []; // Array for filtered results
let securityTrendsChart = null; // Object for chart
let alertTypesChart = null; // Object for chart

// Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing SafeSchool Security System...'); // String operation
    initializeApp();
});

// Main initialization function
function initializeApp() {
    try {
        setupNavigation();
        updateDashboard();
        setupAlertManagement();
        setupStudentManagement();
        setupZoneMonitoring();
        setupEmergencyContacts();
        startRealTimeUpdates();
        
        console.log('SafeSchool Security System initialized successfully');
        
        // Initialize with dashboard active
        navigateToSection('dashboard');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Navigation Setup - Demonstrating Event Handling
function setupNavigation() {
    console.log('Setting up navigation...');
    const navButtons = document.querySelectorAll('.nav-item');
    
    // For loop - iterating through navigation buttons
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigation clicked:', this.getAttribute('data-section'));
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                navigateToSection(targetSection);
                updateActiveNavButton(this);
            }
        });
    }
    
    console.log(`Navigation setup complete with ${navButtons.length} buttons`);
}

// Function to navigate between sections
function navigateToSection(sectionId) {
    console.log(`Navigating to section: ${sectionId}`);
    
    // Hide all sections using for loop
    const allSections = document.querySelectorAll('.section');
    for (let i = 0; i < allSections.length; i++) {
        allSections[i].classList.remove('active');
    }
    
    // Show target section using conditional statement
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Conditional initialization based on section
        if (sectionId === 'reports' && (!securityTrendsChart || !alertTypesChart)) {
            setTimeout(setupReportsCharts, 200);
        } else if (sectionId === 'alerts') {
            displayAllAlerts();
        } else if (sectionId === 'students') {
            displayAllStudents();
        } else if (sectionId === 'zones') {
            displayAllZones();
        } else if (sectionId === 'emergency') {
            displayEmergencyContacts();
        } else if (sectionId === 'dashboard') {
            updateDashboard();
        }
        
        console.log(`Successfully navigated to: ${sectionId}`);
    } else {
        console.error(`Section not found: ${sectionId}`);
    }
}

// Function to update active navigation button
function updateActiveNavButton(activeButton) {
    // Remove active class from all buttons using forEach loop
    document.querySelectorAll('.nav-item').forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked button
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Dashboard Functions - Demonstrating Data Processing
function updateDashboard() {
    console.log('Updating dashboard...');
    updateSecurityStats();
    displayRecentAlerts();
    displayZoneStatus();
    updateGlobalStatus();
}

// Function demonstrating calculations and conditionals
function updateSecurityStats() {
    // Calculate present/absent students using array methods
    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    
    // For loop to count student statuses
    for (let i = 0; i < appData.students.length; i++) {
        const student = appData.students[i];
        
        // Conditional statements for status counting
        if (student.status === 'Present') {
            presentCount++;
        } else if (student.status === 'Absent') {
            absentCount++;
        } else if (student.status === 'Late') {
            lateCount++;
        }
    }
    
    // Count active alerts using filter method
    const activeAlerts = appData.alerts.filter(alert => alert.status === 'Active').length;
    
    // Count normal zones
    const normalZones = appData.zones.filter(zone => zone.status === 'Green').length;
    
    // Count resolved alerts today
    const resolvedToday = appData.alerts.filter(alert => alert.status === 'Resolved').length;
    
    // Update DOM elements with calculated values
    updateElementById('students-present', presentCount);
    updateElementById('total-alerts', activeAlerts);
    updateElementById('zones-normal', normalZones);
    updateElementById('resolved-today', resolvedToday);
    updateElementById('present-count', presentCount);
    updateElementById('absent-count', absentCount);
    updateElementById('late-count', lateCount);
    updateElementById('active-alerts-count', activeAlerts);
}

// Utility function for DOM updates
function updateElementById(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Function to display recent alerts on dashboard
function displayRecentAlerts() {
    const container = document.getElementById('recent-alerts-list');
    if (!container) return;
    
    // Get active alerts using array filter
    const recentAlerts = appData.alerts
        .filter(alert => alert.status === 'Active' || alert.status === 'Under Investigation')
        .slice(0, 3); // Get only first 3 alerts
    
    // Generate HTML using template literals (string operations)
    let alertsHTML = '';
    
    // For loop to build HTML string
    for (let i = 0; i < recentAlerts.length; i++) {
        const alert = recentAlerts[i];
        const priorityClass = alert.priority.toLowerCase();
        
        alertsHTML += `
            <div class="alert-preview-item ${priorityClass}">
                <span>${alert.type} - ${alert.zone}</span>
                <span>${alert.time}</span>
            </div>
        `;
    }
    
    // Conditional display based on alerts availability
    if (recentAlerts.length === 0) {
        alertsHTML = '<div class="no-alerts">No active alerts</div>';
    }
    
    container.innerHTML = alertsHTML;
}

// Function to display zone status on dashboard
function displayZoneStatus() {
    const container = document.getElementById('zones-status-grid');
    if (!container) return;
    
    let zonesHTML = '';
    
    // For loop to create zone status items
    for (let i = 0; i < appData.zones.length && i < 6; i++) {
        const zone = appData.zones[i];
        const statusClass = zone.status.toLowerCase();
        
        zonesHTML += `
            <div class="zone-preview-item ${statusClass}">
                ${zone.name}
            </div>
        `;
    }
    
    container.innerHTML = zonesHTML;
}

// Function to determine and update global security status
function updateGlobalStatus() {
    const statusIndicator = document.getElementById('global-status');
    const statusText = document.getElementById('global-status-text');
    
    if (!statusIndicator || !statusText) return;
    
    // Count alerts by priority using conditional logic
    let highPriorityAlerts = 0;
    let mediumPriorityAlerts = 0;
    
    // For loop with nested conditionals
    for (let i = 0; i < appData.alerts.length; i++) {
        const alert = appData.alerts[i];
        if (alert.status === 'Active') {
            if (alert.priority === 'High') {
                highPriorityAlerts++;
            } else if (alert.priority === 'Medium') {
                mediumPriorityAlerts++;
            }
        }
    }
    
    // Determine global status using conditional logic
    let globalStatus = 'normal';
    let statusTextContent = 'Normal';
    
    if (highPriorityAlerts > 0) {
        globalStatus = 'danger';
        statusTextContent = 'High Alert';
    } else if (mediumPriorityAlerts > 0) {
        globalStatus = 'warning';
        statusTextContent = 'Caution';
    }
    
    // Update DOM classes and text
    statusIndicator.className = `status-indicator ${globalStatus}`;
    statusText.textContent = statusTextContent;
}

// Alert Management System
function setupAlertManagement() {
    setupAlertFilters();
    setupAlertForm();
}

// Function to display all alerts
function displayAllAlerts(filterType = 'all') {
    console.log('Displaying alerts with filter:', filterType);
    const container = document.getElementById('alerts-grid');
    if (!container) {
        console.error('Alerts container not found');
        return;
    }
    
    // Filter alerts based on filterType using conditional logic
    let filteredAlerts = [];
    
    if (filterType === 'all') {
        filteredAlerts = appData.alerts;
    } else if (filterType === 'active') {
        filteredAlerts = appData.alerts.filter(alert => alert.status === 'Active');
    } else if (filterType === 'high') {
        filteredAlerts = appData.alerts.filter(alert => alert.priority === 'High');
    } else if (filterType === 'resolved') {
        filteredAlerts = appData.alerts.filter(alert => alert.status === 'Resolved');
    }
    
    // Generate HTML for alerts
    let alertsHTML = '';
    
    // For loop to create alert cards
    for (let i = 0; i < filteredAlerts.length; i++) {
        const alert = filteredAlerts[i];
        const priorityClass = alert.priority.toLowerCase();
        
        alertsHTML += `
            <div class="alert-card ${priorityClass}">
                <div class="alert-header">
                    <span class="alert-type">${alert.type}</span>
                    <span class="alert-priority ${priorityClass}">${alert.priority}</span>
                </div>
                <div class="alert-body">
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-details">
                        <span>Zone: ${alert.zone}</span>
                        <span>Time: ${alert.time}</span>
                        <span>Status: ${alert.status}</span>
                    </div>
                    <div class="alert-actions">
                        <button class="btn btn--sm btn--outline" onclick="viewAlertDetails(${alert.id})">Details</button>
                        ${alert.status === 'Active' ? `<button class="btn btn--sm btn--primary" onclick="resolveAlert(${alert.id})">Resolve</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Handle empty results
    if (filteredAlerts.length === 0) {
        alertsHTML = '<div class="no-alerts" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">No alerts found for the selected filter.</div>';
    }
    
    container.innerHTML = alertsHTML;
    console.log(`Displayed ${filteredAlerts.length} alerts`);
}

// Setup alert filters
function setupAlertFilters() {
    const filterButtons = document.querySelectorAll('.alerts-filters .filter-btn');
    
    // Add event listeners using forEach loop
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            displayAllAlerts(filterType);
            updateActiveFilter(this, '.alerts-filters .filter-btn');
        });
    });
}

// Generic function to update active filter button
function updateActiveFilter(activeButton, selector) {
    document.querySelectorAll(selector).forEach(button => {
        button.classList.remove('active');
    });
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Student Management Functions
function setupStudentManagement() {
    setupStudentSearch();
}

// Function to display all students
function displayAllStudents(studentsToShow = null) {
    console.log('Displaying students...');
    const container = document.getElementById('students-grid');
    if (!container) {
        console.error('Students container not found');
        return;
    }
    
    // Use provided students or all students
    const students = studentsToShow || appData.students;
    let studentsHTML = '';
    
    // For loop to create student cards
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const statusClass = student.status.toLowerCase();
        
        studentsHTML += `
            <div class="student-card ${statusClass}">
                <div class="student-info">
                    <span class="student-name">${student.name}</span>
                    <span class="student-status ${statusClass}">${student.status}</span>
                </div>
                <div class="student-details">
                    <div><strong>ID:</strong> ${student.id}</div>
                    <div><strong>Class:</strong> ${student.class}</div>
                    <div><strong>Check-in:</strong> ${student.checkIn}</div>
                    <div><strong>Guardian:</strong> ${student.guardianContact}</div>
                </div>
            </div>
        `;
    }
    
    // Handle empty results
    if (students.length === 0) {
        studentsHTML = '<div class="no-students" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">No students found.</div>';
    }
    
    container.innerHTML = studentsHTML;
    console.log(`Displayed ${students.length} students`);
}

// Setup student search functionality
function setupStudentSearch() {
    const searchInput = document.getElementById('student-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value.toLowerCase(); // String operation
            performStudentSearch();
        });
    }
}

// Function to perform student search - demonstrating string operations
function performStudentSearch() {
    // If search query is empty, show all students
    if (searchQuery.trim() === '') {
        displayAllStudents();
        return;
    }
    
    // Filter students using string methods
    filteredStudents = [];
    
    // For loop with string matching
    for (let i = 0; i < appData.students.length; i++) {
        const student = appData.students[i];
        
        // String operations for search matching
        const nameMatch = student.name.toLowerCase().includes(searchQuery);
        const idMatch = student.id.toString().includes(searchQuery);
        const classMatch = student.class.toLowerCase().includes(searchQuery);
        
        // Conditional logic for search results
        if (nameMatch || idMatch || classMatch) {
            filteredStudents.push(student);
        }
    }
    
    displayAllStudents(filteredStudents);
}

// Function accessible from HTML onclick
function searchStudents() {
    const searchInput = document.getElementById('student-search');
    if (searchInput) {
        searchQuery = searchInput.value.toLowerCase();
        performStudentSearch();
    }
}

// Zone Monitoring Functions
function setupZoneMonitoring() {
    // Setup is handled in displayAllZones
}

// Function to display security zones
function displayAllZones() {
    console.log('Displaying zones...');
    const container = document.getElementById('zones-grid');
    if (!container) {
        console.error('Zones container not found');
        return;
    }
    
    let zonesHTML = '';
    
    // For loop to create zone cards
    for (let i = 0; i < appData.zones.length; i++) {
        const zone = appData.zones[i];
        const statusClass = zone.status.toLowerCase();
        
        zonesHTML += `
            <div class="zone-card ${statusClass}">
                <div class="zone-header">
                    <span class="zone-name">${zone.name}</span>
                    <span class="zone-status-indicator ${statusClass}">${zone.securityLevel}</span>
                </div>
                <div class="zone-details">
                    <div><strong>Capacity:</strong> ${zone.capacity}</div>
                    <div><strong>Last Incident:</strong> ${zone.lastIncident}</div>
                </div>
                <div class="zone-actions">
                    <button class="btn btn--sm btn--outline" onclick="viewZoneDetails('${zone.name}')">Details</button>
                    <button class="btn btn--sm btn--secondary" onclick="reportIncident('${zone.name}')">Report Incident</button>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = zonesHTML;
    console.log(`Displayed ${appData.zones.length} zones`);
}

// Emergency Contact Functions
function setupEmergencyContacts() {
    // Setup is handled in displayEmergencyContacts
}

// Function to display emergency contacts
function displayEmergencyContacts() {
    console.log('Displaying emergency contacts...');
    const container = document.getElementById('emergency-contacts');
    if (!container) {
        console.error('Emergency contacts container not found');
        return;
    }
    
    let contactsHTML = '';
    
    // For loop to create contact items
    for (let i = 0; i < appData.emergencyContacts.length; i++) {
        const contact = appData.emergencyContacts[i];
        
        contactsHTML += `
            <div class="contact-item">
                <span>${contact.type}: ${contact.description}</span>
                <span class="contact-number">${contact.number}</span>
            </div>
        `;
    }
    
    container.innerHTML = contactsHTML;
    console.log(`Displayed ${appData.emergencyContacts.length} emergency contacts`);
}

// Reports and Charts Functions
function setupReportsCharts() {
    console.log('Setting up reports charts...');
    setTimeout(() => {
        createSecurityTrendsChart();
        createAlertTypesChart();
    }, 100);
}

// Function to create security trends chart
function createSecurityTrendsChart() {
    const ctx = document.getElementById('securityTrendsChart');
    if (!ctx) {
        console.error('Security trends chart canvas not found');
        return;
    }
    
    // Destroy existing chart if it exists
    if (securityTrendsChart) {
        securityTrendsChart.destroy();
    }
    
    // Sample data for demonstration
    const monthlyData = [
        {month: 'Jan', incidents: 12, resolved: 11},
        {month: 'Feb', incidents: 8, resolved: 8},
        {month: 'Mar', incidents: 15, resolved: 14},
        {month: 'Apr', incidents: 10, resolved: 9},
        {month: 'May', incidents: 6, resolved: 6},
        {month: 'Jun', incidents: 9, resolved: 8}
    ];
    
    // Extract labels and data using array methods
    const labels = monthlyData.map(item => item.month);
    const incidentsData = monthlyData.map(item => item.incidents);
    const resolvedData = monthlyData.map(item => item.resolved);
    
    try {
        securityTrendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Incidents',
                    data: incidentsData,
                    backgroundColor: '#1FB8CD',
                    borderColor: '#1FB8CD',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }, {
                    label: 'Resolved',
                    data: resolvedData,
                    backgroundColor: '#B4413C',
                    borderColor: '#B4413C',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Security Trends'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        console.log('Security trends chart created successfully');
    } catch (error) {
        console.error('Error creating security trends chart:', error);
    }
}

// Function to create alert types chart
function createAlertTypesChart() {
    const ctx = document.getElementById('alertTypesChart');
    if (!ctx) {
        console.error('Alert types chart canvas not found');
        return;
    }
    
    // Destroy existing chart if it exists
    if (alertTypesChart) {
        alertTypesChart.destroy();
    }
    
    // Count alert types using object/dictionary
    const alertTypeCounts = {};
    
    // For loop to count alert types
    for (let i = 0; i < appData.alerts.length; i++) {
        const alertType = appData.alerts[i].type;
        
        // Conditional logic to count occurrences
        if (alertTypeCounts[alertType]) {
            alertTypeCounts[alertType]++;
        } else {
            alertTypeCounts[alertType] = 1;
        }
    }
    
    // Convert object to arrays for chart
    const labels = Object.keys(alertTypeCounts);
    const data = Object.values(alertTypeCounts);
    
    try {
        alertTypesChart = new Chart(ctx, {
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
                        text: 'Alert Types Distribution'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        console.log('Alert types chart created successfully');
    } catch (error) {
        console.error('Error creating alert types chart:', error);
    }
}

// Modal Functions
function showAddAlertModal() {
    const modal = document.getElementById('add-alert-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideAddAlertModal() {
    const modal = document.getElementById('add-alert-modal');
    if (modal) {
        modal.classList.add('hidden');
        resetAlertForm();
    }
}

// Setup alert form
function setupAlertForm() {
    const form = document.getElementById('add-alert-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewAlert();
        });
    }
}

// Function to add new alert - demonstrating data manipulation
function addNewAlert() {
    // Get form data using DOM methods
    const type = document.getElementById('alert-type').value;
    const priority = document.getElementById('alert-priority').value;
    const zone = document.getElementById('alert-zone').value;
    const message = document.getElementById('alert-message').value;
    
    // Validate form data using conditional logic
    if (!type || !priority || !zone || !message.trim()) {
        alert('Please fill in all fields');
        return;
    }
    
    // Get current time - demonstrating Date object usage
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                      now.getMinutes().toString().padStart(2, '0');
    
    // Create new alert object
    const newAlert = {
        id: nextAlertId++, // Increment ID
        type: type,
        priority: priority,
        zone: zone,
        message: message,
        time: timeString,
        status: 'Active'
    };
    
    // Add to alerts array using array method
    appData.alerts.unshift(newAlert); // Add to beginning of array
    
    // Update displays
    if (currentSection === 'alerts') {
        displayAllAlerts();
    }
    updateDashboard();
    hideAddAlertModal();
    
    console.log('New alert added:', newAlert);
    alert('Alert added successfully!');
}

// Function to reset alert form
function resetAlertForm() {
    const formFields = ['alert-type', 'alert-priority', 'alert-zone', 'alert-message'];
    
    // For loop to reset form fields
    for (let i = 0; i < formFields.length; i++) {
        const field = document.getElementById(formFields[i]);
        if (field) {
            field.value = '';
        }
    }
}

// Real-time Updates
function startRealTimeUpdates() {
    updateClock();
    updateLastUpdatedTime();
    
    // Update clock every second using setInterval
    setInterval(updateClock, 1000);
    
    // Update dashboard every 30 seconds
    setInterval(function() {
        if (currentSection === 'dashboard') {
            updateDashboard();
        }
        updateLastUpdatedTime();
    }, 30000);
}

// Function to update clock display
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    const clockElement = document.getElementById('current-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Function to update last updated time
function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = timeString;
    }
}

// Utility Functions for HTML onclick handlers
function emergencyCall(number) {
    alert(`Emergency call initiated to ${number}`);
    console.log(`Emergency call to ${number} at ${new Date().toLocaleTimeString()}`);
}

function initiateEvacuation() {
    const confirmation = confirm('Are you sure you want to initiate evacuation procedures?');
    if (confirmation) {
        alert('Evacuation alert activated! All personnel should follow evacuation procedures.');
        console.log('Evacuation initiated at', new Date().toLocaleTimeString());
        
        // Add evacuation alert to system
        const evacuationAlert = {
            id: nextAlertId++,
            type: 'Emergency Evacuation',
            priority: 'High',
            zone: 'All Zones',
            message: 'Emergency evacuation initiated - all personnel must evacuate immediately',
            time: new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'}),
            status: 'Active'
        };
        
        appData.alerts.unshift(evacuationAlert);
        updateDashboard();
        
        // Navigate to alerts section to show the new alert
        navigateToSection('alerts');
        const alertsNavButton = document.querySelector('[data-section="alerts"]');
        if (alertsNavButton) {
            updateActiveNavButton(alertsNavButton);
        }
    }
}

function resolveAlert(alertId) {
    // Find alert in array using for loop
    for (let i = 0; i < appData.alerts.length; i++) {
        if (appData.alerts[i].id === alertId) {
            appData.alerts[i].status = 'Resolved';
            break; // Exit loop when found
        }
    }
    
    // Update displays
    if (currentSection === 'alerts') {
        displayAllAlerts();
    }
    updateDashboard();
    
    console.log(`Alert ${alertId} resolved at ${new Date().toLocaleTimeString()}`);
    alert('Alert resolved successfully!');
}

function viewAlertDetails(alertId) {
    // Find alert using array find method
    const alert = appData.alerts.find(a => a.id === alertId);
    
    if (alert) {
        const details = `Alert Details:
Type: ${alert.type}
Priority: ${alert.priority}
Zone: ${alert.zone}
Message: ${alert.message}
Time: ${alert.time}
Status: ${alert.status}`;
        alert(details);
    }
}

function viewZoneDetails(zoneName) {
    // Find zone using for loop
    let selectedZone = null;
    
    for (let i = 0; i < appData.zones.length; i++) {
        if (appData.zones[i].name === zoneName) {
            selectedZone = appData.zones[i];
            break;
        }
    }
    
    if (selectedZone) {
        const details = `Zone Details:
Name: ${selectedZone.name}
Status: ${selectedZone.status}
Security Level: ${selectedZone.securityLevel}
Capacity: ${selectedZone.capacity}
Last Incident: ${selectedZone.lastIncident}`;
        alert(details);
    }
}

function reportIncident(zoneName) {
    const incidentType = prompt(`Report incident for ${zoneName}. Enter incident type:`);
    
    if (incidentType && incidentType.trim()) {
        const newAlert = {
            id: nextAlertId++,
            type: incidentType.trim(),
            priority: 'Medium',
            zone: zoneName,
            message: `Incident reported in ${zoneName}: ${incidentType}`,
            time: new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'}),
            status: 'Under Investigation'
        };
        
        appData.alerts.unshift(newAlert);
        updateDashboard();
        
        alert(`Incident reported successfully for ${zoneName}`);
        console.log('Incident reported:', newAlert);
    }
}

// Make functions globally available for HTML onclick handlers
window.navigateToSection = navigateToSection;
window.showAddAlertModal = showAddAlertModal;
window.hideAddAlertModal = hideAddAlertModal;
window.searchStudents = searchStudents;
window.emergencyCall = emergencyCall;
window.initiateEvacuation = initiateEvacuation;
window.resolveAlert = resolveAlert;
window.viewAlertDetails = viewAlertDetails;
window.viewZoneDetails = viewZoneDetails;
window.reportIncident = reportIncident;

// Console log for programming concepts demonstration
console.log('SafeSchool Security - Programming Concepts Demonstrated:');
console.log('1. Variables: currentSection, nextAlertId, isSystemOnline');
console.log('2. Data Types: Strings, Numbers, Booleans, Arrays, Objects');
console.log('3. Conditionals: if-else statements for security levels and status checks');
console.log('4. Loops: for loops for data iteration, forEach for event handling');
console.log('5. Arrays: students, alerts, zones, emergencyContacts');
console.log('6. Objects/Dictionaries: individual student/alert/zone records');
console.log('7. Functions: navigation, data processing, chart creation');
console.log('8. String Operations: search functionality, template literals, time formatting');