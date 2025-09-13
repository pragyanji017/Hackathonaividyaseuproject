# Create comprehensive school security application with AI, KNN, and neural networks
# Let's start by creating the data structures and core algorithms

import json
import random
import math
import datetime
from typing import List, Dict, Any, Tuple
import numpy as np

# First, let's create the core data structures for the school security system
class SecurityData:
    def __init__(self):
        # Sample data for AI models
        self.student_database = []
        self.security_incidents = []
        self.access_logs = []
        self.threat_levels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
        
        # Initialize with sample data
        self.generate_sample_data()
    
    def generate_sample_data(self):
        """Generate sample student and security data"""
        # Sample students
        student_names = ["Arjun Kumar", "Priya Sharma", "Rahul Patel", "Sneha Singh", "Amit Gupta", 
                        "Kavya Reddy", "Vikram Mishra", "Ananya Joshi", "Rohit Verma", "Meera Nair"]
        
        for i in range(len(student_names)):
            student = {
                'id': f"STD{1000 + i}",
                'name': student_names[i],
                'grade': random.choice([8, 9, 10, 11, 12]),
                'authorized': True,
                'last_entry': datetime.datetime.now() - datetime.timedelta(hours=random.randint(1, 24)),
                'behavior_score': random.uniform(0.7, 1.0),  # Higher is better behavior
                'attendance_rate': random.uniform(0.8, 0.98)
            }
            self.student_database.append(student)
        
        # Sample security incidents
        incident_types = ["Unauthorized Access", "Suspicious Behavior", "Emergency", "Violation"]
        for i in range(20):
            incident = {
                'id': f"INC{2000 + i}",
                'type': random.choice(incident_types),
                'timestamp': datetime.datetime.now() - datetime.timedelta(hours=random.randint(1, 168)),
                'location': random.choice(["Main Gate", "Cafeteria", "Library", "Playground", "Classroom A-101"]),
                'threat_level': random.choice(self.threat_levels),
                'resolved': random.choice([True, False]),
                'response_time': random.randint(2, 30)  # minutes
            }
            self.security_incidents.append(incident)
        
        # Sample access logs
        for i in range(50):
            log = {
                'id': f"LOG{3000 + i}",
                'person_id': random.choice([s['id'] for s in self.student_database] + ["VISITOR", "STAFF"]),
                'timestamp': datetime.datetime.now() - datetime.timedelta(hours=random.randint(1, 72)),
                'location': random.choice(["Main Gate", "Side Entrance", "Emergency Exit"]),
                'access_granted': random.choice([True, False]),
                'method': random.choice(["ID Card", "Biometric", "Manual"])
            }
            self.access_logs.append(log)

# Initialize security data
security_data = SecurityData()

print("School Security System - Core Data Structures Created")
print(f"Students in database: {len(security_data.student_database)}")
print(f"Security incidents: {len(security_data.security_incidents)}")
print(f"Access logs: {len(security_data.access_logs)}")

# Display sample data
print("\nSample Student Data:")
for student in security_data.student_database[:3]:
    print(f"- {student['name']} (Grade {student['grade']}, ID: {student['id']})")
    
print("\nSample Security Incidents:")
for incident in security_data.security_incidents[:3]:
    print(f"- {incident['type']} at {incident['location']} - {incident['threat_level']} threat")