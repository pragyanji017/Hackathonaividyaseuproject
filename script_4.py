# Now let's create the comprehensive security monitoring system
# This combines all our algorithms and implements real-time monitoring

class SchoolSecuritySystem:
    def __init__(self):
        self.database = SecurityDatabase()
        self.knn_classifier = KNNSecurityClassifier(k=3)
        self.behavior_analyzer = BehaviorAnalyzer()
        self.active_alerts = []
        self.security_log = []
        
        # Initialize with existing data
        self.initialize_system()
    
    def initialize_system(self):
        """Initialize the security system with existing data"""
        # Populate database
        for student in security_data.student_database:
            self.database.add_person("student", student)
        
        # Train KNN classifier
        self.knn_classifier.train(security_data.security_incidents)
        
        # Train behavior analyzer
        self.behavior_analyzer.train(security_data.student_database, epochs=30)
        
        print("School Security System initialized successfully!")
    
    def process_entry_attempt(self, person_id, location, access_method):
        """Process an entry attempt and return security decision"""
        # Get person information
        security_status = self.database.get_security_status(person_id)
        
        # Create entry log
        entry_log = {
            'timestamp': datetime.datetime.now(),
            'person_id': person_id,
            'location': location,
            'access_method': access_method,
            'status': security_status
        }
        
        # Security decision logic
        if not security_status['found']:
            decision = "DENY - Unknown person"
            alert_level = "HIGH"
        elif not security_status['access_granted']:
            decision = "DENY - Unauthorized"
            alert_level = "MEDIUM"
        else:
            decision = "ALLOW - Authorized"
            alert_level = "LOW"
            
            # Additional behavior analysis for students
            if security_status['person_type'] == 'student':
                risk_category, risk_score = self.behavior_analyzer.analyze_behavior(security_status['person'])
                if risk_score > 0.7:  # High risk threshold
                    alert_level = "MEDIUM"
                    decision += f" - Monitor ({risk_category})"
        
        # Log the entry attempt
        entry_log['decision'] = decision
        entry_log['alert_level'] = alert_level
        self.security_log.append(entry_log)
        
        # Create alert if necessary
        if alert_level in ["HIGH", "MEDIUM"]:
            self.create_alert(entry_log)
        
        return entry_log
    
    def detect_incident(self, incident_data):
        """Detect and classify security incidents"""
        # Use KNN to predict threat level
        predicted_threat, confidence = self.knn_classifier.predict(incident_data)
        
        # Create incident record
        incident_record = {
            'id': f"INC{len(security_data.security_incidents) + 1000}",
            'timestamp': datetime.datetime.now(),
            'type': incident_data['type'],
            'location': incident_data['location'],
            'predicted_threat': predicted_threat,
            'confidence': confidence,
            'status': 'ACTIVE'
        }
        
        # Add to incidents
        security_data.security_incidents.append(incident_record)
        
        # Create high priority alert for critical threats
        if predicted_threat in ['HIGH', 'CRITICAL']:
            self.create_alert(incident_record, alert_type='INCIDENT')
        
        return incident_record
    
    def create_alert(self, data, alert_type='ACCESS'):
        """Create security alert"""
        alert = {
            'id': f"ALT{len(self.active_alerts) + 1}",
            'timestamp': datetime.datetime.now(),
            'type': alert_type,
            'data': data,
            'status': 'ACTIVE',
            'priority': data.get('alert_level', 'MEDIUM')
        }
        
        self.active_alerts.append(alert)
        print(f"🚨 SECURITY ALERT: {alert['type']} - {alert['priority']} priority")
        
        return alert
    
    def get_system_status(self):
        """Get comprehensive system status"""
        current_time = datetime.datetime.now()
        recent_logs = [log for log in self.security_log 
                      if (current_time - log['timestamp']).seconds < 3600]  # Last hour
        
        active_high_alerts = [alert for alert in self.active_alerts 
                            if alert['status'] == 'ACTIVE' and alert['priority'] == 'HIGH']
        
        status = {
            'timestamp': current_time,
            'total_people_in_database': len(self.database.students) + len(self.database.staff),
            'recent_entries': len(recent_logs),
            'active_alerts': len(self.active_alerts),
            'high_priority_alerts': len(active_high_alerts),
            'system_status': 'OPERATIONAL',
            'last_incident': security_data.security_incidents[-1] if security_data.security_incidents else None
        }
        
        return status
    
    def generate_security_report(self):
        """Generate comprehensive security report"""
        status = self.get_system_status()
        
        report = f"""
===== SCHOOL SECURITY SYSTEM REPORT =====
Generated: {status['timestamp'].strftime('%Y-%m-%d %H:%M:%S')}

SYSTEM STATUS: {status['system_status']}
- Total People in Database: {status['total_people_in_database']}
- Recent Entries (Last Hour): {status['recent_entries']}
- Active Alerts: {status['active_alerts']}
- High Priority Alerts: {status['high_priority_alerts']}

RECENT ACTIVITY:
"""
        
        # Show recent security logs
        recent_logs = sorted(self.security_log, key=lambda x: x['timestamp'], reverse=True)[:5]
        for log in recent_logs:
            report += f"- {log['timestamp'].strftime('%H:%M')} | {log['person_id']} | {log['location']} | {log['decision']}\n"
        
        # Show active alerts
        if self.active_alerts:
            report += "\nACTIVE ALERTS:\n"
            for alert in self.active_alerts[-3:]:  # Last 3 alerts
                report += f"- {alert['timestamp'].strftime('%H:%M')} | {alert['type']} | {alert['priority']} priority\n"
        
        report += "\n" + "="*50
        return report

# Initialize the complete security system
security_system = SchoolSecuritySystem()

print("\n" + "="*50)
print("SCHOOL SECURITY SYSTEM OPERATIONAL")
print("="*50)

# Simulate some entry attempts
print("\nSimulating Entry Attempts:")

# Test cases
entry_attempts = [
    ("STD1001", "Main Gate", "ID Card"),      # Valid student
    ("STF001", "Main Gate", "Biometric"),     # Valid staff
    ("UNKNOWN", "Side Entrance", "Manual"),   # Unknown person
    ("VIS002", "Main Gate", "ID Card"),       # Expired visitor
]

for person_id, location, method in entry_attempts:
    result = security_system.process_entry_attempt(person_id, location, method)
    print(f"Entry: {person_id} at {location} -> {result['decision']}")

# Simulate incident detection
print("\nSimulating Incident Detection:")
test_incidents = [
    {"type": "Suspicious Behavior", "location": "Cafeteria", "timestamp": datetime.datetime.now()},
    {"type": "Unauthorized Access", "location": "Main Gate", "timestamp": datetime.datetime.now()},
]

for incident in test_incidents:
    result = security_system.detect_incident(incident)
    print(f"Incident: {incident['type']} -> Predicted: {result['predicted_threat']} (Confidence: {result['confidence']:.2f})")

# Generate and display security report
print(security_system.generate_security_report())